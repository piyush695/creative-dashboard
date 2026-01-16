const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://n8n_user:23172410@cluster0.drr2ppd.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri);

async function checkSample() {
    try {
        await client.connect();
        const doc = await client.db('reddit_data').collection('creative_data').findOne();
        console.log(JSON.stringify(doc, null, 2));
    } finally {
        await client.close();
    }
}
checkSample();
