import * as React from 'react'
import { cn } from '../../lib/cn'
import type { Column, SortDirection } from './types'

export interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  loading?: boolean
  selectable?: boolean
  /** Called whenever selected rows change. */
  onRowSelect?: (selected: T[]) => void
}

export function DataTable<T extends { id?: string | number }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = React.useState<string | null>(null)
  const [direction, setDirection] = React.useState<SortDirection>(null)
  const [selectedKeys, setSelectedKeys] = React.useState<Set<number>>(new Set())

  const rows = React.useMemo(() => {
    if (!sortKey || !direction) return data
    const col = columns.find(c => c.key === sortKey)
    if (!col) return data
    const acc = col.accessor ?? ((row: any) => (row as any)[sortKey])
    const sorted = [...data].sort((a, b) => {
      const av = acc(a)
      const bv = acc(b)
      if (av === bv) return 0
      if (av == null) return -1
      if (bv == null) return 1
      return av > bv ? 1 : -1
    })
    return direction === 'asc' ? sorted : sorted.reverse()
  }, [data, columns, sortKey, direction])

  function toggleSort(key: string) {
    if (sortKey !== key) {
      setSortKey(key)
      setDirection('asc')
    } else {
      setDirection(prev => (prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc'))
      if (direction === null) setSortKey(key) // restart cycle
    }
  }

  function toggleRow(i: number) {
    if (!selectable) return
    const next = new Set(selectedKeys)
    if (next.has(i)) next.delete(i)
    else next.add(i)
    setSelectedKeys(next)
    onRowSelect?.(Array.from(next).map(idx => rows[idx]))
  }

  const allSelected = selectable && rows.length > 0 && selectedKeys.size === rows.length
  function toggleAll() {
    if (!selectable) return
    if (allSelected) {
      setSelectedKeys(new Set())
      onRowSelect?.([])
    } else {
      const next = new Set<number>(rows.map((_, i) => i))
      setSelectedKeys(next)
      onRowSelect?.(rows)
    }
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-200 dark:border-zinc-800">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-800" role="table">
        <thead className="bg-gray-50 dark:bg-zinc-900">
          <tr>
            {selectable && (
              <th className="px-3 py-2 text-left">
                <input
                  type="checkbox"
                  aria-label="Select all rows"
                  checked={allSelected}
                  onChange={toggleAll}
                />
              </th>
            )}
            {columns.map(col => (
              <th
                key={col.key}
                scope="col"
                style={{ width: col.width }}
                className={cn('px-3 py-2 text-left text-sm font-semibold select-none', col.sortable && 'cursor-pointer')}
                onClick={() => col.sortable && toggleSort(col.key)}
              >
                <span className="inline-flex items-center gap-1">
                  {col.header}
                  {col.sortable && (
                    <span aria-hidden className="inline-block">
                      {sortKey !== col.key || !direction ? '↕' : direction === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 dark:divide-zinc-800 bg-white dark:bg-zinc-950">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="animate-pulse">
                {selectable && <td className="px-3 py-2"><div className="h-4 w-4 rounded bg-gray-200 dark:bg-zinc-800" /></td>}
                {columns.map((c, j) => (
                  <td key={j} className="px-3 py-3">
                    <div className="h-4 w-28 rounded bg-gray-200 dark:bg-zinc-800" />
                  </td>
                ))}
              </tr>
            ))
          ) : rows.length === 0 ? (
            <tr>
              <td className="px-3 py-6 text-center text-sm text-gray-500 dark:text-zinc-400" colSpan={(selectable ? 1 : 0) + columns.length}>
                No data to display.
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr
                key={i}
                className="hover:bg-gray-50 dark:hover:bg-zinc-900"
                onClick={() => toggleRow(i)}
                role={selectable ? 'row' : undefined}
              >
                {selectable && (
                  <td className="px-3 py-2">
                    <input
                      type="checkbox"
                      aria-label={`Select row ${i + 1}`}
                      checked={selectedKeys.has(i)}
                      onChange={() => toggleRow(i)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                )}
                {columns.map(col => {
                  const acc = col.accessor ?? ((r: any) => (r as any)[col.key])
                  const val = acc(row)
                  return (
                    <td key={col.key} className="px-3 py-3 text-sm">
                      {col.cell ? col.cell(val, row) : String(val)}
                    </td>
                  )
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}