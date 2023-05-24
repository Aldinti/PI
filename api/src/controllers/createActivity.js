const { Country, Activity } = require("../db");

const createActivity = async ({
	name,
	difficulty,
	duration,
	season,
	countries,
}) => {
	const [newActivity, created] = await Activity.findOrCreate({
		where: { name: name },
		defaults: {
			name: name,
			difficulty: difficulty,
			duration: duration,
			season: season,
		},
	});
	await newActivity.setCountries(countries);
	if (!created) throw new Error(`La actividad '${name}' ya existe`);

	const activityWithCountry = await Activity.findOne({
		where: { name: name },
		attributes: {
			exclude: ["updatedAt", "createdAt"],
		},
		include: {
			model: Country,
			attributes: ["name"],
			through: {
				attributes: [],
			},
		},
	});
	return activityWithCountry;
};

module.exports = createActivity;
