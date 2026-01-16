const { getDb } = require('./db_config');

const adData = {
    adId: "120240786545380566",
    adName: "Promo_1_STEP_CHALLENGE_250K",
    thumbnailUrl: "https://res.cloudinary.com/dubdunhmp/image/upload/v1768475852/fy3x2w22zsc8p0b8p0b8p0b8p.png",
    spend: 185.16,
    purchaseValue: 185.16,
    purchases: 1,
    roas: 1.00,
    ctr: 0.21,
    cpc: 1.75,
    cpm: 0.00,
    cpp: 0.00,
    aov: 185.16,
    scoreVisualDesign: 7,
    scoreTypography: 7,
    scoreColorUsage: 7,
    scoreComposition: 7,
    scoreCTA: 6,
    scoreEmotionalAppeal: 7,
    scoreTrustSignals: 3,
    scoreUrgency: 2,
    scoreOverall: 6.2,
    performanceLabel: "TOP_PERFORMER",
    designQuality: "PROFESSIONAL",
    psychologyStrength: "MODERATE",
    keyStrengths: "Strong emphasis on $250K account size grabs attention | Green color conveys growth",
    keyWeaknesses: "No trust signals to build credibility | Lacks urgency elements",
    topInsight: "Primary numeric anchor successfully hooks the target demographic but requires trust signals.",
    primaryRecommendation: "Add a trust signal near the CTA to enhance credibility.",
    hierarchyAnalysis: "Clear primary and secondary focus; could improve tertiary emphasis",
    colorPsychology: "Green indicates money/growth; pastel background reduces financial seriousness",
    typographyNotes: "Good size and weight hierarchy with readable fonts",
    compositionNotes: "Centered layout maintains balance; Z-pattern might be better",
    mobileReadiness: "Text sizes and CTA tap area meet mobile standards",
    recommendation1: "Add payout/trader count trust badge near CTA",
    recommendation1Impact: "+15-25% conversion rate",
    recommendation1Effort: "LOW",
    recommendation2: "Update CTA to 'Get Funded Now' for stronger action",
    recommendation2Impact: "+10% click-through rate",
    recommendation2Effort: "LOW",
    recommendation3: "Implement limited-time offer or countdown timer",
    recommendation3Impact: "+20% urgency-driven conversions",
    recommendation3Effort: "MEDIUM",
    actionScale: "YES",
    actionPause: "NO",
    actionOptimize: "YES",
    actionTest: "YES",
    analysisDate: "2026-01-15",
    rawAnalysis: "The ad creative features a visually striking design centered around the $250K challenge..."
};

async function insertTargetAd() {
    const { client, db } = await getDb();
    try {
        const collection = db.collection('creative_data');

        console.log(`Checking for adId: ${adData.adId}`);
        const result = await collection.updateOne(
            { adId: adData.adId },
            { $set: adData },
            { upsert: true }
        );

        if (result.upsertedCount > 0) {
            console.log("Successfully inserted the target ad.");
        } else {
            console.log("Ad already existed, updated with new data.");
        }
    } finally {
        await client.close();
    }
}

insertTargetAd().catch(console.error);
