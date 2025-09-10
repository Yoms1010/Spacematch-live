import Link from 'next/link'
import React from 'react'

function SidebarLoading() {
  return (
    <div>
      <nav className="flex flex-col gap-4">
        <Link 
            href={""}
            className={'sidebar-link'}
        >
            <div className="relative size-6 w-10 h-10 border animate-pulse">

            </div>
            <p className={"w-full h-10 border animate-pulse"}>
            
            </p>
        </Link>
      </nav>
    </div>
  )
}

export default SidebarLoading
