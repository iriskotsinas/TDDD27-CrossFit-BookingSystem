/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import session from './routes/session';
import register from './routes/register';
import login from './routes/login';

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', session);
app.use('/', register);
app.use('/', login);

const port = process.env.PORT || 5000;

const url = process.env.DB_URL || '';

mongoose.connect(url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to database'));
// Server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

export default app;
