const handleSignin = (db, bcrypt) => async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    console.log('Incorrect Form Submission');
    return res.status(400).json('Incorrect Form Submission');
  }
  const data = await db('login').select('email', 'hash').where({ email });
  const isValid = bcrypt.compareSync(password, data[0].hash);
  if (isValid) {
    const user = await db('users').where({ email });
    if (user[0]) {
      console.log('signed in');
      return res.json(user[0]);
    }
    console.log('Good pass but Error ');
    return res.status(400).json('Unable to Retrieve User');
  } else {
    console.log('Bad Pass');
    return res.status(400).json('Bad Pass');
  }
};

module.exports = {
  handleSignin
};
