const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://n8n_user:23172410@cluster0.drr2ppd.mongodb.net/?appName=Cluster0";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('reddit_data');
        const doc = await db.collection('creative_data').findOne();
        if (doc) {
            console.log("KEYS:");
            Object.keys(doc).forEach(k => {
                console.log(k + ": " + (typeof doc[k] === 'string' ? doc[k].substring(0, 50) : doc[k]));
            });
        }
    } finally {
        await client.close();
    }
}

main().catch(console.error);
