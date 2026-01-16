import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdData } from "@/lib/types"

interface MetricsGridProps {
  adData: AdData | null
}

export default function MetricsGrid({ adData }: MetricsGridProps) {
  const metrics = [
    { label: "ROAS", value: adData?.roas || "0.00", unit: "x" },
    { label: "CTR", value: adData?.ctr || "0.00", unit: "%" },
    { label: "CPC", value: `$${adData?.cpc || "0.00"}`, unit: "" },
    { label: "CPM", value: `$${adData?.cpm || "0.00"}`, unit: "" },
    { label: "CPP", value: `$${adData?.cpp || "0.00"}`, unit: "" },
    { label: "AOV", value: `$${adData?.aov || "0.00"}`, unit: "" },
  ]

  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-4">Performance Metrics</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.label} className="bg-gradient-to-br from-card to-secondary">
            <CardHeader className="pb-2 text-center md:text-left">
              <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{metric.label}</CardTitle>
            </CardHeader>
            <CardContent className="text-center md:text-left">
              <div className="flex items-baseline justify-center md:justify-start gap-1">
                <span className="text-xl md:text-2xl font-bold text-foreground">{metric.value}</span>
                <span className="text-xs text-muted-foreground">{metric.unit}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

