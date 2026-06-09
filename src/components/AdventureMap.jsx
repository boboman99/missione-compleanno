import { useEffect, useState } from 'react'

const W = 280
const H = 390

const WAYPOINTS = [
  { name: 'Lucca',        x: 52,  y: 52  },
  { name: 'Massa',        x: 90,  y: 126 },
  { name: 'Tellaro',      x: 156, y: 218 },
  { name: 'Fiascherino',  x: 185, y: 268 },
  { name: 'Lerici',       x: 210, y: 326 },
]

// Full path as a series of cubic bezier segments
const PATH_D =
  'M 52,52 C 62,84 76,104 90,126 C 112,154 134,192 156,218 C 166,237 176,254 185,268 C 194,286 202,307 210,326'

// Build individual segment paths for visited highlighting
const SEGMENTS = [
  'M 52,52 C 62,84 76,104 90,126',
  'M 90,126 C 112,154 134,192 156,218',
  'M 156,218 C 166,237 176,254 185,268',
  'M 185,268 C 194,286 202,307 210,326',
]

export default function AdventureMap({ completedMissions = [], scooterOverride = null }) {
  const n = completedMissions.length
  const basePos = { x: WAYPOINTS[Math.min(n, 4)].x, y: WAYPOINTS[Math.min(n, 4)].y }
  const [pos, setPos] = useState(scooterOverride ?? basePos)

  useEffect(() => {
    const target = scooterOverride ?? { x: WAYPOINTS[Math.min(n, 4)].x, y: WAYPOINTS[Math.min(n, 4)].y }
    const t = setTimeout(() => setPos(target), 80)
    return () => clearTimeout(t)
  }, [n, scooterOverride])

  return (
    <div className="map-wrap">
      <div className="map-eyebrow">Il tuo viaggio</div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="map-svg"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Mappa del percorso"
      >
        <defs>
          <linearGradient id="map-bg-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1a0a28" />
            <stop offset="100%" stopColor="#110820" />
          </linearGradient>
          <linearGradient id="sea-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2a1040" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#0d0618" stopOpacity="0.35" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Background */}
        <rect width={W} height={H} rx="10" fill="url(#map-bg-g)" />

        {/* Sea area */}
        <path
          d={`M 140,0 C 155,60 160,110 140,165 C 130,195 125,235 132,285 C 138,328 145,360 155,${H} L ${W},${H} L ${W},0 Z`}
          fill="url(#sea-g)"
        />

        {/* Subtle coastline */}
        <path
          d="M 140,0 C 155,60 160,110 140,165 C 130,195 125,235 132,285 C 138,328 145,360 155,390"
          fill="none"
          stroke="rgba(180,100,160,0.2)"
          strokeWidth="1.5"
        />

        {/* Small wave marks in sea */}
        {[{ x: 200, y: 90 }, { x: 230, y: 160 }, { x: 215, y: 240 }, { x: 240, y: 300 }].map((w, i) => (
          <g key={i} opacity="0.22">
            <path d={`M ${w.x},${w.y} Q ${w.x + 7},${w.y - 4} ${w.x + 14},${w.y}`}
              fill="none" stroke="#c090d0" strokeWidth="1.2" strokeLinecap="round" />
            <path d={`M ${w.x + 2},${w.y + 5} Q ${w.x + 9},${w.y + 1} ${w.x + 16},${w.y + 5}`}
              fill="none" stroke="#c090d0" strokeWidth="1" strokeLinecap="round" />
          </g>
        ))}

        {/* Grey future path */}
        <path
          d={PATH_D}
          fill="none"
          stroke="rgba(180,120,160,0.15)"
          strokeWidth="2"
          strokeDasharray="5 5"
          strokeLinecap="round"
        />

        {/* Gold visited segments */}
        {SEGMENTS.slice(0, n).map((seg, i) => (
          <path
            key={i}
            d={seg}
            fill="none"
            stroke="#D4A853"
            strokeWidth="2.5"
            strokeDasharray="5 4"
            strokeLinecap="round"
            opacity="0.85"
            filter="url(#glow)"
          />
        ))}

        {/* Waypoint dots */}
        {WAYPOINTS.map((wp, i) => {
          const reached = i <= n
          const isCurrent = i === n && n < 5
          return (
            <g key={wp.name}>
              {isCurrent && (
                <circle cx={wp.x} cy={wp.y} r="12" fill="rgba(212,168,83,0.12)">
                  <animate attributeName="r" values="10;15;10" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0.0;0.3" dur="2.4s" repeatCount="indefinite" />
                </circle>
              )}
              <circle
                cx={wp.x} cy={wp.y}
                r={reached ? 7 : 5}
                fill={reached ? '#c9a96e' : 'none'}
                stroke={reached ? '#e0c88c' : 'rgba(180,120,160,0.35)'}
                strokeWidth="1.5"
              />
              {reached && (
                <circle cx={wp.x} cy={wp.y} r="3" fill="#fff" opacity="0.7" />
              )}
              {/* City label — solo tappe raggiunte */}
              {reached && (
                <text
                  x={wp.x}
                  y={wp.y - 12}
                  textAnchor="middle"
                  fontSize="8"
                  fontStyle="italic"
                  fontFamily="Georgia, serif"
                  fill="#D4A853"
                >
                  {wp.name}
                </text>
              )}
            </g>
          )
        })}

        {/* Animated scooter */}
        <text
          x={pos.x}
          y={pos.y + 6}
          textAnchor="middle"
          fontSize="16"
          style={{
            transition: 'x 1.4s cubic-bezier(0.25,0.46,0.45,0.94), y 1.4s cubic-bezier(0.25,0.46,0.45,0.94)',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.6))',
          }}
        >
          🛵
        </text>

        {/* Compass rose — top right */}
        <g transform="translate(248, 28)" opacity="0.45">
          <circle cx="0" cy="0" r="14" fill="none" stroke="rgba(201,169,110,0.3)" strokeWidth="1" />
          <text x="0" y="-17" textAnchor="middle" fontSize="7" fill="#c9a96e" fontWeight="bold">N</text>
          <line x1="0" y1="-11" x2="0" y2="-4" stroke="#c9a96e" strokeWidth="1" />
          <line x1="0" y1="4" x2="0" y2="11" stroke="rgba(212,132,122,0.4)" strokeWidth="1" />
          <line x1="-11" y1="0" x2="-4" y2="0" stroke="rgba(212,132,122,0.4)" strokeWidth="1" />
          <line x1="4" y1="0" x2="11" y2="0" stroke="rgba(212,132,122,0.4)" strokeWidth="1" />
          <circle cx="0" cy="0" r="2" fill="#c9a96e" />
        </g>

        {/* Decorative border */}
        <rect
          x="3" y="3" width={W - 6} height={H - 6}
          rx="8"
          fill="none"
          stroke="rgba(212,168,83,0.18)"
          strokeWidth="1"
        />
      </svg>
    </div>
  )
}
