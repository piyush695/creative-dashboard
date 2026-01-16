const { MongoClient } = require('mongodb');
const { MONGO_URI } = require('./db_config');
const client = new MongoClient(MONGO_URI);

async function check() {
    try {
        await client.connect();
        const coll = client.db('creative_analyzer').collection('creative_data');
        const count = await coll.countDocuments();
        console.log('Total documents:', count);

        const targetIds = ['120240786547410566', '120240402864720566', '120236893486900566', '120236792555720566', '120240786547420566', '120240786545380566'];

        console.log('Searching for target IDs...');
        // Search as strings
        const adsString = await coll.find({ adId: { $in: targetIds } }).toArray();
        console.log('Found as strings:', adsString.length);

        // Search as numbers
        const adsNumber = await coll.find({ adId: { $in: targetIds.map(id => Number(id)) } }).toArray();
        console.log('Found as numbers:', adsNumber.length);

        if (adsString.length > 0 || adsNumber.length > 0) {
            const found = [...adsString, ...adsNumber];
            console.log('Example Found:', found[0].adId, found[0].adName);
        } else {
            console.log('None of the target IDs found in the database.');
            const anyAds = await coll.find({}).limit(5).toArray();
            console.log('Sample IDs from DB:', anyAds.map(a => `${typeof a.adId}: ${a.adId}`));
        }
    } finally {
        await client.close();
    }
}

check().catch(console.error);
