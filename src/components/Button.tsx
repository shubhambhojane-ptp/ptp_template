import React from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  icon?: React.ReactNode
}

const Button = ({ children, icon, className = '', ...props }: ButtonProps) => {
  return (
    <button
      className={twMerge('inline-flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-2 font-medium text-white', className)}
      {...props}
    >
      {icon}
      {children}
    </button>
  )
}

export default Button
