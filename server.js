const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');

// Redis
const redis = require('redis');
const redisClient = redis.createClient(process.env.REDIS_URI);

const { handleRegister } = require('./controllers/register');
const { handleAuthentication } = require('./controllers/signin');
const { handleProfileGet, handleProfileUpdate } = require('./controllers/profile');
const { handleImage, handleApiCall } = require('./controllers/image');
const { requireAuth } = require('./controllers/authorization');

const db = knex({
  client: 'pg',
  connection: process.env.POSTGRES_URI
});

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined'));

app.get('/', (req, res) => (res.redirect('http://localhost:3001')));
app.post('/signin', handleAuthentication(db, bcrypt, redisClient));
app.post('/register', handleRegister(db, bcrypt, redisClient));
app.get('/profile/:id', requireAuth(redisClient), handleProfileGet(db));
app.post('/profile/:id', requireAuth(redisClient), handleProfileUpdate(db));
app.put('/image', requireAuth(redisClient), handleImage(db));
app.post('/imageurl', requireAuth(redisClient), handleApiCall());

app.listen(3000, () => {
  console.log('app is running on port 3000');
});
