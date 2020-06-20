const db = require('./db');

db.each("SELECT * FROM Minifridge WHERE type='soda'", (err, row) => {
  console.log(row.name);
});