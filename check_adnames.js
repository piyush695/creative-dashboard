const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://n8n_user:23172410@cluster0.drr2ppd.mongodb.net/?appName=Cluster0";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('reddit_data');
        const docs = await db.collection('creative_data').find({}).limit(20).toArray();
        console.log("Sample adNames:");
        docs.forEach(doc => {
            console.log(` - ${doc.adName}`);
        });
    } finally {
        await client.close();
    }
}

main().catch(console.error);
