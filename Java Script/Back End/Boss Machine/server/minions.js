const minionsRouter = require('express').Router();

const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId
} = require('./db');

minionsRouter.param('minionId', (req, res, next, id) => {
	const minion = getFromDatabaseById('minions', id);

	if(minion) {
		req.minion = minion;
		next();
	} else {
		res.status(404).send();
	}
});

minionsRouter.get('/', (req, res, next) => {
	res.status(200).send(getAllFromDatabase('minions'));
});

minionsRouter.post('/', (req, res, next) => {
	let newMinion = addToDatabase('minions', req.body);
	res.status(201).send(newMinion);
});

minionsRouter.get('/:minionId', (req, res, next) => {
	res.send(req.minion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
	let updatedMinion = updateInstanceInDatabase('minions', req.body);
	res.send(updatedMinion);
});

minionsRouter.delete('/:minionId', (req, res, next) => {
	let deletedMinion = deleteFromDatabasebyId('minions', req.params.minionId);

	if (deletedMinion) {
		res.status(204);
	} else {
		res.status(500);
	}
	res.send();
});

//Work Logics
minionsRouter.get('/:minionId/work', (req, res, next) => {
	let work = getAllFromDatabase('work').filter(workLoad => {
		return workLoad.id == req.params.minionId;
	});
	res.send(work);
});

minionsRouter.post('/:minionId/work', (req, res, next) => {
	let newWork = addToDatabase('work', req.body);
	res.status(201).send(newWork);
});

minionsRouter.param('workId', (req, res, next, id) => {
  let work = getFromDatabaseById('work', id);
  if (work) {
    req.work = work;
    next();
  } else {
    res.status(404).send();
  }
});

minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
	if (req.params.minionId !== req.body.minionId) {
		res.status(400).send();
	} else {
		let updatedWork = updateInstanceInDatabase('work', req.body);
		res.send(updatedWork);
	}
});

minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
	let deletedWork = deleteFromDatabasebyId('work', req.params.workId);

	if (deletedWork) {
		res.status(204);
	} else {
		res.status(500);
	}
	res.send();
});

module.exports = minionsRouter;