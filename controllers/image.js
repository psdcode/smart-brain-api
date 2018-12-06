const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'd20e5ffb0aae47b380a4efe8babe7c50'
});

const handleApiCall = () => (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log('Error: ' + err);
      res.status(400).json('Unable to work with Clarifai API at this time');
    });
};

const handleImage = (db) => (req, res) => {
  const { id } = req.body;
  db('users')
    .where({ id })
    .increment('entries', 1)
    .returning('entries')
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => {
      console.log('Error ' + err);
      res.status(400).json('Unable to Get Entries');
    });
};

module.exports = {
  handleImage,
  handleApiCall
};
