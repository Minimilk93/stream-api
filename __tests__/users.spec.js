const { MongoClient } = require('mongodb');
const makeFakeUser = require('./fake-user');

describe('Streams Repository', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect('mongodb://localhost:27017', {
      useNewUrlParser: true
    });
    db = await connection.db('stream_db');
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it('gets streams for a user', async () => {
    const users = db.collection('users');

    const mockUser = await makeFakeUser();
    await users.insertOne(mockUser);

    const results = await db
      .collection('users')
      .find({ userId: mockUser.userId })
      .toArray();

    expect(results[0]).toEqual(mockUser);
  });
});
