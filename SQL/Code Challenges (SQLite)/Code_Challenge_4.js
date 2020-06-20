const db = require('./db');

db.all('SELECT * from NonexistentTable', (err, rows) => {
  if (err !== null) {
    console.log(err);
    return;
  } else {
  console.log(rows);
  }
});