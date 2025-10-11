export function ContinuumProtocolLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Hexagon network pattern representing Continuum protocol */}
      <path
        d="M24 4L38 12V28L24 36L10 28V12L24 4Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M24 4V16M24 32V36M10 12L18 16M30 16L38 12M10 28L18 24M30 24L38 28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="24" cy="20" r="4" fill="currentColor" />
    </svg>
  )
}
