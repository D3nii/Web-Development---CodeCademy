const db = require('./db');

db.get('SELECT superpower FROM Superhero WHERE id = 12', (err, row) => {
  console.log(row.superpower);
});