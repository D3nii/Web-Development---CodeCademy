const meetingsRouter = require('express').Router();

const { addToDatabase,
  createMeeting,
  deleteAllFromDatabase,
  getAllFromDatabase
} = require('./db');

meetingsRouter.get('/', (req, res, next) => {
	res.send(getAllFromDatabase('meetings'));
});

meetingsRouter.post('/', (req, res, next) => {
	let newMeeting = addToDatabase('meetings', createMeeting());
	res.status(201).send(newMeeting);
});

meetingsRouter.delete('/', (req, res, next) =>{
	res.status(204).send(deleteAllFromDatabase('meetings'));
});

module.exports = meetingsRouter;