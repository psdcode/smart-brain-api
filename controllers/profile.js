const handleProfileGet = (db) => (req, res) => {
  const { id } = req.params;
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

const handleProfileUpdate = (db) => (req, res) => {
  const { id } = req.params;
  const { name, age, pet } = req.body.formInput;
  console.log('age ' + typeof age);
  console.log('name ' + typeof name);
  console.log('pet ' + typeof pet);

  db('users')
    .where({ id })
    .update({ name, age, pet })
    .then((response) => {
      if (response) {
        res.json('Success Profile Update');
      } else {
        res.status(200).json('Unable to update');
      }
    })
    .catch(() => (res.status(400).json('Error Updating')));
};

module.exports = {
  handleProfileGet,
  handleProfileUpdate
};
