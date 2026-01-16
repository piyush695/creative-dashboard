"use client"

import { useEffect, useState } from "react"

export default function DashboardHeader() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="border-b border-border bg-card sticky top-0 z-10">
      <div className="px-8 py-4 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Creative Performance</h2>
          <p className="text-sm text-muted-foreground mt-1">Analyze and optimize your ad creatives</p>
        </div>
        {/* <div className="text-xs text-muted-foreground">
          Last updated: {mounted ? new Date().toLocaleDateString() : "Loading..."}
        </div> */}
      </div>
    </div>
  )
}
