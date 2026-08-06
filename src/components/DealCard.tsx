import React from 'react'
import { twMerge } from 'tailwind-merge'

interface DealCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl?: string
  offerText: string
  businessName?: string | null
  metaOne?: string | null
  metaTwo?: string | null
  metaThree?: string | null
  layout?: 'vertical' | 'horizontal'
}

const layoutClasses: Record<'vertical' | 'horizontal', string> = {
  vertical: 'w-full flex-col',
  horizontal: 'h-48 w-52 min-w-52 shrink-0 snap-start flex-col sm:h-56 sm:w-60',
}

const DealCard = ({
  imageUrl,
  offerText,
  businessName,
  metaOne,
  metaTwo,
  metaThree,
  layout = 'vertical',
  className = '',
  ...props
}: DealCardProps) => {
  return (
    <div
      className={twMerge(
        'flex overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm',
        layoutClasses[layout],
        className
      )}
      {...props}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt=""
          className={twMerge(
            'w-full shrink-0 object-cover',
            layout === 'horizontal' ? 'h-24 sm:h-28' : 'aspect-452/232'
          )}
        />
      )}

      <div className="flex flex-1 min-h-0 flex-col justify-between gap-1 p-2.5 sm:gap-1.5 sm:p-3">
        <h3 className="line-clamp-2 text-xs font-semibold leading-snug text-gray-900 sm:text-sm">
          {[offerText, businessName].filter(Boolean).join(' · ')}
        </h3>

        {(metaOne || metaTwo || metaThree) && (
          <p className="line-clamp-2 text-[10px] text-gray-400 sm:text-xs">
            {[metaOne, metaTwo, metaThree].filter(Boolean).join(' · ')}
          </p>
        )}
      </div>
    </div>
  )
}

export default DealCard
