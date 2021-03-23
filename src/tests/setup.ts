import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';

import { app } from '../app';

declare global {
  namespace NodeJS {
    interface Global {
      getCookie: () => Promise<string[]>
    }
  }
}

let mongo: MongoMemoryServer;

beforeAll(async () => {
  process.env.JWT_KEY =  'asfd';

  mongo = new MongoMemoryServer();
  const uri = await mongo.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.getCookie = async () => {
  const email = 'vaggos@vaggos.com';
  const password = 'vaggos312';

  const res = await request(app)
    .post('/api/users/signup')
    .send({ email, password })
    .expect(201);

  const cookie = res.get('Set-Cookie');

  return cookie;
};

