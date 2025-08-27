import React from 'react'
import Link from 'next/link'
import Accordion from './accordion'

function Accordions() {

  const dataItems = [
          {
            title: "What is Github and how does it work?",
            content:
              "GitHub is the home for all developers—a platform where you can share code, contribute to open source projects, or even automate your workflow with tools like GitHub Actions and Packages. If you’re just getting started with GitHub, you may know us best as a place for version control and collaboration.",
          },
          {
            title: "How do I see GitHub's availability?",
            content: "Check our real-time status report",
          },
          {
            title: "Why is GitHub so popular?",
            content:
              "GitHub is built by developers for developers, and we’re proud to be home to the world’s largest open source community. With 50 million developers and millions more open source projects, GitHub has become the go-to place to collaborate and build software together.",
          },
]


  return (
    <div className='container'>
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
      { dataItems.map ((item, index) => (
        <Accordion key={index} item={item} />
      ))}
    </div>
  )
}

export default Accordions