const express = require('express');
const sqlite = require('sqlite3');
const employeesRouter = require('./Employees.js');

const timesheetsRouter = express.Router( { mergeParams: true } );
const db = new sqlite.Database(process.env.TEST_DATABASE || './database.sqlite');

const validateTimeSheet = (req, res, next) => {
	req.hours = req.body.employee.hours;
	req.rate = req.body.employee.rate;
	req.date = req.body.employee.date;
	
	if (!req.hours ||
		!req.rate ||
		!req.date) {
		return res.sendStatus(400);
	} else {
		next();
	}
};

timesheetsRouter.param('timesheetId', (req, res, next, id) => {
	db.get(`SELECT * FROM Timesheet WHERE id = ${id}`,
	(err, row) => {
		if (err) next(err);
		else if (row) next();
		else res.sendStatus(404);
	});
});

//All Routes with '/api/employees/:employeeId/timesheets'

timesheetsRouter.get('/api/employees/:employeeId/timesheets', (req, res, next) => {
	db.all(`SELECT * FROM Timesheet WHERE employee_id = ${req.params.employeeId}`,
	(err, row) => {
		if (err) next(err);
		else res.sendStatus(200).json( { timesheets: row } );
	});
});

timesheetsRouter.post('/api/employees/:employeeId/timesheets', validateTimesheet, (req, res, next) => {
	db.run(`INSERT INTO Timesheet ( hours, rate, date, employee_id )
	VALUES ( $hours, $rate, $date, $employee_id )`,
	{
		$hours: req.hours,
		$rate: req.rate,
		$date: req.date,
		$employee_id: req.params.employeeId
	}, (err, row) => {
		if (err) next(err);
		else {
			db.get(`SELECT * FROM Timesheet WHERE id = ${this.lastID}`,
			(err, row) => {
				if (err) next(err);
				else res.status(201).json( { timesheet: row } );
			});
		}
	});
});

//All Routes with '/api/employees/:employeeId/timesheets/:timesheetId'

timesheetsRouter.put('/api/employees/:employeeId/timesheets/:timesheetId', validateTimesheet, (req, res, next) => {
	db.run(`UPDATE Timesheet SET hours = $hours, rate = $rate, date = $date,
	employee_id = $employee_id WHERE id = ${req.params.timesheetId}`, 
	{
		$hours: req.hours,
		$rate: req.rate,
		$date: req.date,
		$employee_id: req.params.employeeId
	}, (err, row) => {
		if (err) next(err);
		else {
			db.get(`SELECT * FROM Timesheet WHERE id = ${req.params.timesheetId}`,
			(err, row) => {
				if (err) next(err);
				else res.status(200).json( { timesheet: row } );
			});
		}
	});
});

timesheetsRouter.delete('/api/employees/:employeeId/timesheets/:timesheetId', validateTimesheet, (req, res, next) => {
	db.run(`DELETE FROM Timesheet WHERE id = ${req.params.timesheetId}`,
	err => {
		if (err) next(err);
		else res.sendStatus(204);
	});
});

module.exports = timesheetsRouter;