const db = require('./db');

const selectByGenre = genre => {
  // Add your code in here
  db.all('SELECT title FROM Song WHERE genre = $genre', { $genre: genre }, (err, row) => {
    printQueryResults(row);
  });
}