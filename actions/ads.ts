"use server"

import clientPromise from "@/lib/mongodb-client";
import { AdData } from "@/lib/types";

export async function fetchAdsFromMongo(): Promise<AdData[]> {
    try {
        const client = await clientPromise;
        const db = client.db("reddit_data");
        const ads = await db.collection("creative_data").find({}).toArray();

        return ads.map((doc, index) => {
            const adId = String(doc.adId || "").trim();
            const adName = String(doc.adName || "").trim();
            return {
                ...doc,
                id: doc._id.toString(), // Use MongoDB's _id as the unique key
                adId: adId,
                adName: adName,
                spend: Number(doc.spend) || 0,
                purchaseValue: Number(doc.purchaseValue) || 0,
                purchases: Number(doc.purchases) || 0,
                roas: Number(doc.roas) || 0,
                ctr: Number(doc.ctr) || 0,
                cpc: Number(doc.cpc) || 0,
                cpm: Number(doc.cpm) || 0,
                cpp: Number(doc.cpp) || 0,
                aov: Number(doc.aov) || 0,
                scoreVisualDesign: Number(doc.scoreVisualDesign) || 0,
                scoreTypography: Number(doc.scoreTypography) || 0,
                scoreColorUsage: Number(doc.scoreColorUsage) || 0,
                scoreComposition: Number(doc.scoreComposition) || 0,
                scoreCTA: Number(doc.scoreCTA) || 0,
                scoreEmotionalAppeal: Number(doc.scoreEmotionalAppeal) || 0,
                scoreTrustSignals: Number(doc.scoreTrustSignals) || 0,
                scoreUrgency: Number(doc.scoreUrgency) || 0,
                scoreOverall: Number(doc.scoreOverall) || 0,
                _id: doc._id.toString()
            } as any as AdData;
        });
    } catch (e) {
        console.error("Failed to fetch ads from MongoDB:", e);
        return [];
    }
}
