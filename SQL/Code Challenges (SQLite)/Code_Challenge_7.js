const db = require('./db');

db.get("SELECT quantity FROM SpiceRack WHERE name='paprika'", (err, row) => {
  console.log(row.quantity);
});