import React from 'react'
import { twMerge } from 'tailwind-merge'

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className = '', containerClassName = '', ...props }, ref) => {
    return (
      <div
        className={twMerge(
          'flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm focus-within:border-black sm:gap-3 sm:px-4 sm:py-2.5',
          containerClassName
        )}
      >
        <svg
          className="h-4 w-4 shrink-0 text-gray-400 sm:h-5 sm:w-5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <input
          ref={ref}
          type="text"
          className={twMerge('w-full bg-transparent md:text-sm outline-none placeholder:text-gray-400 text-base', className)}
          {...props}
        />
      </div>
    )
  }
)

export default SearchBar
