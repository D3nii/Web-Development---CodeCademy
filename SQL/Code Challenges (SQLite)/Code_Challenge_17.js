const db = require('./db');

const addMovie = (title, publicationYear, director) => {
	db.run('INSERT INTO Movie (title, publication_year, director) VALUES ($title, $pubYear, $director)', {
    $title: title,
    $pubYear: publicationYear,
    $director: director
  });
};
