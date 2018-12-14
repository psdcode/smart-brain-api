const { createSession } = require('./token');

const handleRegister = (db, bcrypt, redisClient) => (req, res) => {
  const { email, name, password } = req.body;
  if (!email | !name | !password) {
    return res.status(400).json('Incorrect Form Submission');
  }
  const hash = bcrypt.hashSync(password);
  db.transaction((trx) => {
    trx('login')
      .insert({
        hash,
        email
      })
      .returning('email')
      .then((loginEmail) => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0],
            name,
            joined: new Date()
          })
          .then((user) => (user[0]))
          .then((userData) => (
            userData.id && userData.email
              ? createSession(userData, redisClient)
              : Promise.reject(Error('Incomplete User Data'))
          ))
          .then((session) => (res.json(session)))
          .catch((err) => (res.status(401).json(err)));
      })
      .then(trx.commit)
      .catch(trx.rollback);
  })
    .catch((err) => {
      console.log('Error connecting to db', err);
      res.status(400).json('Unable to Register: ' + err);
    });
};

module.exports = { handleRegister };
