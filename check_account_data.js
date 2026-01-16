const { getDb } = require('./db_config');

async function main() {
    const { client, db } = await getDb();

    try {
        const doc = await db.collection('creative_data').findOne({});
        if (doc) {
            console.log("FIELDS_START");
            for (let k in doc) {
                console.log(`${k} (${typeof doc[k]}): ${String(doc[k]).substring(0, 40)}`);
            }
            console.log("FIELDS_END");
        }
    } finally {
        await client.close();
    }
}

main().catch(console.error);
