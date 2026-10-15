import type { ReactNode } from "react";

export type RecentDataView = "table" | "card";

export interface RecentDataColumn<T> {
  id: string;
  labelKey: string;
  render: (item: T, view: RecentDataView) => ReactNode;
  isTitle?: boolean;
  wrap?: boolean;
}

export interface RecentDataConfig<T> {
  titleKey: string;
  buttonLabelKey: string;
  href: string;
  tableNamespace: string;
  columns: RecentDataColumn<T>[];
  getKey: (item: T) => string;
}
