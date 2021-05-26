import mongoose from 'mongoose';
import supertest from 'supertest';
import { User } from '../models/user';
import app from '../app';

const userRegisterDetails = {
  firstname: 'Iris',
  lastname: 'Kotsinas',
  email: 'hej@gmail.com',
  password: 'xxxxxx',
};

const userLoginDetails = {
  email: 'hej@gmail.com',
  password: 'xxxxxx',
};

const wrongUserLoginDetails = {
  email: 'hej@gmail.com',
  password: 'xxx',
};

describe('Login controller test', () => {
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

    // Register new user
    const response = await request.post('/register')
      .send(userRegisterDetails);
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await User.deleteMany();
  });

  describe('Login test with basic endpoints', () => {
    it('POST /login logins user', async () => {
      const response = await request.post('/login')
        .send(userLoginDetails);
            
      expect(response.body.status).toBe(true);
      expect(response.body.user.email).toBe(userRegisterDetails.email);
    });

    it('POST /login with wrong credentials does not login user', async () => {
      const response = await request.post('/login')
        .send(wrongUserLoginDetails);  

      expect(response.body.status).toBe(false);
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
});
