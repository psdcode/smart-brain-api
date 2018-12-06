const handleProfileGet = (db) => (req, res) => {
  const { id } = req.body;
  db('users')
    .where({ id })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json('User Not Found');
      }
    })
    .catch((err) => {
      console.log('Error ' + err);
      return res.status(400).json('Error Retrieving User');
    });
  console.log('User login');
};

module.exports = {
  handleProfileGet
};
