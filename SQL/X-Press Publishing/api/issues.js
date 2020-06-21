const express = require('express');
const sqlite3 = require('sqlite3');

const issuesRouter = express.Router( { mergeParams: true } );
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

issuesRouter.param('/:issueId', (req, res, next, issueId) => {
	const sql = 'SELECT * FROM Issue WHERE Issue.id = $issueId';

	const values = { issueId: issueId };

	db.get(sql, values, (err, issue) => {
		if (err) {
			next(err);
		} else if (issue) {
			req.issue = issue;
			next();
		} else {
			res.sendStatus(404);
		}
	});
});

issuesRouter.get('/', (req, res, next) => {
	let sql = 'SELECT * FROM Issue WHERE Issue.series_id = $series_id'; 
	
	let values = { series_id: req.params.series_id };

	db.all(sql, values, (err, issues) => {
		if (err) {
			next(err);
		} else {
			res.status(200).json( { issues: issues } );
		}
	});
});

issuesRouter.post('/', (req, res, next) => {
	const name = req.body.issue.name;
	const issueNumber = req.body.issue.issueNumber;
	const publicationDate = req.body.issue.publicationDate;
	const artistId = req.body.issue.artistId;
  
	if (!name ||
		!issueNumber || 
		!publicationDate) {
		return res.sendStatus(400);
	}

	let artistSql = `SELECT * FROM Artist WHERE Artist.id = $artistId`;

	let artistValues = {
		$artistId: artistId
	};

	db.run(artistSql, artistValues, (err, artist) => {
		if (err) {
			next(arr);
		} else {
			if (!artist) {
				return res.sendStatus(400);
			} else {
				let sql = `INSET INTO Issue (name, issue_number, publication_date, artist_id, series_id)
				VALUES (name, issueNumber, publicationDate, artistId, seriesId)`;

				let values = {
					$name: name, 
					$issueNumber: issueNumber, 
					$publicationDate: publicationDate, 
					$artistId: artistId, 
					$seriesId: req.params.seriesId
				};

				db.run(sql, values, (err) => {
					if (err) {
						next(err);
					} else {
						db.get(`SELECT * FROM Issue WHERE Issue.id = ${this.lastID}`,
						(err, issue) => {
							res.status(201).json( { issue: issue } );
						});
					}
				})
			}
		}
	});
});

issuesRouter.put('/:issueId', (req, res, next) => {
	const name = req.body.issue.name;
	const issueNumber = req.body.issue.issueNumber;
	const publicationDate = req.body.issue.publicationDate;
	const artistId = req.body.issue.artistId;
  
	if (!name ||
		!issueNumber || 
		!publicationDate) {
		return res.sendStatus(400);
	}

	let artistSql = `SELECT * FROM Artist WHERE Artist.id = $artistId`;

	let artistValues = {
		$artistId: artistId
	};

	db.get(artistSql, artistValues, (err, artist) => {
		if (err) {
			next(err);
		} else {
			if (!artist) return res.sendStatus(400);

			let sql = `UPDATE Artist SET name = $name, 
			issue_number = $issueNumber,
		 	publication_date = $publicationDate,
		 	publication_date = $publicationDate
		 	WHERE Issue.id = $issueId`;

			let values = {
				$name: name, 
				$issueNumber: issueNumber, 
				$publicationDate: publicationDate, 
				$artistId: artistId, 
				$issueId: req.params.issueId
			};
		}
	});

	db.run(sql, values, (err) => {
		if (err) {
			next(arr);
		} else {
			db.get(`SELECT * FROM Issue WHERE Issue.id = ${req.params.issueId}`, 
			(err, issue) => {
				res.status(200).json( { issue: issue } );
			});
		}
	});
});

issuesRouter.delete('/:issueId', (req, res, next) => {
	let sql = `DELETE FROM Issue WHERE Issue.id = $issueId`;

	let values = { $issueId: req.params.issueId };

	db.run(sql, values, (err) => {
		if (err) {
			next(err);
		} else {
			res.sendStatus(204);
		} 
	});
});

module.exports = issuesRouter;