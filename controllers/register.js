const handleRegister = (db, bcrypt) => (req, res) => {
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
          .catch(() => (console.log('fuck up 1')))
          .then((user) => {
            res.json(user[0]);
            console.log(user);
            console.log('success registering 1');
          })
          .catch((err) => (console.log('fuck up2: ' + err)));
      })
      .then(trx.commit)
      .then(() => (console.log('success registering 2')))
      .catch(trx.rollback);
  })
    .catch((err) => (res.status(400).json('Unable to Register: ' + err)));
};

module.exports = { handleRegister };
