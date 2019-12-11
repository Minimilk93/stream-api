const makeDb = require('../db');
const database = makeDb();

exports.createStream = async (req, res) => {
  const userId = req.params.userId;
  const db = await database;
  const results = await db
    .collection('users')
    .find({ userId })
    .toArray();

  if (results[0].streams.length === 3) {
    res.status(400);
    res.send(`User ${userId} is watching three streams`);
  } else if (results[0].streams.length < 3) {
    await db
      .collection('users')
      .updateOne(
        { userId: userId },
        { $addToSet: { streams: { streamId: req.body.streamId } } }
      );

    res.json(results[0]);
  }
};

exports.deleteStream = (req, res) => {
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
