import React from 'react'
import { twMerge } from 'tailwind-merge'
import Button from './Button'
import searchIcon from '../assets/search.svg'

export type BottomTabKey = 'map' | 'browse'

interface BottomTabProps {
  active?: BottomTabKey
  onMapClick?: React.MouseEventHandler<HTMLButtonElement>
  onAddClick?: React.MouseEventHandler<HTMLButtonElement>
  onBrowseClick?: React.MouseEventHandler<HTMLButtonElement>
  className?: string
}

const tabButtonClass = 'flex-1 flex-col gap-1 rounded-none bg-transparent px-0 py-1 text-xs font-medium text-gray-400 hover:bg-transparent'

const BottomTab = ({ active = 'map', onMapClick, onAddClick, onBrowseClick, className = '' }: BottomTabProps) => {
  return (
    <nav
      className={twMerge(
        'fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2',
        className
      )}
    >
      <div className="mx-auto flex w-full max-w-3xl items-center justify-around px-6 sm:px-10 lg:max-w-5xl">
        <Button
          onClick={onMapClick}
          aria-current={active === 'map'}
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
          }
          className={twMerge(tabButtonClass, active === 'map' && 'text-green-700')}
        >
          Map
        </Button>

        <Button
          onClick={onAddClick}
          icon={
            <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          }
          className="h-14 w-14 shrink-0 gap-0 rounded-2xl p-0 shadow-lg shadow-black/20 transition-transform active:scale-95"
        />

        <Button
          onClick={onBrowseClick}
          aria-current={active === 'browse'}
          icon={<img src={searchIcon} className="h-5 w-5" alt="" />}
          className={twMerge(tabButtonClass, active === 'browse' && 'text-green-700')}
        >
          Browse
        </Button>
      </div>
    </nav>
  )
}

export default BottomTab
