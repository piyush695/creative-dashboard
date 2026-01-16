import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdData } from "@/lib/types"

interface ScoresSectionProps {
  adData: AdData | null
}

export default function ScoresSection({ adData }: ScoresSectionProps) {
  if (!adData) return null

  const scores = [
    { name: "Visual Design", score: adData.scoreVisualDesign || 0, color: "from-primary/50" },
    { name: "Typography", score: adData.scoreTypography || 0, color: "from-accent/50" },
    { name: "Color Usage", score: adData.scoreColorUsage || 0, color: "from-primary/30" },
    { name: "Composition", score: adData.scoreComposition || 0, color: "from-accent/30" },
    { name: "CTA Effectiveness", score: adData.scoreCTA || 0, color: "from-primary/40" },
    { name: "Emotional Appeal", score: adData.scoreEmotionalAppeal || 0, color: "from-accent/40" },
    { name: "Trust Signals", score: adData.scoreTrustSignals || 0, color: "from-primary/35" },
    { name: "Urgency", score: adData.scoreUrgency || 0, color: "from-accent/35" },
  ]

  const overallScore = adData.scoreOverall || 0

  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-4">Creative Quality Scores</h3>

      {/* Overall Score */}
      <Card className="mb-6 bg-gradient-to-r from-primary/10 to-accent/10">
        <CardHeader>
          <CardTitle className="text-lg">Overall Quality Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                <span className="text-4xl font-bold text-white">{overallScore}</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-2">Performance Rating</p>
              <div className="w-full bg-border rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500"
                  style={{ width: `${overallScore}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2 font-medium">
                {adData.performanceLabel || (overallScore >= 8 ? "Excellent Performance" : "Good Performance")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {scores.map((score) => (
          <Card key={score.name} className={`bg-gradient-to-br ${score.color} to-card`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">{score.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-foreground">{score.score}</span>
                  <span className="text-xs text-muted-foreground">/10</span>
                </div>
              </div>
              <div className="w-full bg-border rounded-full h-1.5 mt-3">
                <div
                  className="bg-primary h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${(score.score / 10) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

