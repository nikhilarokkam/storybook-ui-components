import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { DataTable } from './DataTable'
import type { Column } from './types'

type Person = { id: number; name: string; role: string; age: number }

const people: Person[] = [
  { id: 1, name: 'Aisha', role: 'Developer', age: 22 },
  { id: 2, name: 'Bikash', role: 'Designer', age: 25 },
  { id: 3, name: 'Chirag', role: 'PM', age: 27 },
  { id: 4, name: 'Deepa', role: 'QA', age: 24 },
  { id: 5, name: 'Eshan', role: 'Developer', age: 23 },
]

const columns: Column<Person>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'role', header: 'Role', sortable: true },
  { key: 'age', header: 'Age', sortable: true },
]

const meta: Meta<typeof DataTable<Person>> = {
  title: 'Components/DataTable',
  component: DataTable<Person>,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A generic, typed data table with sorting, selection, loading and empty states. Uses simple column definitions and works with any row type.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    data: people,
    columns,
  },
}
export default meta
type Story = StoryObj<typeof DataTable<Person>>

export const Basic: Story = {}

export const Sortable: Story = {
  args: { data: people, columns },
}

export const Loading: Story = {
  args: { data: [], columns, loading: true },
}

export const Empty: Story = {
  args: { data: [], columns },
}

export const Selectable: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<Person[]>([])
    return (
      <div className="space-y-2">
        <DataTable<Person> {...args} selectable onRowSelect={setSelected} />
        <div className="text-sm text-gray-600 dark:text-zinc-300">
          Selected: {selected.map(s => s.name).join(', ') || 'none'}
        </div>
      </div>
    )
  },
  args: { data: people, columns },
}