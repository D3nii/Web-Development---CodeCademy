const db = require('./db');

db.all('SELECT * FROM Scientist WHERE field = "biology"', (err, row) => {
  console.log(row);
});