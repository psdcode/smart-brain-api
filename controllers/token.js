const jwt = require('jsonwebtoken');

const getAuthTokenId = (authJwt, redisClient, res) => {
  return redisClient.get(authJwt, (err, replyId) => {
    if (err || !replyId) {
      return res.status(401).json('Unauthorized');
    }
    return res.json({ id: replyId, success: 'true' });
  });
};

const signToken = (email) => {
  const options = { expiresIn: '7 days' };
  return jwt.sign({ email }, process.env.JWT_SECRET, options);
};

const setToken = (tokenKey, id, redisClient) => {
  return Promise.resolve(redisClient.set(tokenKey, id));
};

const createSession = (userData, redisClient) => {
  const { email, id } = userData;
  const token = signToken(email);
  return setToken(token, id, redisClient)
    .then(() => ({ success: 'true', userData, token }))
    .catch(console.log);
};

module.exports = {
  getAuthTokenId,
  createSession
};
