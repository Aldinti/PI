const { Activity } = require("../db");

const getAllActivities = async () => {
	const allActivities = await Activity.findAll({
		attributes: ["name"],
		/* include: {
			model: Country,
			attributes: ["name"],
			through: {
				attributes: [],
			},
		}, */
	});
	// const filterA = allActivities.map((activity) => activity.name.toLowerCase());
	// const total = filterA.filter((item, index) => {
	// return filterA.indexOf(item) === index;
	// });
	return allActivities;
	// return total;
};

module.exports = getAllActivities;
