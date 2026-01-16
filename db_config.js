require('dotenv').config();
const { MongoClient } = require('mongodb');

// Central database configuration
// It now looks for environment variables first, falls back to the hardcoded values if not found.
const MONGO_URI = process.env.MONGODB_URI || "mongodb+srv://n8n_user:23172410@cluster0.drr2ppd.mongodb.net/?appName=Cluster0";
const DB_NAME = process.env.MONGODB_DB || "reddit_data";

async function getDb() {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    return { client, db: client.db(DB_NAME) };
}

module.exports = { MONGO_URI, DB_NAME, getDb };
