const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://n8n_user:23172410@cluster0.drr2ppd.mongodb.net/?appName=Cluster0";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('reddit_data');
        const collections = await db.listCollections().toArray();
        for (let col of collections) {
            console.log(`COLLECTION: ${col.name}`);
            const doc = await db.collection(col.name).findOne();
            if (doc) {
                console.log(`SAMPLE KEYS: ${Object.keys(doc).join(', ')}`);
            }
        }
    } finally {
        await client.close();
    }
}

main().catch(console.error);
