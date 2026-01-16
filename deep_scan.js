const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://n8n_user:23172410@cluster0.drr2ppd.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri);

async function scanCluster() {
    const targetIds = [
        "120240786547410566",
        "120240402864720566",
        "120236893486900566",
        "120236792555720566",
        "120240786547420566",
        "120240786545380566"
    ];

    try {
        await client.connect();
        const adminDb = client.db().admin();
        const dbsList = await adminDb.listDatabases();

        for (const dbInfo of dbsList.databases) {
            const dbName = dbInfo.name;
            if (["admin", "local", "config"].includes(dbName)) continue;

            const db = client.db(dbName);
            const collections = await db.listCollections().toArray();

            for (const colInfo of collections) {
                const colName = colInfo.name;
                const collection = db.collection(colName);

                // Find any of the target IDs as string OR number
                const found = await collection.find({
                    $or: [
                        { adId: { $in: targetIds } },
                        { adId: { $in: targetIds.map(id => Number(id)) } }
                    ]
                }).toArray();

                if (found.length > 0) {
                    console.log(`FOUND ${found.length} documents in ${dbName}.${colName}`);
                    found.forEach(doc => {
                        console.log(` - ID: ${doc.adId}, Name: ${doc.adName}`);
                    });
                }
            }
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

scanCluster();
