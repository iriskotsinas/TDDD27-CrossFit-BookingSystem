import mongoose from 'mongoose';
import supertest from 'supertest';
import { Session } from '../models/session';
import { User } from '../models/user';
import app from '../app';

const addFirstSession = {
  activity: 'CrossFit',
  date: Date.now() + 1000,
  maxSlots: 12,
  description: 'This is a session',
  instructor: 'Iris Kotsinas',
  length: 120,
};

const addSecondSession = {
  activity: 'Circle',
  date: Date.now() + 10000,
  maxSlots: 12,
  description: 'This is another session',
  instructor: 'Iris Kotsinas',
  length: 120,
};

const userDetails = {
  firstname: 'Iris',
  lastname: 'Kotsinas',
  email: 'hej@gmail.com',
  password: 'xxxxxx',
};

describe('Session controller test', () => {
  const request = supertest(app);
  let token: any;
  let userId: any;

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

    const response = await request.post('/register')
      .send(userDetails);    
    token = response.body.token;
    userId = response.body.user._id;
  });

  describe('Session test with basic endpoints', () => {
    it('POST /session adds a new session', async () => {
      const response = await request.post('/session')
        .send(addFirstSession)
        .set('auth-token', token);

      const responseSecond = await request.post('/session')
        .send(addSecondSession)
        .set('auth-token', token);
      
      expect(responseSecond.status).toBe(201);
      expect(response.status).toBe(201);

      const session = await Session.findOne({ activity: addFirstSession.activity });
      expect(session.activity).toBeTruthy();
      expect(session.maxSlots).toBeTruthy();
    });

    it('GET /sessions gets all sessions', async () => {
      const response = await request.get('/sessions');
      
      expect(response.status).toBe(200);

      const sessions = await Session.find({});
      expect(sessions.length).toBe(2);
    });

    it('POST /signup signs up user to session', async () => {
      const session = await Session.findOne({activity: addFirstSession.activity});
      const response = await request.post('/signup')
        .send({ userId, id: session._id })
        .set('auth-token', token);

      const sessionSecond = await Session.findOne({activity: addSecondSession.activity});
      const responseSecond = await request.post('/signup')
      .send({ userId, id: sessionSecond._id })
      .set('auth-token', token);
      
      expect(response.status).toBe(201);
      expect(responseSecond.status).toBe(201);

      const userExists = await Session.findOne({ _id: session._id, users: { _id: userId } });
      expect(userExists).toBeTruthy();
    });


    it('DELETE /signup cancels user from session', async () => {
      const session = await Session.findOne({activity: addFirstSession.activity});
      const response = await request.delete('/signup')
        .send({ userId, id: session._id })
        .set('auth-token', token);
      
      expect(response.status).toBe(201);

      const userExists = await Session.findOne({ _id: session._id, users: { _id: userId } });
      expect(userExists).toBeFalsy();
    });

    it('DELETE /session deletes session', async () => {
      const session = await Session.findOne({activity: addSecondSession.activity});

      const userInSession = await User.findOne({ _id: userId, sessions: { _id: session._id } });
      expect(userInSession).toBeTruthy();
    
      const response = await request.delete('/session')
        .send({ userId, id: session._id })
        .set('auth-token', token);
      
      expect(response.status).toBe(201);

      const sessionExists = await Session.findOne({ _id: session._id });
      expect(sessionExists).toBeFalsy();

      const userExistsInSession = await User.findOne({ _id: userId, sessions: { _id: session._id } });
      expect(userExistsInSession).toBeFalsy();
    });
  });

  afterAll(async () => {
    jest.clearAllMocks();
    await Session.deleteMany();
    await User.deleteMany();
    await mongoose.disconnect();
  });
});
