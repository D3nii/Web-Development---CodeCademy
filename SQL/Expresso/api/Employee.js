const express = require('express');
const sqlite = require('sqlite3');

const employeeRouter = express.Router();
const db = new sqlite.Database(process.env.TEST_DATABASE || './database.sqlite');

const validateEmployee = (req, res, next) => {
	req.name = req.body.employee.name;
	req.position = req.body.employee.name;
	req.wage = req.body.employee.wage;
	req.isCurrentEmployee = req.body.employee.isCurrentEmployee === 0 ? 0 : 1;

	if (!req.name
	    !req.position
	    !req.wage
	    !req.isCurrentEmployee) {
		return res.sendStatus(400);
	} else {
		next();
	}
};

employeeRouter.get('/api/employees', (req, res, next) => {
	db.all(`SELECT * FROM employees WHERE is_current_employee = 1`,
	(err, rows) => {
		if (err) next(err);
		else res.status(200).json( { employees: rows } );
	});
});

employeeRouter.post(`/api/employees`, validateEmployee, (req, res, next) => {
	
});