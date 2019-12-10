const mongodb = require('mongodb');

async function makeDb() {
  const MongoClient = mongodb.MongoClient;
  const url = 'mongodb://localhost:27017';
  const dbName = 'stream_db';
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  const db = await client.db(dbName);
  db.makeId = makeIdFromString;
  return db;
}
function makeIdFromString(id) {
  return new mongodb.ObjectID(id);
}

module.exports = makeDb;
