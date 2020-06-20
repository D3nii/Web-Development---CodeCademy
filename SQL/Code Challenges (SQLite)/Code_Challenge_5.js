const db = require('./db');

let totalPrice = 0;

db.each(
  'SELECT price FROM Clothing WHERE item = "shirt"',
  (err, row) => {
    totalPrice += row.price;
  },
  (err, numRows) =>{
    console.log(totalPrice);
  }
);