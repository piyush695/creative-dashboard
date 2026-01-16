const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://n8n_user:23172410@cluster0.drr2ppd.mongodb.net/?appName=Cluster0";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('reddit_data');
        const docs = await db.collection('creative_data').find({}).toArray();
        const allKeys = new Set();
        docs.forEach(doc => {
            Object.keys(doc).forEach(k => allKeys.add(k));
        });
        console.log("All unique keys in creative_data:");
        console.log(Array.from(allKeys).join(', '));
    } finally {
        await client.close();
    }
}

main().catch(console.error);
