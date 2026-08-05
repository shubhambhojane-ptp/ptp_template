import React from 'react'
import { twMerge } from 'tailwind-merge'

interface InfoSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

const InfoSection = ({ className = '', ...props }: InfoSectionProps) => {
  return (
    <div
      className={twMerge('w-full  bg-gray-300 p-4 sm:p-5', className)}
      {...props}
    >
      <p className="border-b border-white pb-3 text-sm font-medium text-gray-900 sm:text-base">
        Neighbours here check what actually gets fixed, and keep up with their streets.
      </p>

      <div className="flex items-center justify-around pt-3">
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-lg font-semibold text-gray-900 sm:text-xl">14</span>
          <span className="text-xs text-gray-500 sm:text-sm">Reports</span>
        </div>

        <span className="h-8 w-px shrink-0 bg-white" />

        <div className="flex flex-col items-center gap-0.5">
          <span className="text-lg font-semibold text-gray-900 sm:text-xl">2</span>
          <span className="text-xs text-gray-500 sm:text-sm">Resolved</span>
        </div>

        <span className="h-8 w-px shrink-0 bg-white" />

        <div className="flex flex-col items-center gap-0.5">
          <span className="text-lg font-semibold text-gray-900 sm:text-xl">41</span>
          <span className="text-xs text-gray-500 sm:text-sm">Residents</span>
        </div>
      </div>
    </div>
  )
}

export default InfoSection
