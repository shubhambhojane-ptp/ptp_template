import React from 'react'
import { twMerge } from 'tailwind-merge'
import pinIcon from '../assets/pin.svg'
import clockIcon from '../assets/clock.svg'

interface ActivityProps extends React.HTMLAttributes<HTMLDivElement> {
  actionLabel: string
  category: string
  location: string
  distance?: string | null
  timeAgo?: string | null
}

const Activity = ({
  actionLabel,
  category,
  location,
  distance,
  timeAgo,
  className = '',
  ...props
}: ActivityProps) => {
  return (
    <div
      className={twMerge('flex w-full flex-col gap-1 border-b border-gray-100 py-3', className)}
      {...props}
    >
      <h3 className="line-clamp-2 min-w-0 text-sm text-gray-900 sm:text-base">
        <span className="font-semibold">{actionLabel}</span>
        {' · '}
        <span className="text-gray-500">{[category, location].filter(Boolean).join(', ')}</span>
      </h3>

      {(distance || timeAgo) && (
        <div className="flex items-center gap-3 text-xs text-gray-400 sm:text-sm">
          {distance && (
            <span className="flex items-center gap-1">
              <img src={pinIcon} className="h-3.5 w-3.5" alt="" />
              {distance}
            </span>
          )}
          {timeAgo && (
            <span className="flex items-center gap-1">
              <img src={clockIcon} className="h-3.5 w-3.5" alt="" />
              {timeAgo}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default Activity
