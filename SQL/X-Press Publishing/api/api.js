const express = require('express');
const artistRouter = require('./artists.js');
const seriesRouter = require('./series.js');

const apiRouter = express.Router();

apiRouter.use('/artists', artistRouter);
apiRouter.use('/series', seriesRouter);

module.exports = apiRouter;