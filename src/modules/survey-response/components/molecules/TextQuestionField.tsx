import Text from "@/shared/components/atoms/Text";
import TextArea from "@/shared/components/atoms/TextArea";
import QuestionNumber from "../atoms/QuestionNumber";

type TextQuestionFieldProps = {
  id: string;
  number: number;
  question: string;
  value: string;
  maxLength: number;
  required?: boolean;
  onChange: (value: string) => void;
  readOnly?: boolean;
  mode: "view" | "edit";
};

export default function TextQuestionField({
  id,
  number,
  question,
  value,
  maxLength,
  required,
  onChange,
  readOnly = false,
  mode = "edit",
}: TextQuestionFieldProps) {
  return (
    <section
      className={`${mode === "edit" ? "border-b border-[var(--border-color-card)] last:border-b-0" : "!border-b-0"} py-5`}
    >
      <div className="flex gap-4 sm:gap-5">
        <QuestionNumber number={number} className={readOnly ? "dark:!text-white" : ""} />

        <div className="min-w-0 flex-1 space-y-3">
          <label htmlFor={id} className="inline-flex">
            <Text size="sm">{question}</Text>
            {required && (
              <span className="ms-1 text-red-500" aria-hidden="true">
                *
              </span>
            )}
          </label>

          <TextArea
            id={id}
            name={id}
            value={value}
            maxLength={maxLength}
            required={required}
            aria-describedby={`${id}-counter`}
            rows={4}
            onChange={readOnly ? undefined : event => onChange?.(event.target.value)}
            disabled={readOnly}
            className={
              readOnly
                ? "ds-border-sm ds-bg-card !cursor-default resize-none font-[var(--font-heading)] !text-black !caret-transparent dark:!text-white"
                : "ds-border-sm ds-bg-card resize-y font-[var(--font-heading)]"
            }
          />

          <div id={`${id}-counter`}>
            <Text
              size="sm"
              variant="disabled"
              className="text-end text-xs font-[var(--font-heading)]"
            >
              {value.length}/{maxLength}
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
}
