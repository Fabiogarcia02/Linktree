import type { ReactNode } from 'react'

interface SocialProps {
  url: string
  children: ReactNode
}

export function Social({ url, children }: SocialProps) {
  if (!url) return null

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:opacity-80 transition"
    >
      {children}
    </a>
  )
}
