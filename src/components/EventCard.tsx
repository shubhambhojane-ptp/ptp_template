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
  layout?: 'vertical' | 'horizontal'
}

const layoutClasses: Record<'vertical' | 'horizontal', string> = {
  vertical: 'w-full',
  horizontal: 'min-h-40 min-w-80 shrink-0 snap-start sm:w-80 md:min-h-52 lg:w-96',
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
  layout = 'horizontal',
  className = '',
  ...props
}: EventCardProps) => {
  return (
    <div
      className={twMerge(
        'flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm',
        layoutClasses[layout],
        className
      )}
      {...props}
    >
      <div
        className={twMerge(
          'flex flex-1 items-stretch gap-3 sm:gap-4',
          layout === 'vertical' && 'flex-col gap-0'
        )}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            className={twMerge(
              'shrink-0 object-fill',
              layout === 'horizontal' ? 'w-20 sm:w-24' : 'h-40 w-full sm:h-48'
            )}
          />
        ) : (
          <div
            className={twMerge(
              'flex shrink-0 items-center justify-center bg-gray-100',
              layout === 'horizontal' ? 'w-20 sm:w-24' : 'h-40 w-full sm:h-48'
            )}
          >
            <span className="text-[10px] font-medium uppercase tracking-wide text-gray-400">Poster</span>
          </div>
        )}

        <div
          className={twMerge(
            'flex flex-1 flex-col justify-between gap-1 py-3 sm:gap-1.5 sm:py-4',
            layout === 'horizontal' ? 'w-0 pr-3 sm:pr-4' : 'min-w-0 px-3 sm:px-4'
          )}
        >
          <p className="truncate text-xs text-gray-500 sm:text-sm">
            {[badgeLabel, timingLabel].filter(Boolean).join(' · ')}
          </p>

          <h3
            className={twMerge(
              'line-clamp-2 font-semibold leading-snug text-gray-900',
              layout === 'horizontal' ? 'text-xs sm:text-sm' : 'text-base sm:text-lg'
            )}
          >
            {title}
          </h3>

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
