const { db } = require('./models');

db.sync({force: true})
.then(() => {
  console.log('it worked!');
})
.catch((err) => {
  console.log('DISASTER!', err);
})
.finally(() => {
  db.close();
})
