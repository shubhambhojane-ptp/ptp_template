import React from 'react'
import { twMerge } from 'tailwind-merge'

interface DealCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl?: string
  offerText: string
  businessName?: string | null
  metaOne?: string | null
  metaTwo?: string | null
  metaThree?: string | null
}

const DealCard = ({
  imageUrl,
  offerText,
  businessName,
  metaOne,
  metaTwo,
  metaThree,
  className = '',
  ...props
}: DealCardProps) => {
  return (
    <div
      className={twMerge('w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm', className)}
      {...props}
    >
      {imageUrl && <img src={imageUrl} alt="" className="aspect-452/232 w-full object-cover" />}

      <div className="flex flex-col gap-1.5 p-4 sm:gap-2 sm:p-5">
        <h3 className="line-clamp-2 text-base font-semibold leading-snug text-gray-900 sm:text-lg">
          {[offerText, businessName].filter(Boolean).join(' · ')}
        </h3>

        {(metaOne || metaTwo || metaThree) && (
          <p className="truncate text-xs text-gray-400 sm:text-sm">
            {[metaOne, metaTwo, metaThree].filter(Boolean).join(' · ')}
          </p>
        )}
      </div>
    </div>
  )
}

export default DealCard
