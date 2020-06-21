const express = require('express');
const sqlite3 = require('sqlite3');

const artistsRouter = express.Router();
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

artistsRouter.param('/:artistId', (req, res, next, artistId) => {
	const sql = 'SELECT * FROM Artist WHERE Artist.id = $artistId';

	const values = { artistId: artistId };

	db.get(sql, values, (err, artist) => {
		if (err) {
			next(err);
		} else if (artist) {
			req.artist = artist;
			next();
		} else {
			res.sendStatus(404);
		}
	});
});

artistsRouter.get('/', (req, res, next) => {
	db.all('SELECT * FROM Artist WHERE Artist.is_currently_employed = 1', 
	(err, artists) => {
		if (err) {
			next(err);
		} else {
			res.status(200).json( { artists: artists } );
		}
	});
});

artistsRouter.get('/:artistId', (req, res, next) => {
	res.status(200).json( { artist: req.artist } );
});

artistsRouter.post('/', (req, res, next) => {
	const name = req.body.artist.name;
	const dateOfBirth = req.body.artist.dateOfBirth;
	const biography = req.body.artist.biography;
	const isCurrentlyEmployed = req.body.artist.isCurrentlyEmployed  === 0 ? 0 : 1;

	if (!name ||
		!dateOfBirth || 
		!biography) {
		return res.sendStatus(400);
	}

	let sql = `INSERT INTO Artist (name, date_of_birth, biography, is_currently_employed)
	VALUES ($name, $dateOfBirth, $biography, $isCurrentlyEmployed)`;

	let values = {
		$name: name, 
		$dateOfBirth: dateOfBirth, 
		$biography: biography, 
		$isCurrentlyEmployed: isCurrentlyEmployed
	};

	db.run(sql, values, (err) => {
		if (err) {
			next(arr);
		} else {
			db.get(`SELECT * FROM Artist WHERE Artist.id = ${this.lastID}`, 
			(err, artist) => {
				res.status(201).json( { artist: artist } );
			});
		}
	});
});

artistsRouter.put('/:artistId', (req, res, next) => {
	const name = req.body.artist.name;
	const dateOfBirth = req.body.artist.dateOfBirth;
	const biography = req.body.artist.biography;
	const isCurrentlyEmployed = req.body.artist.isCurrentlyEmployed  === 0 ? 0 : 1;

	if (!name ||
		!dateOfBirth || 
		!biography) {
		return res.sendStatus(400);
	}

	let sql = `UPDATE Artist SET name = $name, 
	dateOfBirth = $dateOfBirth,
	biography = $biography,
 	isCurrentlyEmployed = $isCurrentlyEmployed
 	WHERE Artist.id = $artistId`;

	let values = {
		$name: name, 
		$dateOfBirth: dateOfBirth, 
		$biography: biography, 
		$isCurrentlyEmployed: isCurrentlyEmployed,
		$artistId: req.params.artistId
	};

	db.run(sql, values, (err) => {
		if (err) {
			next(arr);
		} else {
			db.get(`SELECT * FROM Artist WHERE Artist.id = ${req.params.artistId}`, 
			(err, artist) => {
				res.status(200).json( { artist: artist } );
			});
		}
	});
});

artistsRouter.delete('/:artistId', (req, res, next) => {
	const name = req.body.artist.name;

	if (!name) {
		return res.sendStatus(400);
	}

	let sql = `UPDATE Artist SET is_currently_employed = 0 WHERE Artist.id = $artistId`;

	let values = { $artistId: req.params.artistId };

	db.run(sql, values, (err) => {
		if (err) {
			next(err);
		} else {
			db.get(`SELECT * FROM Artist WHERE Artist.id = ${req.params.artistId}`, 
			(err, artist) => {
				res.status(200).json( { artist: artist } );
			})
		} 
	});
});

module.exports = artistsRouter;