const { getDb } = require('./db_config');

async function main() {
    const { client, db } = await getDb();

    try {
        const docs = await db.collection('creative_data').find({}).toArray();
        docs.forEach((doc, i) => {
            console.log(`DOC ${i}: ${doc.adName} | ${doc.adId}`);
            // Check for any field that might be an account
            Object.keys(doc).forEach(key => {
                if (key.toLowerCase().includes('account') || key.toLowerCase().includes('client')) {
                    console.log(`  ${key}: ${doc[key]}`);
                }
            });
        });
    } finally {
        await client.close();
    }
}

main().catch(console.error);
