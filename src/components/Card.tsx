import React from 'react'
import { twMerge } from 'tailwind-merge'
import Button from './Button'
import pinIcon from '../assets/pin.svg'
import clockIcon from '../assets/clock.svg'
import peopleIcon from '../assets/people.svg'
import closeIcon from '../assets/icon.svg'
import rightIcon from '../assets/check.svg'
import dotIcon from '../assets/dotfill.svg'
import hourglassIcon from '../assets/hourglass.svg'
import checkIcon from '../assets/checkcircle.svg'
import alertIcon from '../assets/alert.svg'
import minusIcon from '../assets/minuscircle.svg'

const CLAIM_MAX_LENGTH = 60

export type CardState = 'live' | 'pending' | 'closing' | 'settled' | 'contested' | 'dead';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  authorInitial: string
  authorName: string
  authorRole: string
  statusLabel: string
  cardState: CardState
  claim: string
  description?: string
  categoryIcon: string
  categoryValue: string
  categoryDetail: string
  imageUrl?: string
  metaOne?: string | null
  metaTwo?: string | null
  metaThree?: string | null
  showActions?: boolean
  primaryLabel?: string
  secondaryLabel?: string
  onPrimaryClick?: React.MouseEventHandler<HTMLButtonElement>
  onSecondaryClick?: React.MouseEventHandler<HTMLButtonElement>
}

const stateConfig = {
  // dot icon
  live: { icon: dotIcon, colorClass: 'text-green-700 ' },
  // clock icon
  pending: { icon: clockIcon, colorClass: 'text-gray-600 ' },
// hourglass icon
  closing: { icon: hourglassIcon, colorClass: 'text-pink-600 ' }, // Assuming pink/magenta based on screenshot
  // checked circle copy icon
  settled: { icon: checkIcon, colorClass: 'text-green-700 ' },
   // alert icon
  contested: { icon: alertIcon, colorClass: 'text-pink-600 ' },
  //minus circle icon
  dead: { icon: minusIcon, colorClass: 'text-gray-400 ' },
};

const Card = ({
  authorInitial,
  authorName,
  authorRole,
  statusLabel,
  cardState,
  claim,
  description,
  categoryIcon,
  categoryValue,
  categoryDetail,
  imageUrl,
  metaOne,
  metaTwo,
  metaThree,
  showActions = false,
  primaryLabel,
  secondaryLabel,
  onPrimaryClick,
  onSecondaryClick,
  className = '',
  ...props
}: CardProps) => {
  const truncatedClaim =
    claim.length > CLAIM_MAX_LENGTH ? `${claim.slice(0, CLAIM_MAX_LENGTH).trimEnd()}…` : claim

  return (
    <div
      className={twMerge('w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm', className)}
      {...props}
    >
      {/* Image */}
      {imageUrl && <img src={imageUrl} alt="" className="aspect-452/232 w-full object-cover" />}

      <div className="flex flex-col gap-3 p-4 sm:gap-4 sm:p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50 text-sm font-semibold text-green-700 sm:h-12 sm:w-12 sm:text-base">
              {authorInitial ? authorInitial : <span className="block h-2 w-2 rounded-full bg-green-700" />}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-gray-900 sm:text-base">{authorName}</p>
              <p className="flex items-center gap-1 truncate text-xs text-gray-500 sm:text-sm">{authorRole}</p>
            </div>
          </div>
          <div className={twMerge('flex shrink-0 items-center gap-1 text-xs sm:text-sm', stateConfig[cardState].colorClass)}>
            <img src={stateConfig[cardState].icon} className="h-3.5 w-3.5" alt="" />
            {statusLabel}
          </div>
        </div>

        {/* Claim */}
        <div>
          <h3 className="line-clamp-2 text-base font-semibold leading-snug text-gray-900 sm:text-lg">{truncatedClaim}</h3>
          {description && <p className="mt-2 line-clamp-2 text-sm text-gray-500 sm:text-base">{description}</p>}
        </div>

        {/* Category block */}
        <div className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 sm:px-4 sm:py-3">
          <img src={categoryIcon} className="h-4 w-4  shrink-0" alt="" />
          <div>
            <p className="text-sm font-medium sm:text-base">{categoryValue}</p>
            <p className="text-xs text-gray-500 sm:text-sm">{categoryDetail}</p>
          </div>
        </div>

        {/* Meta */}
        {(metaOne || metaTwo || metaThree) && (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400 sm:text-sm">
            {metaOne && (
              <span className="flex items-center gap-1">
                <img src={pinIcon} className="h-3.5 w-3.5" alt="" />
                {metaOne}
              </span>
            )}
            {metaTwo && (
              <span className="flex items-center gap-1">
                <img src={clockIcon} className="h-3.5 w-3.5" alt="" />
                {metaTwo}
              </span>
            )}
            {metaThree && (
              <span className="flex items-center gap-1">
                <img src={peopleIcon} className="h-3.5 w-3.5" alt="" />
                {metaThree}
              </span>
            )}
          </div>
        )}

        {/* Footer actions */}
        {showActions && (
          <div className="flex items-center gap-2 border-t border-gray-100 pt-3">
            <Button
              icon={<img src={rightIcon} className="h-4 w-4" alt="" />}
              className="flex-1 border border-gray-200 bg-gray-900 text-white hover:bg-gray-50"
              onClick={onPrimaryClick}
            >
              {primaryLabel}
            </Button>
            <Button
              icon={<img src={closeIcon} className="h-4 w-4" alt="" />}
              className="flex-1 border border-gray-200 bg-white text-black hover:bg-gray-50"
              onClick={onSecondaryClick}
            >
              {secondaryLabel}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Card
