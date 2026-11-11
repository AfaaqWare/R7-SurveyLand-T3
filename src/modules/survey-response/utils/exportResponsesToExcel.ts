import { formatDateTime } from "@/shared/utils/formatDateTime";
import type { SurveyResponse } from "@/modules/responses/type/responses";
import type { SurveyQuestion } from "../types/question";

interface ExportResponsesToExcelParams {
  rows: SurveyResponse[];
  questions: SurveyQuestion[];
  selectedOptions: Record<string, boolean>;
  fileName: string;
}

export async function exportResponsesToExcel({
  rows,
  questions,
  selectedOptions,
  fileName,
}: ExportResponsesToExcelParams) {
  const hasSelectedOptions = Object.values(selectedOptions).some(Boolean);

  if (rows.length === 0 || !hasSelectedOptions) {
    return;
  }

  const ExcelJS = (await import("exceljs")).default;

  const usedHeaders = new Map<string, number>();

  const questionHeaders = questions.map(question => {
    const base = question.questionText;
    const occurrence = usedHeaders.get(base) ?? 0;

    usedHeaders.set(base, occurrence + 1);

    return occurrence > 0 ? `${base} (${occurrence + 1})` : base;
  });

  const data = rows.map((response, index) => {
    const row: Record<string, string | number> = {
      ID: index + 1,
    };

    if (selectedOptions.respondentName) {
      row["Respondent Name"] = response.respondentName;
    }

    if (selectedOptions.respondentEmail) {
      row["Respondent Email"] = response.respondentEmail;
    }

    if (selectedOptions.submissionData) {
      const { date, time } = formatDateTime(response.submittedAt);

      row["Submitted At"] = `${date} ${time}`;
    }

    if (selectedOptions.answers) {
      questions.forEach((question, questionIndex) => {
        row[questionHeaders[questionIndex]] = response.answers[question.qid] ?? "-";
      });
    }

    return row;
  });

  const workbook = new ExcelJS.Workbook();

  workbook.creator = "SurveyLand";
  workbook.created = new Date();

  const worksheet = workbook.addWorksheet("Responses", {
    views: [{ state: "frozen", ySplit: 1 }],
  });

  const headers = Object.keys(data[0]);

  // Add header
  worksheet.addRow(headers);

  // Add data
  data.forEach(row => {
    worksheet.addRow(headers.map(header => row[header] ?? ""));
  });

  // =========================
  // Header Styling
  // =========================

  const headerRow = worksheet.getRow(1);

  headerRow.height = 32;

  headerRow.eachCell(cell => {
    cell.font = {
      bold: true,
      size: 11,
      color: {
        argb: "FFFFFFFF",
      },
    };

    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: {
        argb: "00B7C1",
      },
    };

    cell.alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };

    cell.border = {
      top: {
        style: "thin",
        color: {
          argb: "009AA3",
        },
      },
      bottom: {
        style: "thin",
        color: {
          argb: "009AA3",
        },
      },
      left: {
        style: "thin",
        color: {
          argb: "009AA3",
        },
      },
      right: {
        style: "thin",
        color: {
          argb: "009AA3",
        },
      },
    };
  });

  // =========================
  // Body Styling
  // =========================

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;

    row.height = 26;

    row.eachCell(cell => {
      cell.alignment = {
        vertical: "middle",
        horizontal: "left",
        wrapText: true,
      };

      cell.border = {
        top: {
          style: "hair",
          color: {
            argb: "D9E1E3",
          },
        },
        bottom: {
          style: "hair",
          color: {
            argb: "D9E1E3",
          },
        },
        left: {
          style: "hair",
          color: {
            argb: "D9E1E3",
          },
        },
        right: {
          style: "hair",
          color: {
            argb: "D9E1E3",
          },
        },
      };

      // Zebra rows
      if (rowNumber % 2 === 0) {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: {
            argb: "F5F8F9",
          },
        };
      }
    });
  });

  // =========================
  // Column Width
  // =========================

  worksheet.columns.forEach(column => {
    let maxLength = 0;

    column.eachCell?.(cell => {
      const value = cell.value;

      const length = value === null || value === undefined ? 0 : String(value).length;

      maxLength = Math.max(maxLength, length);
    });

    column.width = Math.min(Math.max(maxLength + 3, 12), 45);
  });

  // =========================
  // Filter
  // =========================

  worksheet.autoFilter = {
    from: {
      row: 1,
      column: 1,
    },
    to: {
      row: worksheet.rowCount,
      column: worksheet.columnCount,
    },
  };

  // =========================
  // Download
  // =========================

  const safeFileName = fileName.trim() || "responses";

  const buffer = await workbook.xlsx.writeBuffer();

  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = `${safeFileName}.xlsx`;

  link.click();

  URL.revokeObjectURL(url);
}
