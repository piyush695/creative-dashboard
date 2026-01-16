import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AdData } from "@/lib/types"

interface SampleAdsProps {
  ads: AdData[]
  searchQuery: string
  selectedAdId: string | null
  onSelect: (id: string) => void
}

export default function SampleAds({ ads = [], searchQuery, selectedAdId, onSelect }: SampleAdsProps) {
  const adList = Array.isArray(ads) ? ads : []

  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-4">Your Ads</h3>
      {adList.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border rounded-lg bg-card/50 text-muted-foreground">
          <p className="text-xs text-center opacity-80">No ads found matching your search.</p>
        </div>
      ) : (
        <div className="flex overflow-x-auto sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 pb-4 sm:pb-0 scrollbar-none snap-x snap-mandatory">
          {adList.map((ad) => (
            <Card
              key={ad.id}
              onClick={() => onSelect(ad.id)}
              className={`transition-all cursor-pointer border-2 overflow-hidden flex flex-col flex-shrink-0 w-[260px] sm:w-auto snap-center ${selectedAdId === ad.id
                ? "border-primary bg-primary/[0.03] ring-1 ring-primary/10 shadow-md"
                : "border-transparent hover:border-primary/30 shadow-sm hover:shadow-md"
                }`}
            >
              <CardHeader className="p-3.5 pb-2.5 space-y-2.5">
                {/* Row 1: Badge Only (Zero Overlap) */}
                <div className="flex">
                  <span
                    className={`text-[8px] px-2 py-0.5 rounded-full font-black uppercase tracking-tighter whitespace-nowrap shadow-sm ${ad.performanceLabel === "TOP_PERFORMER"
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : ad.performanceLabel === "AVERAGE"
                        ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                        : "bg-red-100 text-red-700 border border-red-200"
                      }`}
                  >
                    {ad.performanceLabel || "Active"}
                  </span>
                </div>

                {/* Row 2: Title & ID */}
                <div className="space-y-1.5">
                  <CardTitle className="text-[12px] font-extrabold leading-[1.3] text-foreground/90 break-all">
                    {ad.adName}
                  </CardTitle>
                  <CardDescription className="text-[9px] font-mono leading-none opacity-50 break-all">
                    ID: {ad.adId}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-3 pt-0 flex-1 flex flex-col">
                <div className="aspect-[3/2] w-full overflow-hidden rounded-md bg-muted shadow-inner relative group mb-3">
                  <img
                    src={ad.thumbnailUrl || "/placeholder.svg"}
                    alt={ad.adName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex justify-between items-end mt-auto gap-2 border-t border-border/50 pt-2.5">
                  <div className="min-w-0">
                    <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-tighter leading-none mb-1">Spend</p>
                    <p className="text-[11px] font-bold truncate">${Number(ad.spend).toLocaleString()}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-tighter leading-none mb-1">ROAS</p>
                    <p className="text-base font-black text-primary leading-none">{ad.roas}x</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
