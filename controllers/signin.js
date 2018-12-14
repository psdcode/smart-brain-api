const { getAuthTokenId, createSession } = require('./token');

const handleSignin = (db, bcrypt, req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return Promise.reject(Error('Incomplete form submission'));
  }
  return db.select('email', 'hash').from('login')
    .where({ email })
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db('users')
          .where({ email })
          .then(user => user[0]) // on success, user[0] object is returned by handleSignin
          .catch(() => Promise.reject(Error('Unable to get user')));
      } else {
        return Promise.reject(Error('Wrong Credentials'));
      }
    })
    .catch(() => Promise.reject(Error('Wrong Credentials')));
};

const handleAuthentication = (db, bcrypt, redisClient) => (req, res) => {
  // First check authorization headers
  const { authorization } = req.headers;
  return authorization
    ? getAuthTokenId(authorization, redisClient, res)
    : handleSignin(db, bcrypt, req, res)
      .then((userData) => (
        userData.id && userData.email
          ? createSession(userData, redisClient)
          : Promise.reject(Error('Incomplete User Data'))
      ))
      .then((session) => (res.json(session)))
      .catch((err) => (res.status(401).json(err)));
};

module.exports = {
  handleSignin,
  handleAuthentication
};
