const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://n8n_user:23172410@cluster0.drr2ppd.mongodb.net/?appName=Cluster0";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const dbList = ["creative_analyzer", "reddit_data"];
        for (const dbName of dbList) {
            const db = client.db(dbName);
            const collections = await db.listCollections().toArray();
            console.log(`Collections in ${dbName}:`);
            for (const col of collections) {
                const count = await db.collection(col.name).countDocuments();
                console.log(` - ${col.name} (${count} docs)`);
                if (count > 0) {
                    const doc = await db.collection(col.name).findOne();
                    console.log(`   Sample:`, JSON.stringify(doc).substring(0, 100));
                }
            }
        }
    } finally {
        await client.close();
    }
}

main().catch(console.error);
