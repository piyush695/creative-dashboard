const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://n8n_user:23172410@cluster0.drr2ppd.mongodb.net/?appName=Cluster0";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('reddit_data');
        const doc = await db.collection('creative_data').findOne();
        if (doc) {
            console.log("Sample document keys from creative_data:");
            console.log(Object.keys(doc));
            console.log("Sample values:");
            console.log(JSON.stringify(doc, null, 2));
        } else {
            console.log("No documents found in reddit_data.creative_data");
        }
    } finally {
        await client.close();
    }
}

main().catch(console.error);
