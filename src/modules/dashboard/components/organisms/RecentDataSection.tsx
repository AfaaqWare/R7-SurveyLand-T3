import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import Title from "@/shared/components/atoms/Title";
import Text from "@/shared/components/atoms/Text";
import { Table, TableBody, TableCell, TableRow } from "@/shared/components/molecules/Table";
import { EmptyState, ErrorState } from "@/core/ui-states";
import SectionHeader from "../molecules/SectionHeader";
import DataTableHeader from "../molecules/DataTableHeader";
import type { RecentDataConfig } from "../../types/recentData";

interface RecentDataSectionProps<T> {
  items: T[];
  config: RecentDataConfig<T>;
  skeleton: ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  className?: string;
}

export default function RecentDataSection<T>({
  items,
  config,
  skeleton,
  isLoading = false,
  isError = false,
  className,
}: RecentDataSectionProps<T>) {
  const t = useTranslations(config.tableNamespace);
  const { columns, getKey } = config;
  const titleColumn = columns.find(column => column.isTitle);
  const detailColumns = columns.filter(column => !column.isTitle);

  return (
    <section className={cn("ds-bg-card ds-rounded-3xl ds-p-lg", "w-full", className)}>
      <SectionHeader
        title={config.titleKey}
        buttonLabel={config.buttonLabelKey}
        href={config.href}
      />

      {isLoading && skeleton}

      {!isLoading && isError && <ErrorState className="!m-h-50 !max-h-50" />}

      {!isLoading && !isError && items.length === 0 && (
        <EmptyState className="!max-h-50 !min-h-50" />
      )}

      {!isLoading && !isError && items.length > 0 && (
        <>
          <div className="hidden overflow-x-auto md:block">
            <Table className="min-w-[650px]">
              <DataTableHeader
                namespace={config.tableNamespace}
                columns={columns.map(column => column.labelKey)}
              />

              <TableBody>
                {items.map(item => (
                  <TableRow
                    key={getKey(item)}
                    className={cn(
                      "!border-b-2 !border-[var(--border-color-card)]",
                      "last:!border-b-0"
                    )}
                  >
                    {columns.map(column => (
                      <TableCell key={column.id}>
                        {column.isTitle ? (
                          <Title size="sm" className="font-semibold !text-[var(--color-text-dash)]">
                            {column.render(item, "table")}
                          </Title>
                        ) : (
                          column.render(item, "table")
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col gap-3 md:hidden">
            {items.map(item => (
              <article
                key={getKey(item)}
                className={cn("ds-border-card ds-rounded-md", "border p-4")}
              >
                {titleColumn && (
                  <Title size="sm" className="mb-4 font-bold capitalize">
                    {titleColumn.render(item, "card")}
                  </Title>
                )}

                {detailColumns.map(column => (
                  <div
                    key={column.id}
                    className={cn(
                      "flex justify-between py-2",
                      column.wrap ? "items-start gap-4" : "items-center"
                    )}
                  >
                    <Text size="sm" variant="secondary">
                      {t(column.labelKey)}
                    </Text>

                    <div className={cn(column.wrap && "max-w-[60%] text-right")}>
                      {column.render(item, "card")}
                    </div>
                  </div>
                ))}
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
