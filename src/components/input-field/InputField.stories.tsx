import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { InputField, InputFieldProps } from './InputField'

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible text input with label, helper/error text, variants, sizes, loading, disabled, clear button and password toggle. Accessible with label association and `aria-invalid`.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['filled', 'outlined', 'ghost'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof InputField>

export const Playground: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    helperText: 'We will never share your email.',
    variant: 'outlined',
    size: 'md',
  },
}

export const Invalid: Story = {
  args: {
    label: 'Username',
    placeholder: 'your handle',
    invalid: true,
    errorMessage: 'This username is taken. Try another.',
  },
}

export const Loading: Story = {
  args: {
    label: 'Searching',
    placeholder: 'Type to search...',
    loading: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled field',
    placeholder: 'Cannot type here',
    disabled: true,
  },
}

export const WithClear: Story = {
  render: (args: InputFieldProps) => {
    const [v, setV] = useState('Hello')
    return <InputField {...args} value={v} onChange={(e) => setV(e.target.value)} />
  },
  args: {
    label: 'Clearable',
    clearable: true,
  },
}

export const Password: Story = {
  args: {
    label: 'Password',
    placeholder: '••••••••',
    type: 'password',
    passwordToggle: true,
  },
}

export const VariantsAndSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="font-medium">Outlined</p>
        <InputField label="Small" size="sm" variant="outlined" />
        <InputField label="Medium" size="md" variant="outlined" />
        <InputField label="Large" size="lg" variant="outlined" />
      </div>
      <div className="space-y-3">
        <p className="font-medium">Filled</p>
        <InputField label="Small" size="sm" variant="filled" />
        <InputField label="Medium" size="md" variant="filled" />
        <InputField label="Large" size="lg" variant="filled" />
      </div>
      <div className="space-y-3">
        <p className="font-medium">Ghost</p>
        <InputField label="Small" size="sm" variant="ghost" />
        <InputField label="Medium" size="md" variant="ghost" />
        <InputField label="Large" size="lg" variant="ghost" />
      </div>
    </div>
  ),
}