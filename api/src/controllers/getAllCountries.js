const { Country, Activity } = require("../db");
const { Op } = require("sequelize");

const getAllCountries = async (query) => {
	const allCountries = await Country.findAll({
		where: query,
		include: {
			model: Activity,
			attributes: ["name"],
			through: {
				attributes: [],
			},
		},
	});
	if (!query) return allCountries;
	const countryFindedByName = await Country.findAll({
		where: {
			name: { [Op.iLike]: `%${query.name}%` },
		},
	});
	if (!countryFindedByName.length) throw new Error(`No se encontró país que incluya '${query.name}' en el nombre!`);
	return countryFindedByName;
};

module.exports = getAllCountries;
