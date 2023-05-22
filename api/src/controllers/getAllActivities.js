const { Activity } = require("../db");

const getAllActivities = async () => {
	const activitiesFinded = await Activity.findAll({
		attributes: ["name"],
		/* include: {
			model: Country,
			attributes: ["name"],
			through: {
				attributes: [],
			},
		}, */
	});
	// const filterA = activitiesFinded.map((activity) => activity.name.toLowerCase());
	// const total = filterA.filter((item, index) => {
	// return filterA.indexOf(item) === index;
	// });
	if (!activitiesFinded.length) throw new Error("No hay actividades registradas!");
	return activitiesFinded;
	// return total;
};

module.exports = getAllActivities;
