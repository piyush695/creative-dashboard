const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://n8n_user:23172410@cluster0.drr2ppd.mongodb.net/?appName=Cluster0";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('reddit_data');
        const collections = await db.listCollections().toArray();
        console.log("Collections in reddit_data:");
        for (let col of collections) {
            const count = await db.collection(col.name).countDocuments();
            console.log(` - ${col.name}: ${count} docs`);
            if (count > 0) {
                const doc = await db.collection(col.name).findOne();
                console.log(`   Sample keys: ${Object.keys(doc).join(', ')}`);
                if (doc.accountName || doc.account_name || doc.account || doc.adAccount) {
                    console.log(`   Found account field!`);
                }
            }
        }
    } finally {
        await client.close();
    }
}

main().catch(console.error);
