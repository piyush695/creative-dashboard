const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://n8n_user:23172410@cluster0.drr2ppd.mongodb.net/?appName=Cluster0";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('reddit_data');
        const collections = await db.listCollections().toArray();
        console.log("COLLECTIONS_START");
        collections.forEach(c => console.log(c.name));
        console.log("COLLECTIONS_END");
    } finally {
        await client.close();
    }
}

main().catch(console.error);
