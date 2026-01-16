const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://n8n_user:23172410@cluster0.drr2ppd.mongodb.net/?appName=Cluster0";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('creative_analyzer');
        const collections = await db.listCollections().toArray();
        console.log("Collections in creative_analyzer:");
        collections.forEach(col => console.log(` - ${col.name}`));

        if (collections.length > 0) {
            const firstCol = db.collection(collections[0].name);
            const doc = await firstCol.findOne();
            console.log("Sample document from", collections[0].name, ":");
            console.log(JSON.stringify(doc, null, 2));
        }
    } finally {
        await client.close();
    }
}

main().catch(console.error);
