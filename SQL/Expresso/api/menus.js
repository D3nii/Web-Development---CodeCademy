const express = require('express');
const sqlite = require('sqlite3');
const menuItemsRouter = require('./menu-items');

const menuRouter = express.Router();
const db = new sqlite.Database(process.env.TEST_DATABASE || './database.sqlite');

const validateMenu = (req, res, next) => {
	req.title = req.body.menu.title;
	
	if (!req.title) {
		return res.sendStatus(400);
	} else {
		next();
	}
};

menuRouter.param('menuId', (req, res, next, id) => {
	db.get(`SELECT * FROM Menu WHERE id = ${id}`,
	(err, row) => {
		if (err) next(err);
		else if (row) next();
		else res.sendStatus(404);
	});
});

menusRouter.use('/:menuId/menu-items', menuItemsRouter);

//All Routes with '/api/menus'

menuRouter.get('/api/menus', (req, res, next) => {
	db.all(`SELECT * FROM Menu`,
	(err, row) => {
		if (err) next(err);
		else res.sendStatus(200).json( { menus: row } );
	});
});

menuRouter.post('/api/menus', validateMenu, (req, res, next) => {
	db.run(`INSERT INTO Menu ( title)
	VALUES ( $title )`,
	{
		$title: req.title
	}, (err, row) => {
		if (err) next(err);
		else {
			db.get(`SELECT * FROM Menu WHERE id = ${this.lastID}`,
			(err, row) => {
				if (err) next(err);
				else res.status(201).json( { menu: row } );
			});
		}
	});
});

//All Routes with '/api/menus/:menuId'

menusRouter.get('/:menuId', (req, res, next) => {
    res.status(200).json({menu: req.menu});
});

menuRouter.put('/api/menus/:menuId', validateMenu, (req, res, next) => {
	db.run(`UPDATE Menu SET title = $title WHERE id = ${req.params.menuId}`, 
	{
		$title: req.title,
	}, (err, row) => {
		if (err) next(err);
		else {
			db.get(`SELECT * FROM Menu WHERE id = ${req.params.menuId}`,
			(err, row) => {
				if (err) next(err);
				else res.status(200).json( { menu: row } );
			});
		}
	});
});

menuRouter.delete('/api/menus/:menuId', (req, res, next) => {
	db.run(`SELECT * FROM MenuItem WHERE menu_id = ${req.params.menuId}`,
	(err, row) => {
		if (err) next(err);
		else {
			if (row) res.sendStatus(400);
			else {
				db.run(`DELETE FROM Menu WHERE id = ${req.params.menuId}`,
				err => {
					if (err) next(err);
					else res.sendStatus(204);
				});
			}
		};
	}
);

module.exports = menuRouter;