import { BRAND } from '@/lib/brand'

type BrandLogoProps = {
  size?: number
  variant?: 'mark' | 'lockup'
  className?: string
  onDark?: boolean
}

/** Stylized “M” mark (gold tile + serif strokes) + optional wordmark */
export default function BrandLogo({
  size = 40,
  variant = 'mark',
  className = '',
  onDark = true,
}: BrandLogoProps) {
  const mark = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="flex-shrink-0"
    >
      <rect width="48" height="48" fill="#FF5722" />
      <path
        d="M11 33V15h4.2l6.3 10.2L27.8 15H32v18h-3.8V22.4L21.2 33h-3.4l-6.8-10.6V33H11z"
        fill="#1B2A4A"
      />
      <rect x="11" y="11" width="26" height="1.5" fill="#1B2A4A" fillOpacity="0.2" />
    </svg>
  )

  if (variant === 'mark') {
    return <span className={`inline-flex ${className}`}>{mark}</span>
  }

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      {mark}
      <span className="flex flex-col leading-tight">
        <span
          className={`font-serif font-bold text-base tracking-wide ${
            onDark ? 'text-cream-100' : 'text-earth-900'
          }`}
        >
          {BRAND.name}
        </span>
        <span
          className={`text-[10px] uppercase tracking-luxury ${
            onDark ? 'text-earth-400' : 'text-earth-500'
          }`}
        >
          {BRAND.tagline}
        </span>
      </span>
    </span>
  )
}
