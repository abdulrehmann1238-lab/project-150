import React, { useMemo } from 'react'
import { hashString } from '../../lib/hash'

interface GameCoverProps {
  slug: string
  title: string
  className?: string
}

const PALETTES = [
  { bg: '#14302F', shape1: '#C9893A', shape2: '#F3EEE5', accent: '#3D6B67' },
  { bg: '#0F2322', shape1: '#B4553F', shape2: '#C9893A', accent: '#FAF7F2' },
  { bg: '#1F4745', shape1: '#F5E7D1', shape2: '#B0742B', accent: '#14302F' },
  { bg: '#163130', shape1: '#C9893A', shape2: '#3D6B67', accent: '#F3EEE5' },
  { bg: '#14302F', shape1: '#3D6B67', shape2: '#F5E7D1', accent: '#C9893A' },
  { bg: '#1B2422', shape1: '#B0742B', shape2: '#B4553F', accent: '#FAF7F2' },
]

export const GameCover: React.FC<GameCoverProps> = ({ slug, title, className = '' }) => {
  const hash = useMemo(() => hashString(slug), [slug])

  const palette = PALETTES[hash % PALETTES.length]
  const patternType = (hash >> 3) % 6

  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none ${className}`}
      style={{ backgroundColor: palette.bg }}
      aria-label={title}
    >
      <svg
        className="w-full h-full block"
        viewBox="0 0 300 225"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Subtle geometric framing */}
        <rect x="0" y="0" width="300" height="225" fill={palette.bg} />

        {patternType === 0 && (
          // Desert Arch & Crescent Motif
          <g>
            <path
              d="M 50 225 L 50 110 C 50 50, 250 50, 250 110 L 250 225 Z"
              fill={palette.shape1}
              opacity="0.85"
            />
            <circle cx="150" cy="115" r="48" fill={palette.shape2} opacity="0.9" />
            <path
              d="M 150 75 A 40 40 0 0 0 150 155 A 30 30 0 0 1 150 75 Z"
              fill={palette.bg}
            />
            <circle cx="215" cy="75" r="8" fill={palette.accent} />
          </g>
        )}

        {patternType === 1 && (
          // Concentric Stepped Dunes & Sun
          <g>
            <circle cx="150" cy="90" r="56" fill={palette.shape1} />
            <path
              d="M 0 160 Q 75 120, 150 160 T 300 160 L 300 225 L 0 225 Z"
              fill={palette.shape2}
              opacity="0.9"
            />
            <path
              d="M 0 185 Q 90 150, 190 190 T 300 175 L 300 225 L 0 225 Z"
              fill={palette.accent}
              opacity="0.8"
            />
            <polygon points="150,45 156,58 170,60 160,70 162,84 150,77 138,84 140,70 130,60 144,58" fill={palette.bg} />
          </g>
        )}

        {patternType === 2 && (
          // Geometric 8-Pointed Star & Diamonds
          <g>
            <rect
              x="105"
              y="68"
              width="90"
              height="90"
              fill={palette.shape1}
              opacity="0.9"
              transform="rotate(45 150 113)"
            />
            <rect
              x="105"
              y="68"
              width="90"
              height="90"
              fill={palette.shape2}
              opacity="0.8"
              transform="rotate(0 150 113)"
            />
            <circle cx="150" cy="113" r="28" fill={palette.bg} />
            <circle cx="150" cy="113" r="14" fill={palette.accent} />
            <circle cx="50" cy="45" r="12" fill={palette.shape1} opacity="0.6" />
            <circle cx="250" cy="180" r="16" fill={palette.shape2} opacity="0.6" />
          </g>
        )}

        {patternType === 3 && (
          // Minimalist Sail / Dhow Wedge & Waves
          <g>
            <path
              d="M 90 190 L 150 35 L 210 190 Z"
              fill={palette.shape1}
              opacity="0.9"
            />
            <path
              d="M 150 35 L 210 190 L 150 190 Z"
              fill={palette.shape2}
              opacity="0.75"
            />
            <path
              d="M 0 195 C 60 185, 100 205, 150 195 C 200 185, 240 205, 300 195 L 300 225 L 0 225 Z"
              fill={palette.accent}
              opacity="0.85"
            />
            <circle cx="80" cy="70" r="18" fill={palette.shape2} opacity="0.8" />
          </g>
        )}

        {patternType === 4 && (
          // Diagonal Chevron Weave & Mosaic
          <g>
            <polygon points="150,20 270,113 150,205 30,113" fill={palette.shape1} opacity="0.85" />
            <polygon points="150,55 220,113 150,170 80,113" fill={palette.shape2} opacity="0.9" />
            <polygon points="150,85 185,113 150,140 115,113" fill={palette.accent} />
            <circle cx="35" cy="35" r="10" fill={palette.shape1} />
            <circle cx="265" cy="35" r="10" fill={palette.shape1} />
          </g>
        )}

        {patternType === 5 && (
          // Lantern & Ray Arch Motif
          <g>
            <path
              d="M 110 50 L 190 50 L 210 140 L 150 195 L 90 140 Z"
              fill={palette.shape1}
              opacity="0.9"
            />
            <circle cx="150" cy="115" r="32" fill={palette.shape2} />
            <polygon points="150,95 155,108 168,110 158,119 161,132 150,125 139,132 142,119 132,110 145,108" fill={palette.bg} />
            <path d="M 150 25 L 150 50" stroke={palette.shape2} strokeWidth="4" />
          </g>
        )}
      </svg>
    </div>
  )
}
