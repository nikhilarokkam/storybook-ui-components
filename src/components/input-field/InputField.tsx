import * as React from 'react'
import { cn } from '../../lib/cn'

export type InputVariant = 'filled' | 'outlined' | 'ghost'
export type InputSize = 'sm' | 'md' | 'lg'

export interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  helperText?: string
  errorMessage?: string
  invalid?: boolean
  variant?: InputVariant
  size?: InputSize
  loading?: boolean
  clearable?: boolean
  passwordToggle?: boolean
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(function InputField(
  {
    id,
    label,
    helperText,
    errorMessage,
    disabled,
    invalid,
    variant = 'outlined',
    size = 'md',
    loading = false,
    clearable = false,
    passwordToggle = false,
    type = 'text',
    className,
    value,
    onChange,
    ...props
  },
  ref
) {
  const autoId = React.useId()
  const inputId = id ?? autoId
  const isPassword = type === 'password' || passwordToggle
  const [showPassword, setShowPassword] = React.useState(false)

  // Support controlled & uncontrolled usage
  const [internal, setInternal] = React.useState<string>(value?.toString() ?? '')
  const isControlled = value !== undefined
  const val = isControlled ? (value as string) : internal

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!isControlled) setInternal(e.target.value)
    onChange?.(e)
  }

  const sizeClasses = {
    sm: 'h-9 text-sm px-3 rounded-lg',
    md: 'h-10 text-base px-3.5 rounded-xl',
    lg: 'h-12 text-base px-4 rounded-2xl',
  }[size]

  const base = 'w-full outline-none bg-transparent placeholder:text-gray-400 disabled:cursor-not-allowed'
  const variants: Record<InputVariant, string> = {
    filled: 'bg-gray-100 dark:bg-zinc-900 focus-within:ring-2 ring-blue-500 border border-transparent',
    outlined: 'border border-gray-300 dark:border-zinc-700 focus-within:ring-2 ring-blue-500 bg-white dark:bg-zinc-900',
    ghost: 'border border-transparent focus-within:ring-2 ring-blue-500 bg-transparent',
  }

  const stateRing = invalid
    ? 'focus-within:ring-red-500'
    : loading
    ? 'focus-within:ring-blue-500'
    : 'focus-within:ring-blue-500'

  const wrapper = cn(
    'relative flex items-center transition-shadow',
    variants[variant],
    sizeClasses,
    stateRing,
    disabled && 'opacity-60 pointer-events-none',
    invalid && 'border-red-400 dark:border-red-500',
    className
  )

  const rightPadding = (clearable && val) || isPassword || loading ? 'pr-10' : ''

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="mb-1 block text-sm font-medium text-gray-700 dark:text-zinc-300">
          {label}
        </label>
      )}
      <div className={cn(wrapper, rightPadding)} aria-invalid={invalid || undefined}>
        <input
          id={inputId}
          ref={ref}
          className={cn(base, 'flex-1')}
          disabled={disabled || loading}
          type={isPassword && showPassword ? 'text' : type}
          value={val}
          onChange={handleChange}
          {...props}
        />
        {/* Clear button */}
        {clearable && !!val && !loading && (
          <button
            type="button"
            aria-label="Clear input"
            onClick={() => {
              const next = ''
              if (!isControlled) setInternal(next)
              onChange?.({ target: { value: next } } as any)
            }}
            className="absolute right-2 inline-flex h-6 w-6 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        )}
        {/* Password toggle */}
        {isPassword && !loading && (
          <button
            type="button"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-2 inline-flex h-6 w-6 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10"
            style={{ right: clearable && val ? '2.25rem' : '0.5rem' }}
          >
            {showPassword ? (
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7Zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" fill="currentColor"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path d="M3 3l18 18M12 5c-7 0-10 7-10 7a18.2 18.2 0 0 0 5.1 6.1M20.5 15.5C22 14 22 12 22 12S19 5 12 5a9.8 9.8 0 0 0-3.7.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        )}
        {/* Loading spinner */}
        {loading && (
          <span className="absolute right-2 inline-flex h-5 w-5 animate-spin items-center justify-center" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="h-5 w-5">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25"/>
              <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4" fill="none"/>
            </svg>
          </span>
        )}
      </div>
      <div className="mt-1 min-h-[1.25rem]">
        {invalid && errorMessage ? (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">{errorMessage}</p>
        ) : helperText ? (
          <p className="text-sm text-gray-500 dark:text-zinc-400">{helperText}</p>
        ) : null}
      </div>
    </div>
  )
})