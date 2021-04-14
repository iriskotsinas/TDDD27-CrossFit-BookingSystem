import express from 'express';
import cors from 'cors';
import booking from './routes/api/booking'
import register from './routes/api/register'
import login from './routes/api/login'
import mongoose, { mongo, Mongoose } from 'mongoose'

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', booking)
app.use('/api', register)
app.use('/api', login)

const port = process.env.PORT || 5000;

const url = "mongodb+srv://admin:wG7AZEH@tddd27.n1isl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to database'))



//Server
app.listen(port, () => {
  console.log(`Server started on port ${port}`
  )});
