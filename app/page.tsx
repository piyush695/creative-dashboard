"use client"

import { Suspense, useState, useEffect, useMemo } from "react"
import { Search, ChevronDown, BarChart3, Zap, TestTube, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import DashboardHeader from "@/components/dashboard-header"
import MetricsGrid from "@/components/metrics-grid"
import ScoresSection from "@/components/scores-section"
import InsightsSection from "@/components/insights-section"
import SampleAds from "@/components/sample-ads"
import { fetchAdsFromMongo } from "@/actions/ads"
import { AdData } from "@/lib/types"

function DashboardContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAdId, setSelectedAdId] = useState<string | null>(null)
  const [selectedAccount, setSelectedAccount] = useState<string>("All Accounts")
  const [ads, setAds] = useState<AdData[]>([])
  const [recentHistory, setRecentHistory] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // 1. Extract unique accounts from ad data
  const accounts = useMemo(() => {
    const accSet = new Set<string>()
    ads.forEach(ad => {
      const acc = ad.adName.split('_')[0]
      if (acc) accSet.add(acc)
    })
    return ["All Accounts", ...Array.from(accSet).sort()]
  }, [ads])

  // 2. Load data from MongoDB with real-time polling
  useEffect(() => {
    async function loadData() {
      const data = await fetchAdsFromMongo()
      setAds(data)
      if (isLoading && data.length > 0) {
        const topPerformer = data.find(ad => ad.performanceLabel === "TOP_PERFORMER") || data[0]
        const firstId = topPerformer.id
        setSelectedAdId(firstId)
        setRecentHistory([firstId])
        setIsLoading(false)
      }
    }

    loadData()
    const interval = setInterval(loadData, 30000) // Poll every 30 seconds
    return () => clearInterval(interval)
  }, [isLoading])

  // 3. Memoized displayed ads (Isolated filtering)
  const displayedAds = useMemo(() => {
    let filteredAds = ads

    // First filter by account
    if (selectedAccount !== "All Accounts") {
      filteredAds = ads.filter(ad => ad.adName.split('_')[0] === selectedAccount)
    }

    const query = searchQuery.trim().toLowerCase()

    if (!query) {
      return filteredAds.filter(ad => ad.performanceLabel === "TOP_PERFORMER").slice(0, 10)
    }

    return filteredAds.filter(ad => {
      const idStr = String(ad.adId || "").toLowerCase()
      const nameStr = (ad.adName || "").toLowerCase()
      return idStr.includes(query) || nameStr.includes(query)
    })
  }, [ads, searchQuery, selectedAccount])

  // 4. Selection Sync
  useEffect(() => {
    const query = searchQuery.trim().toLowerCase()

    if (query && displayedAds.length > 0) {
      const firstResultId = displayedAds[0].id
      if (selectedAdId !== firstResultId) {
        setSelectedAdId(firstResultId)
        updateHistory(firstResultId)
      }
    } else if (query && displayedAds.length === 0) {
      setSelectedAdId(null)
    } else if (!query && displayedAds.length > 0) {
      // If no ad is selected OR current selection is not in displayed ads, pick the first one
      if (!selectedAdId || !displayedAds.some(ad => ad.id === selectedAdId)) {
        const firstId = displayedAds[0].id
        setSelectedAdId(firstId)
        updateHistory(firstId)
      }
    }
  }, [searchQuery, displayedAds, selectedAdId])

  const updateHistory = (id: string) => {
    if (!id) return
    setRecentHistory(prev => {
      const filtered = prev.filter(item => item !== id)
      return [id, ...filtered].slice(0, 3)
    })
  }

  const handleSelectAd = (id: string) => {
    setSelectedAdId(id)
    updateHistory(id)
  }

  const selectedAdData = ads.find(ad => ad.id === selectedAdId) || null

  const recentAds = recentHistory
    .map(id => ads.find(ad => ad.id === id))
    .filter((ad): ad is AdData => !!ad)

  const handleAction = (action: string) => {
    console.log(`Action: ${action}`)
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg font-medium">Analyzing Creative Data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar - Desktop only */}
      <aside className="w-72 border-r border-border bg-card hidden md:flex flex-col flex-shrink-0">
        <div className="p-6">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Creative AI</h1>
          <p className="text-xs text-muted-foreground mt-1 font-medium italic">Live Database Insights</p>
        </div>

        {/* Desktop Actions */}
        <div className="px-6 py-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between bg-primary/5 text-foreground hover:bg-primary/10 border-primary/20 font-semibold"
              >
                <span className="truncate">{selectedAccount}</span>
                <ChevronDown className="h-4 w-4 opacity-50 ml-2 flex-shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-60 max-h-80 overflow-y-auto">
              {accounts.map((account) => (
                <DropdownMenuItem
                  key={account}
                  onClick={() => {
                    setSelectedAccount(account)
                    // Reset selection if current ad is not in the new account
                    if (account !== "All Accounts") {
                      const firstAdInAccount = ads.find(ad => ad.adName.split('_')[0] === account)
                      if (firstAdInAccount) handleSelectAd(firstAdInAccount.id)
                    }
                  }}
                  className={selectedAccount === account ? "bg-primary/10 font-bold" : ""}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  <span>{account}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Desktop Search */}
        <div className="px-6 py-4 border-t border-border">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search adId or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-9 bg-muted/30 border-muted focus-visible:ring-primary/20"
            />
          </div>
        </div>

        {/* Desktop History */}
        <div className="px-6 py-4 border-t border-border flex-1 overflow-auto">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">Jump Back In</h3>
          <div className="space-y-2">
            {recentAds.map((ad) => (
              <button
                key={ad.id}
                onClick={() => handleSelectAd(ad.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg transition-all border ${selectedAdId === ad.id
                  ? "bg-primary border-primary text-primary-foreground shadow-sm"
                  : "border-transparent hover:bg-muted text-foreground"
                  }`}
              >
                <span className="text-xs font-bold leading-tight line-clamp-1 block">{ad.adName}</span>
                <span className="text-[9px] opacity-60 font-mono mt-0.5 block">{ad.adId}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-[#FDFBF7] scroll-smooth">
        <DashboardHeader />

        <div className="p-4 md:p-8 max-w-[1600px] mx-auto space-y-6 md:space-y-12">
          {/* Mobile Search Box - Only visible on mobile */}
          <div className="md:hidden space-y-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between bg-white text-foreground hover:bg-gray-50 border-gray-200 font-semibold h-10 shadow-sm"
                >
                  <span className="truncate">{selectedAccount}</span>
                  <ChevronDown className="h-4 w-4 opacity-50 ml-2 flex-shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[calc(100vw-2rem)] max-h-80 overflow-y-auto">
                {accounts.map((account) => (
                  <DropdownMenuItem
                    key={account}
                    onClick={() => {
                      setSelectedAccount(account)
                      if (account !== "All Accounts") {
                        const firstAdInAccount = ads.find(ad => ad.adName.split('_')[0] === account)
                        if (firstAdInAccount) handleSelectAd(firstAdInAccount.id)
                      }
                    }}
                    className={selectedAccount === account ? "bg-primary/10 font-bold" : ""}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    <span>{account}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search Account ID or Ad Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 bg-white shadow-sm border-gray-200 focus-visible:ring-primary/20"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {recentAds.map((ad) => (
                <button
                  key={ad.id}
                  onClick={() => handleSelectAd(ad.id)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-all ${selectedAdId === ad.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-white text-foreground border-gray-200"
                    }`}
                >
                  {ad.adName.split('_')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Ad Grid Section */}
          <section className="space-y-4">
            <SampleAds
              ads={displayedAds}
              searchQuery={searchQuery}
              selectedAdId={selectedAdId}
              onSelect={handleSelectAd}
            />
          </section>

          {displayedAds.length > 0 && (
            <div className="space-y-6 md:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Core Metrics */}
              <div className="pt-6 border-t border-border">
                <MetricsGrid adData={selectedAdData} />
              </div>

              {/* Scores & Insights - ONLY visible when searching */}
              {searchQuery.trim() && (
                <>
                  {/* Scores */}
                  <section className="pt-4 border-t border-border">
                    <ScoresSection adData={selectedAdData} />
                  </section>

                  {/* Insights */}
                  <section className="pt-4 border-t border-border pb-12">
                    <InsightsSection adData={selectedAdData} />
                  </section>
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default function Dashboard() {
  return (
    <Suspense fallback={null}>
      <DashboardContent />
    </Suspense>
  )
}
