const db = require('./db');

const logCaffeineLevel = name => {
  db.get("SELECT * FROM Tea WHERE name=$name;", { $name: name }, (err, row) => {
    console.log(row.caffeine_level);
  })
}