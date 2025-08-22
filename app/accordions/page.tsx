import React from 'react'
import Link from 'next/link'

function Accordions() {
  return (
    <div>
      <Link href="/" className="absolute top-6 left-6 flex items-center group">
            <svg
            className="w-8 h-8 text-gray-700 group-hover:text-blue-600 transition"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="sr-only">Go Home</span>
      </Link>
      <div>Accordions</div>
      </div>
  )
}

export default Accordions