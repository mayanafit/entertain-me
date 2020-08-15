const { MongoClient } = require(`mongodb`);
const dbUrl = process.env.DB_URL
const dbName = process.env.DB_NAME

const client = new MongoClient(dbUrl, {useUnifiedTopology: true})
client.connect()

const db = client.db(dbName)

module.exports = db