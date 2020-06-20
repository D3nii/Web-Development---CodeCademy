const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database(process.env.TEST_DATABASE || './db.sqlite');
const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.json());

//Routes

app.get('/strips', (req, res, next) => {
	db.all(`SELECT * FROM Strip`, (err, rows) => {
		if (err) {
			res.sendStatus(500);
		} else {
		res.send( { strips: rows } );
		}
	});
});

const validateStrip = (req, res, next) => {
	const tempStrip = req.body.strip;

	if (!req.body ||
	  !tempStrip.head ||
	  !tempStrip.body ||
	  !tempStrip.background ||
	  !tempStrip.bubbleType) {
		return res.sendStatus(400);
	}
};

app.post('/strips', validateStrip, (req, res, next) => {
	const tempStrip = req.body.strip;

	db.run(
		`INSERT INTO Strip (head, body, background, bubble_type, bubble_text, caption)
		VALUES ($head, $body, $background, $bubbleType, $bubbleText, $caption)`,
		{ $head: tempStrip.head, 
			$body: tempStrip.body, 
			$background: tempStrip.background, 
			$bubbleType: tempStrip.bubbleType, 
			$bubbleText: tempStrip.bubbleText, 
			$caption: tempStrip.caption 
		}, 
		function(err) {
			if(err) return res.sendStatus(500);

			db.get(`SELECT * FROM Strip WHERE id=${this.lastID}`, (err, rows) => {
				if (!rows) return res.sendStatus(500);

				res.Status(201).send( { strip: rows } );
			});
		}
	);
});

module.exports = app;

app.listen(PORT, () => {
	console.log(`Server is listening on: ${PORT}`);
});
