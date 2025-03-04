import type React from "react"

interface WriteItNowLogoProps {
  className?: string
}

export const WriteItNowLogo: React.FC<WriteItNowLogoProps> = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={className} width="100" height="100">
      <title>Write It Now Logo</title>
      <path
        d="M20 80 L40 20 L50 50 L60 20 L80 80"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M40 70 L60 70" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M50 50 L50 90" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M30 40 L70 40" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

