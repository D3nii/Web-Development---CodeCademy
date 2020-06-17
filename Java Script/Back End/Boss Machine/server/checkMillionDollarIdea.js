const checkMillionDollarIdea = (res, req, next) => {
	const {numWeeks, weeklyRevenue} = req.body;
	let totalSum = Number(numWeeks) * Number(weeklyRevenue);

	if (!numWeeks || !weeklyRevenue || isNaN(totalSum) || totalSum < 1000000) {
		res.status(400).send();
	} else {
		next();
	}
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
