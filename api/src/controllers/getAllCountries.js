const { Country, Activity } = require("../db");
const { Op } = require("sequelize");

const getAllCountries = async (query) => {
	// const { name } = query;
	// console.log("Debug controller1: ", query.name);
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
	// console.log("Debug controller2: ", countries);
	if (!query) return allCountries;
	// const countryFindedByName = await allCountries.filter((country) =>
	// 	country.name.toLowerCase().startsWith(query.name.toLowerCase()),
	// );
	// return countryFindedByName.length ? countryFindedByName : allCountries;
	const countryFindedByName = await Country.findAll({
		where: {
			name: { [Op.iLike]: `${query.name}%` },
		},
	});
	// console.log(countryFindedByName);
	if (!countryFindedByName.length) throw new Error(`No se encontró país que incluya '${query.name}' en el nombre!`);
	return countryFindedByName;
};

module.exports = getAllCountries;
