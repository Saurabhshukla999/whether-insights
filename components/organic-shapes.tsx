"use client"

export function OrganicShapes() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Large flowing shape */}
      <div className="absolute -top-1/2 -right-1/2 w-full h-full">
        <div className="w-full h-full bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-blob"></div>
      </div>

      {/* Medium flowing shape */}
      <div className="absolute -bottom-1/2 -left-1/2 w-3/4 h-3/4">
        <div className="w-full h-full bg-gradient-to-tr from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      {/* Small flowing shape */}
      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2">
        <div className="w-full h-full bg-gradient-to-bl from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Curved section dividers */}
      <div className="absolute top-1/2 left-0 right-0 h-32 transform -translate-y-1/2">
        <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,0 C300,120 900,120 1200,0 L1200,120 L0,120 Z"
            fill="rgba(17, 24, 39, 0.1)"
            className="animate-wave"
          />
        </svg>
      </div>
    </div>
  )
}
