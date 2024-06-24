db = db.getSiblingDB('test');

db.createCollection('chats');
db.createCollection('scores');

db.chats.insertMany([
  {
    session: 'c3fc26a0-ebd9-431b-9073-a050193d9bee',
    name: 'devtronaut',
    text: 'Hello World!',
    timestamp: 1719227289881,
  },
  {
    session: '49d628b8-0cd2-40d9-a564-e0520e4c63be',
    name: 'test',
    text: 'Guten Tag!',
    timestamp: 1719227312704,
  },
  {
    session: '49d628b8-0cd2-40d9-a564-e0520e4c63be',
    name: 'test',
    text: 'How are you?',
    timestamp: 1719227341098,
  },
  {
    session: 'c3fc26a0-ebd9-431b-9073-a050193d9bee',
    name: 'devtronaut',
    text: 'Fine thanks!',
    timestamp: 1719227347498,
  },
  {
    session: '49d628b8-0cd2-40d9-a564-e0520e4c63be',
    name: 'test',
    text: 'Wanna play a round?',
    timestamp: 1719227359304,
  },
  {
    session: 'c3fc26a0-ebd9-431b-9073-a050193d9bee',
    name: 'devtronaut',
    text: 'Sure, mate.',
    timestamp: 1719227366694,
  },
  {
    session: 'c3fc26a0-ebd9-431b-9073-a050193d9bee',
    name: 'devtronaut',
    text: 'BOOM. Won!!',
    timestamp: 1719227465408,
  },
  {
    session: '49d628b8-0cd2-40d9-a564-e0520e4c63be',
    name: 'test',
    text: 'Congrats. Gonna play solo.',
    timestamp: 1719227485550,
  },
]);

db.scores.insertMany([
  {
    name: 'devtronaut',
    score: 270,
    timestamp: '2024-06-24T11:10:45.954Z',
  },
  {
    name: 'test',
    score: 396,
    timestamp: '2024-06-24T11:13:03.071Z',
  },
]);