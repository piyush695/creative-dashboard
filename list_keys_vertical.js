const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://n8n_user:23172410@cluster0.drr2ppd.mongodb.net/?appName=Cluster0";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('reddit_data');
        const doc = await db.collection('creative_data').findOne();
        if (doc) {
            console.log("KEYS_START");
            for (let k in doc) {
                console.log(k);
            }
            console.log("KEYS_END");
        }
    } finally {
        await client.close();
    }
}

main().catch(console.error);
