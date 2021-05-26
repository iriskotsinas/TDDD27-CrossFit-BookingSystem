import mongoose from 'mongoose';
import supertest from 'supertest';
import { User } from '../models/user';
import app from '../app';

const userDetails = {
  firstname: 'Iris',
  lastname: 'Kotsinas',
  email: 'hej@gmail.com',
  password: 'xxxxxx',
};

const wrongUserDetails = {
  firstname: 'Iris',
  lastname: 'Kotsinas',
  email: 'hej@gmail.com',
  password: 'xxx', // Password too short
};

describe('Register controller test', () => {
  const request = supertest(app);

  beforeAll(async () => {
    // Setup mongoDB
    if (!process.env.DB_URL) throw Error;
    await mongoose.connect(process.env.DB_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }, (err) => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
    });
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await User.deleteMany();
  });

  describe('Register test with basic endpoints', () => {
    it('POST /register adds a new user', async () => {
      const response = await request.post('/register')
        .send(userDetails)
        .set('Content-Type', 'application/json');
      
      expect(response.body.status).toBe(true);

      const user = await User.findOne({ firstname: userDetails.firstname });
      expect(user.firstname).toBeTruthy();
      expect(user.email).toBeTruthy();
    });

    it('POST /register validates user credentials', async () => {
      const response = await request.post('/register')
        .send(wrongUserDetails)
        .set('Content-Type', 'application/json');
      
      expect(response.body.status).toBe(false);

      const user = await User.findOne({ firstname: wrongUserDetails.firstname });
      expect(user).toBe(null);
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
});
