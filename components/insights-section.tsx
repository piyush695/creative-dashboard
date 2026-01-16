import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, TrendingUp, Lightbulb } from "lucide-react"
import { AdData } from "@/lib/types"

interface InsightsSectionProps {
  adData: AdData | null
}

export default function InsightsSection({ adData }: InsightsSectionProps) {
  if (!adData) return null

  const strengths = adData.keyStrengths?.split("|").map(s => s.trim()).filter(Boolean) || []
  const weaknesses = adData.keyWeaknesses?.split("|").map(s => s.trim()).filter(Boolean) || []

  const recommendations = [
    { text: adData.recommendation1, impact: adData.recommendation1Impact, effort: adData.recommendation1Effort },
    { text: adData.recommendation2, impact: adData.recommendation2Impact, effort: adData.recommendation2Effort },
    { text: adData.recommendation3, impact: adData.recommendation3Impact, effort: adData.recommendation3Effort },
  ].filter(r => r.text)

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">AI Analysis & Insights</h3>

      {/* Top Insight */}
      <Card className="border-l-4 border-l-primary bg-gradient-to-r from-primary/5 to-transparent">
        <CardHeader>
          <div className="flex gap-3 items-start">
            <Lightbulb className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <CardTitle className="text-base">Key Insight</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground leading-relaxed">{adData.topInsight}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strengths */}
        <Card>
          <CardHeader>
            <div className="flex gap-3 items-center">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <CardTitle className="text-base">Key Strengths</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {strengths.map((strength, idx) => (
                <li key={idx} className="flex gap-3 text-sm">
                  <span className="text-green-600 font-bold shrink-0">✓</span>
                  <span className="text-foreground">{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Weaknesses */}
        <Card>
          <CardHeader>
            <div className="flex gap-3 items-center">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              <CardTitle className="text-base">Areas to Improve</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {weaknesses.map((weakness, idx) => (
                <li key={idx} className="flex gap-3 text-sm">
                  <span className="text-amber-600 font-bold shrink-0">→</span>
                  <span className="text-foreground">{weakness}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recommendations for Optimization</CardTitle>
          <CardDescription>Actionable steps to improve your creative performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-4 p-4 rounded-lg bg-secondary/50 border border-border">
                <div className="flex gap-3 flex-1">
                  <span className="text-primary font-bold flex-shrink-0">{idx + 1}.</span>
                  <p className="text-sm text-foreground">{rec.text}</p>
                </div>
                <div className="flex gap-4 items-center shrink-0">
                  {rec.impact && (
                    <div className="flex flex-col items-center px-3 py-1 bg-primary/10 rounded">
                      <span className="text-[10px] uppercase text-muted-foreground">Impact</span>
                      <span className="text-xs font-semibold text-primary">{rec.impact}</span>
                    </div>
                  )}
                  {rec.effort && (
                    <div className="flex flex-col items-center px-3 py-1 bg-muted rounded">
                      <span className="text-[10px] uppercase text-muted-foreground">Effort</span>
                      <span className="text-xs font-semibold">{rec.effort}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

