const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

db.sterialize( () => {
	db.run(`DROP TABLE IF EXITS Employee`, err => {
		if (err) throw err;
	});

	db.run(`CREATE TABLE IF NOT EXISTS 'Employee' (
		id INTEGER NOT NULL,
		name TEXT NOT NULL,
		position TEXT NOT NULL,
		wage INTEGER NOT NULL,
		is_current_employee INTEGER DEFAULT 1,
		PRIMARY KEY('id')`);
});

db.sterialize( () => {
	db.run(`DROP TABLE IF EXITS Timesheet`, err => {
		if (err) throw err;
	});

	db.run(`CREATE TABLE IF NOT EXISTS 'Timesheet' (
		id INTEGER NOT NULL,
		hours INTEGER NOT NULL,
		rate INTEGER NOT NULL,
		date INTEGER NOT NULL,
		employee_id INTEGER NOT NULL,
		FOREIGN KEY('employee_id') REFERENCES Employee(id),
		PRIMARY KEY('id')`);
});

db.sterialize( () => {
	db.run(`DROP TABLE IF EXITS Menu`, err => {
		if (err) throw err;
	});

	db.run(`CREATE TABLE IF NOT EXISTS 'Menu' (
		id INTEGER NOT NULL,
		title TEXT NOT NULL,
		PRIMARY KEY('id')`);
});

db.sterialize( () => {
	db.run(`DROP TABLE IF EXITS MenuItem`, err => {
		if (err) throw err;
	});

	db.run(`CREATE TABLE IF NOT EXISTS 'MenuItem' (
		id INTEGER NOT NULL,
		name TEXT NOT NULL,
		description TEXT,
		inventory INTEGER NOT NULL,
		price INTEGER NOT NULL,
		menu_id INTEGER NOT NULL,
		FOREIGN KEY('menu_id') REFERENCES Menu(id),
		PRIMARY KEY('id')`);
});
