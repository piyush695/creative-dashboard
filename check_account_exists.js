const { getDb } = require('./db_config');

async function main() {
    const { client, db } = await getDb();

    try {
        const col = db.collection('creative_data');
        const count = await col.countDocuments();
        console.log(`creative_data count: ${count}`);

        // Find one document that has 'accountName' or similar
        const withAccount = await col.findOne({ accountName: { $exists: true } });
        if (withAccount) {
            console.log("Found with accountName:", withAccount.accountName);
        } else {
            const anyDoc = await col.findOne();
            console.log("Sample doc keys:", Object.keys(anyDoc));
        }
    } finally {
        await client.close();
    }
}

main().catch(console.error);
