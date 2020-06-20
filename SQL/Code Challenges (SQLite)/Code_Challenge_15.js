const db = require('./db');

const logFloorsForAddress = address => {
  // Your code here:
  db.get('SELECT number_of_floors FROM Building WHERE address=$address', { $address: address }, (err, row) => {
    console.log(row.number_of_floors);
  })
}