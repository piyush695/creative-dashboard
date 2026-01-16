const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://n8n_user:23172410@cluster0.drr2ppd.mongodb.net/?appName=Cluster0";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('reddit_data');
        const doc = await db.collection('creative_data').findOne();
        if (doc) {
            const keys = Object.keys(doc);
            console.log("KEYS_START");
            keys.forEach(k => console.log(k));
            console.log("KEYS_END");

            // Check for values of interesting keys
            const interestingKeys = ['accountName', 'account_name', 'account', 'client', 'clientName', 'adAccount'];
            interestingKeys.forEach(k => {
                if (doc[k]) {
                    console.log(`FOUND_${k}: ${doc[k]}`);
                }
            });
        }
    } finally {
        await client.close();
    }
}

main().catch(console.error);
