const { MongoClient } = require('mongodb');
const nock = require('nock');
const request = require('request');
const streamController = require('../controllers/streamController');
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

  it('adds a stream for a user', async () => {
    const users = db.collection('users');

    const mockUser = await makeFakeUser();
    await users.insertOne(mockUser);

    const expectedResult = mockUser.streams.push({ streamId: '5555' });

    nock('http://localhost:5000')
      .post(`/api/${mockUser.userId}`, { streamId: '5555' })
      .reply(200, { expectedResult });

    request.post(`http://localhost:5000/api/${mockUser.userId}`, {
      json: {
        streamId: '5555'
      }
    });
  });
});
