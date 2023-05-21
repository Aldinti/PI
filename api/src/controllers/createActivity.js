const { Country, Activity } = require("../db");

const createActivity = async ({
	name,
	difficulty,
	duration,
	season,
	countries,
}) => {
	const newActivity = await Activity.create({
		name,
		difficulty,
		duration,
		season,
	});
	await newActivity.setCountries(countries);

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
	// console.log("ActWithCount: ",activityWithCountry);
	return activityWithCountry;
};

module.exports = createActivity;
