const db = require('./db');

db.get("SELECT traffic FROM TrainStation WHERE station_id=38 AND month='April'", (err, row) => {
  console.log(row.traffic);
});