const { Activity } = require("../db");

const getAllActivities = async () => {
	const activitiesFinded = await Activity.findAll({
		attributes: ["name"],
	});
	if (!activitiesFinded.length) throw new Error("No hay actividades registradas!");
	return activitiesFinded;
};

module.exports = getAllActivities;
