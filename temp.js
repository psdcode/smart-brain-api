const bcrypt = require('bcrypt-nodejs');

const password = 'bofbof';
const hash = bcrypt.hashSync(password);
console.log(hash);
