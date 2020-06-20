const db = require('./db');

db.each('SELECT height FROM CartoonCharacter WHERE species = "mouse"', (err, row) => {
  console.log(row.height);
});