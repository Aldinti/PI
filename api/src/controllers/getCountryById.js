const { Country, Activity } = require("../db");

const getCountryById = async (id) => {
	// console.log("Debug [id]: ",id.toUpperCase());
	const countryFinded = await Country.findByPk(id.toUpperCase(), {
		include: {
			model: Activity,
			attributes: ["name"],
			through: {
				attributes: [],
			},
		},
	});
	if (!countryFinded) throw new Error(`País con código '${id}' no encontrado!`);
	return countryFinded;
};

module.exports = getCountryById;
