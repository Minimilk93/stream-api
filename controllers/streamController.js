const makeDb = require('../db');

const database = makeDb();

exports.addStream = (req, res) => {
  // if user id streams length is more than 3 reject
};

exports.removeStream = (req, res) => {
  // pass user and stream id to remove
};

exports.getStreams = async (req, res) => {
  const userId = req.params.userId;
  const db = await database;
  const results = await db
    .collection('users')
    .find({ userId })
    .toArray();

  res.json(results[0].streams);
};
