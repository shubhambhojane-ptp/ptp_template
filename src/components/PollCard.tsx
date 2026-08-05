import React from 'react'
import { twMerge } from 'tailwind-merge'
import Button from './Button'

interface PollCardProps extends React.HTMLAttributes<HTMLDivElement> {
  metaOne?: string | null
  metaTwo?: string | null
  metaThree?: string | null
  title: string
  metaFour?: string | null
  metaFive?: string | null
  footerLabel?: string
  primaryLabel?: string
  secondaryLabel?: string
  onPrimaryClick?: React.MouseEventHandler<HTMLButtonElement>
  onSecondaryClick?: React.MouseEventHandler<HTMLButtonElement>
}

const PollCard = ({
  metaOne,
  metaTwo,
  metaThree,
  title,
  metaFour,
  metaFive,
  footerLabel,
  primaryLabel = 'Yes',
  secondaryLabel = 'No',
  onPrimaryClick,
  onSecondaryClick,
  className = '',
  ...props
}: PollCardProps) => {
  return (
    <div
      className={twMerge('w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5', className)}
      {...props}
    >
      <div className="flex flex-col gap-1.5">
        {(metaOne || metaTwo || metaThree) && (
          <p className="truncate text-xs text-gray-500 sm:text-sm">
            {[metaOne, metaTwo, metaThree].filter(Boolean).join(' · ')}
          </p>
        )}

        <h3 className="line-clamp-2 text-base font-semibold leading-snug text-gray-900 sm:text-lg">{title}</h3>

        {(metaFour || metaFive) && (
          <p className="truncate text-xs text-gray-400 sm:text-sm">
            {[metaFour, metaFive].filter(Boolean).join(' · ')}
          </p>
        )}
      </div>

      <div className="-mx-4 mt-3 flex items-center justify-between gap-3 border-t border-gray-200 px-4 pt-3 sm:-mx-5 sm:px-5">
        <span className="truncate text-sm text-gray-500">{footerLabel}</span>
        <div className="flex shrink-0 items-center gap-2">
          <Button
            className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-900 hover:bg-gray-50"
            onClick={onSecondaryClick}
          >
            {secondaryLabel}
          </Button>
          <Button
            className="rounded-xl border border-gray-200 bg-gray-900 px-3 py-1.5 text-sm text-white hover:bg-gray-800"
            onClick={onPrimaryClick}
          >
            {primaryLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PollCard
