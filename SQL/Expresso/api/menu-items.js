const express = require('express');
const sqlite = require('sqlite3');
const menuItemsRouter = express.Router( { mergeParams: true } );

const db = new sqlite.Database(process.env.TEST_DATABASE || './database.sqlite');

const validateMenuItem = (req, res, next) => {
	req.name = req.body.menuItem.name;
    req.description = req.body.menuItem.description;
    req.inventory = req.body.menuItem.inventory;
    req.price = req.body.menuItem.price;

    if (!req.name || 
    	!req.description || 
    	!req.inventory || 
    	!req.price) {
        return res.sendStatus(400);
    } else {
        next();
    }
};

menuItemsRouter.param('menuItemId', (req, res, next, id) => {
	db.get(`SELECT * FROM MenuItem WHERE id = ${id}`,
	(err, row) => {
		if (err) next(err);
		else if (row) next();
		else res.sendStatus(404);
	});
});

//All Routes with '/api/menus/:menuId/menu-items'

menuItemsRouter.get('/api/menus/:menuId/menu-items', (req, res, next) => {
	db.all(`SELECT * FROM MenuItem WHERE menu_id = ${req.params.menuId}`,
	(err, row) => {
		if (err) next(err);
		else res.sendStatus(200).json( { menuItems: row } );
	});
});

menuItemsRouter.post('/api/menus/:menuId/menu-items', validateMenuItem, (req, res, next) => {
	db.run(`INSERT INTO MenuItem ( name, description, inventory, price, menu_id )
	VALUES ( $name, $description, $inventory, $price, $menu_id )`,
	{
		$name: req.name,
		$description: req.description,
		$inventory: req.inventory,
		$price: req.price,
		$menu_id: req.params.menuId
	}, (err, row) => {
		if (err) next(err);
		else {
			db.get(`SELECT * FROM MenuItem WHERE id = ${this.lastID}`,
			(err, row) => {
				if (err) next(err);
				else res.status(201).json( { menuItem: row } );
			});
		}
	});
});

//All Routes with '/api/menus/:menuItemId'

menuItemsRouter.put('/api/menus/:menuItemId', validateMenuItem, (req, res, next) => {
	db.run(`UPDATE MenuItem SET name = "${req.name}", description = "${req.description}",
        inventory = "${req.inventory}", price = "${req.price}", menu_id = ${req.params.menuId}
        WHERE id = ${req.params.menuItemId}`,
        (err, row) => {
		if (err) next(err);
		else {
			db.get(`SELECT * FROM MenuItem WHERE id = ${req.params.menuItemId}`,
			(err, row) => {
				if (err) next(err);
				else res.status(200).json( { menuItem: row } );
			});
		}
	});
});

menuItemsRouter.delete('/api/menus/:menuItemId', (req, res, next) => {
	db.run(`DELETE FROM MenuItem WHERE id = ${req.params.menuItemId}`,
    (err) => {
        if (err) {
            next(err);
        } else {
            res.sendStatus(204);
        }
    })
});

module.exports = menuItemsRouter;