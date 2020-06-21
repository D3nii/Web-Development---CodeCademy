const express = require('express');
const sqlite3 = require('sqlite3');
const issuesRouter = require('./issues.js');

const seriesRouter = express.Router();
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

seriesRouter.get('/', (req, res, next) => {
	db.all(`SELECT * FROM Series`, (err, series) => {
		if (err) {
			next(err);
		} else {
			res.status(200).json( { series: series } );
		}
	});
});

seriesRouter.param('/:seriesId', (req, res, next, seriesId) => {
	const sql = 'SELECT * FROM Series WHERE Series.id = $seriesId';

	const values = { seriesId: seriesId };

	db.get(sql, values, (err, artist) => {
		if (err) {
			next(err);
		} else if (series) {
			req.series = series;
			next();
		} else {
			res.sendStatus(404);
		}
	});
});

seriesRouter.use('/:seriesId/issues', issuesRouter);


seriesRouter.get('/seriesId', (req, res, next) => {
	res.status(200).json( { series: req.series } );
});

seriesRouter.post('/', (req, res, next) => {
	const name = req.body.series.name;
	const description = req.body.series.description;

	if (!name ||
		!description) {
		return res.sendStatus(400);
	}

	let sql = `INSERT INTO Series (name, description)
	VALUES ($name, $description)`;

	let values = {
		$name: name, 
		$description: description
	};

	db.run(sql, values, (err) => {
		if (err) {
			next(arr);
		} else {
			db.get(`SELECT * FROM Series WHERE Series.id = ${this.lastID}`, 
			(err, series) => {
				res.status(201).json( { series: series } );
			});
		}
	});
});

seriesRouter.put('/:seriesId', (req, res, next) => {
	const name = req.body.series.name;
	const description = req.body.series.description;

	if (!name ||
		!description) {
		return res.sendStatus(400);
	}

	let sql = `UPDATE Series SET name = $name, 
	description = $description
 	WHERE Series.id = $seriesId`;

	let values = {
		$name: name, 
		$description: description,
		$seriesId: req.params.seriesId
	};

	db.run(sql, values, (err) => {
		if (err) {
			next(arr);
		} else {
			db.get(`SELECT * FROM Series WHERE Series.id = ${req.params.seriesId}`, 
			(err, series) => {
				res.status(200).json( { series: series } );
			});
		}
	});
});

seriesRouter.delete('/:seriesId', (req, res, next) => {
	const name = req.body.series.name;

	if (!name) {
		return res.sendStatus(400);
	}

	let sql = `UPDATE Artist SET is_currently_employed = 0 WHERE Artist.id = $artistId`;

	let values = { $seriesId: req.params.seriesId };

	db.run(sql, values, (err) => {
		if (err) {
			next(err);
		} else {
			db.get(`SELECT * FROM Artist WHERE Artist.id = ${req.params.seriesId}`, 
			(err, series) => {
				res.status(200).json( { series: series } );
			})
		} 
	});
});

seriesRouter.delete('/:seriesId', (req, res, next) => {
	let issueSql = `SELECT * FROM Issue WHERE Issue.series_id = $seriesId`;

	let issueValues = { seriesId: req.params.seriesId };

	db.get(issueSql, issueValues, (err, issue) => {
		if (err) {
			next(err);
		} else if (issue) {
			res.sendStatus(400);
		} else {
			let deleteSql = `DELETE FROM Seires WHERE Series.id = $seriesId`;

			let deleteValues = { $seriesId: req.params.seriesId };

			db.run(deleteSql, deleteValues, (err) => {
				if (err) {
					next(err);
				} else {
					res.sendStatus(204);
				}
			});
		}
	});
}

module.exports = seriesRouter;