export interface ComponentColumnProps {
  isHovered: boolean;
  isSelected: boolean;
  row;
}

export interface Column {
  Component?: (props: ComponentColumnProps) => JSX.Element | null;
  clickable?: boolean;
  disablePadding?: boolean;
  getColSpan?: (isSelected) => number | undefined;
  getFormattedString?: (row) => string | null;
  getHiddenCondition?: (isSelected) => boolean;
  getRenderComponentCondition?: (row) => boolean;
  getRenderComponentOnRowUpdateCondition?: (row) => boolean;
  getTruncateCondition?: (isSelected) => boolean;
  hasHoverableComponent?: boolean;
  id: string;
  label: string;
  sortField?: string;
  sortable?: boolean;
  type: ColumnType;
  width?: number | string;
}

enum ColumnType {
  string = 0,
  component = 1,
}

export interface RowColorCondition {
  color: string;
  condition: (row) => boolean;
  name: string;
}

export { ColumnType };
