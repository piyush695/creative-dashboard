const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://n8n_user:23172410@cluster0.drr2ppd.mongodb.net/?appName=Cluster0";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const adminDb = client.db().admin();
        const dbs = await adminDb.listDatabases();

        console.log("DATABASES_START");
        for (let dbInfo of dbs.databases) {
            const dbName = dbInfo.name;
            if (['admin', 'local', 'config'].includes(dbName)) continue;
            console.log(`DB: ${dbName}`);
            const db = client.db(dbName);
            const cols = await db.listCollections().toArray();
            cols.forEach(c => {
                console.log(`  COL: ${c.name}`);
            });
        }
        console.log("DATABASES_END");
    } finally {
        await client.close();
    }
}

main().catch(console.error);
