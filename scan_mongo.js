const { MongoClient } = require('mongodb');
const { MONGO_URI } = require('./db_config');

async function main() {
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();
        const adminDb = client.db().admin();
        const dbs = await adminDb.listDatabases();

        for (const dbInfo of dbs.databases) {
            const dbName = dbInfo.name;
            if (["admin", "local", "config"].includes(dbName)) continue;

            const db = client.db(dbName);
            const collections = await db.listCollections().toArray();
            console.log(`Database: ${dbName}`);
            for (const col of collections) {
                const count = await db.collection(col.name).countDocuments();
                console.log(` - ${col.name}: ${count} docs`);
                if (count > 0) {
                    const doc = await db.collection(col.name).findOne();
                    console.log(`   Sample keys:`, Object.keys(doc).join(', '));
                }
            }
        }
    } finally {
        await client.close();
    }
}

main().catch(console.error);
