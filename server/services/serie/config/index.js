const { MongoClient } = require(`mongodb`);
const dbUrl = process.env.DB_URL || `mongodb://localhost:27017`
const dbName = process.env.DB_NAME || `serieEM`

const client = new MongoClient(dbUrl, {useUnifiedTopology: true})
client.connect()

const db = client.db(dbName)

module.exports = db