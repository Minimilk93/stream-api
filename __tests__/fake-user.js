const faker = require('faker');

function makeFakeUser() {
  return {
    userId: faker.random.uuid(),
    streams: [
      {
        streamId: faker.random.uuid()
      }
    ]
  };
}

module.exports = makeFakeUser;
