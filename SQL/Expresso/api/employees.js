const express = require('express');
const sqlite = require('sqlite3');
const timesheetsRouter = require('./timesheets.js');

const employeesRouter = express.Router();
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

employeesRouter.param('employeeId', (req, res, next, employeeId) => {
	db.get(`SELECT * FROM Employee WHERE id = ${employeeId}`, 
	(err, row) => {
		if (err) next(err);
		else if (row) {
			req.employee = row;
			next();
		} else res.sendStatus(404);
	});
});

employeesRouter.use('/:employeeId/timesheets', timesheetsRouter);

//All routes with '/api/employee'

employeesRouter.get('/api/employee', (req, res, next) => {
	db.all(`SELECT * FROM Employee WHERE is_current_employee = 1`,
	(err, rows) => {
		if (err) next(err);
		else res.status(200).json( { employees: rows } );
	});
});

employeesRouter.post(`/api/employee`, validateEmployee, (req, res, next) => {
	db.run(`INSERT INTO Employee ( name, position, wage, isCurrentEmployee )
	VALUES ( $name, $position, $wage, $isCurrentEmployee )`,
	{
		$name: req.name,
		$position: req.position,
		$wage: req.wage,
		$isCurrentEmployee: req.isCurrentEmployee
	}, err => {
		if (err) next(err);
		else {
			db.get(`SELECT * FROM Employee WHERE id = ${this.lastID}`,
			(err, row) => {
				res.sendStatus(201).json( { employee: row } );
			})
		}
	});
});

//All routes with '/api/employee/:employeeId'

employeesRouter.get('/api/employee/:employeeId', (req, res, next) => {
	res.sendStatus(200).send( { employee: req.employee } );
});

employeesRouter.put('/api/employee/:employeeId', validateEmployee, (req, res, next) => {
	db.run(`UPDATE Employee SET name = $name, position = $position, wage = $wage,
	isCurrentEmployee = $isCurrentEmployee WHERE id = ${req.params.employeeId}`,
	{
		$name: req.name, 
		$position: req.position, 
		$wage: req.wage, 
		$isCurrentEmployee: req.isCurrentEmployee
	}, err => {
		if (err) next(err);
		else {
			db.get(`SELECT * FROM Employee WHERE id = ${req.params.employeeId}`,
			(err, row) => {
				res.status(200).json( { employee: row } );
			});
		}
	});
});

employeesRouter.delete('/api/employee/:employeeId', (req, res, next) => {
	db.run(`UPDATE Employee SET isCurrentEmployee = 0 WHERE id = ${req.params.employeeId}`,
	err => {
		if (err) next(err);
		else {
			db.get(`SELECT * FROM Employee WHERE id = ${req.params.employeeId}`,
			(err, row) => {
				res.status(200).json( { employee: row } );
			});
		}
	});
});

//All routes with '/api/employee/:employeeId/timesheets'

employeesRouter.get('/api/employee/:employeeId/timesheets', (req, res, next) => {

});



module.exports = employeesRouter;







