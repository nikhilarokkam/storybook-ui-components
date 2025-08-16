export type SortDirection = 'asc' | 'desc' | null

export interface Column<T> {
  /** An id to identify the column. */
  key: string
  /** Header label shown in the table head. */
  header: string
  /** Given a row, return the cell value for this column (used for sort too). */
  accessor?: (row: T) => any
  /** Optional cell renderer to customize cell UI. */
  cell?: (value: any, row: T) => React.ReactNode
  /** Is this column sortable? */
  sortable?: boolean
  /** Optional width (e.g., '120px', '20%'). */
  width?: string
}