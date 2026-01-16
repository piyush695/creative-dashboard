const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://n8n_user:23172410@cluster0.drr2ppd.mongodb.net/?appName=Cluster0";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('reddit_data');
        const docs = await db.collection('creative_data').find({}).limit(100).toArray();
        const allKeys = new Set();
        docs.forEach(doc => {
            Object.keys(doc).forEach(key => allKeys.add(key));
        });
        console.log("Unique keys found in first 100 docs:");
        console.log(Array.from(allKeys).join(', '));

        // Find if any document has 'account' in its keys
        const accountKeys = Array.from(allKeys).filter(k => k.toLowerCase().includes('account'));
        console.log("Account related keys:", accountKeys);

        if (accountKeys.length > 0) {
            const sampleWithAccount = docs.find(d => d[accountKeys[0]]);
            if (sampleWithAccount) {
                console.log("Sample value for " + accountKeys[0] + ": " + sampleWithAccount[accountKeys[0]]);
            }
        }
    } finally {
        await client.close();
    }
}

main().catch(console.error);
