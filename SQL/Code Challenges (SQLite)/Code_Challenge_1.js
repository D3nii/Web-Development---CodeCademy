const db = require('./db');

db.each('SELECT * FROM Flower', (err, row) => {
  if (row.petal_color === 'blue') {
    console.log(row);
  }
});