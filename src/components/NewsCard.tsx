import React from 'react'
import { twMerge } from 'tailwind-merge'
import Button from './Button'
import checkIcon from '../assets/check-black.svg'

interface NewsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  claim: string
  metaOne?: string | null
  metaTwo?: string | null
  metaThree?: string | null
  upvoteCount?: number | string
  onUpvoteClick?: React.MouseEventHandler<HTMLButtonElement>
}

const NewsCard = ({
  claim,
  metaOne,
  metaTwo,
  metaThree,
  upvoteCount,
  onUpvoteClick,
  className = '',
  ...props
}: NewsCardProps) => {
  return (
    <div
      className={twMerge(
        'flex w-full items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm',
        className
      )}
      {...props}
    >
      <div className="min-w-0 flex-1">
        {/* its title */}
        <h3 className="line-clamp-2 text-base font-semibold leading-snug text-gray-900 sm:text-lg">{claim}</h3>

        {/* gray color */}
        {(metaOne || metaTwo || metaThree) && (
          <p className="mt-1 truncate text-xs text-gray-400 sm:text-sm">
            {[metaOne, metaTwo, metaThree].filter(Boolean).join(' · ')}
          </p>
        )}
      </div>

      {/* white upvote button with check icon and count */}
      {upvoteCount !== undefined && (
        <Button
          icon={<img src={checkIcon} className="h-3.5 w-3.5 " alt="" />}
          className="shrink-0 gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-900 hover:bg-gray-50"
          onClick={onUpvoteClick}
        >
          {upvoteCount}
        </Button>
      )}
    </div>
  )
}

export default NewsCard
