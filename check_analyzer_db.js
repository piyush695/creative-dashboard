const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://n8n_user:23172410@cluster0.drr2ppd.mongodb.net/?appName=Cluster0";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('creative_analyzer');
        const collections = await db.listCollections().toArray();
        console.log("Collections in creative_analyzer:");
        for (let col of collections) {
            console.log(` - ${col.name}`);
        }
    } finally {
        await client.close();
    }
}

main().catch(console.error);
