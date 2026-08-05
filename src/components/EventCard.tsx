import React from 'react'
import { twMerge } from 'tailwind-merge'
import Button from './Button'

interface EventCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl?: string
  badgeLabel?: string
  timingLabel?: string
  title: string
  dateLabel?: string
  metaOne?: string | null
  metaTwo?: string | null
  primaryLabel?: string
  onPrimaryClick?: React.MouseEventHandler<HTMLButtonElement>
}

const EventCard = ({
  imageUrl,
  badgeLabel = 'Gather',
  timingLabel,
  title,
  dateLabel,
  metaOne,
  metaTwo,
  primaryLabel = "I'm interested",
  onPrimaryClick,
  className = '',
  ...props
}: EventCardProps) => {
  return (
    <div
      className={twMerge(
        'flex h-40 min-w-80 shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:h-52 sm:w-80 lg:w-96',
        className
      )}
      {...props}
    >
      <div className="flex flex-1 items-stretch gap-3 sm:gap-4">
        {imageUrl ? (
          <img src={imageUrl} alt="" className="w-20 shrink-0 object-cover sm:w-24" />
        ) : (
          <div className="flex w-20 shrink-0 items-center justify-center bg-gray-100 sm:w-24">
            <span className="text-[10px] font-medium uppercase tracking-wide text-gray-400">Poster</span>
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col justify-between gap-1 py-3 pr-3 sm:gap-1.5 sm:py-4 sm:pr-4">
          <p className="truncate text-xs text-gray-500 sm:text-sm">
            {[badgeLabel, timingLabel].filter(Boolean).join(' · ')}
          </p>

          <h3 className="line-clamp-2 text-base font-semibold leading-snug text-gray-900 sm:text-lg">{title}</h3>

          {(dateLabel || metaOne || metaTwo) && (
            <p className="truncate text-xs text-gray-400 sm:text-sm">
              {[dateLabel, metaOne, metaTwo].filter(Boolean).join(' · ')}
            </p>
          )}
        </div>
      </div>

      <Button
        className="w-full shrink-0 justify-start rounded-none border-t border-gray-200 bg-white text-black hover:bg-gray-50"
        onClick={onPrimaryClick}
      >
        {primaryLabel}
      </Button>
    </div>
  )
}

export default EventCard
