const handleSignin = (db, bcrypt) => async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    console.log('Incorrect Form Submission');
    return res.status(400).json('Incorrect Form Submission');
  }
  db('login')
    .select('email', 'hash')
    .where({ email })
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db('users')
          .where({ email })
          .then((user) => (res.json(user[0])))
          .then(() => (console.log('signed in')))
          .catch((err) => {
            console.log('Good pass but Error ' + err);
            return res.status(400).json('Unable to Retrieve User');
          });
      } else {
        console.log('Bad Pass');
        return res.status(400).json('Bad Pass');
      }
    })
    .catch((err) => {
      res.status(400).json('DB error or no email in sys');
      console.log('DB error or no email in sys: ' + err);
    });
};

module.exports = {
  handleSignin
};
