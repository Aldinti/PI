const { Country } = require("../db");

const getAllContinents = async () => {
	const continentsFinded = await Country.findAll({
		attributes: ["continent"],
		group: ["continent"],
	});
	if (!continentsFinded.length)
		throw new Error("No hay continentes registradas!");
	return continentsFinded;
};

module.exports = getAllContinents;


/* 
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
			name: { [Op.iLike]: `${query.name}%` },
		},
	});
	if (!countryFindedByName.length) throw new Error(`No se encontró país que incluya '${query.name}' en el nombre!`);
	return countryFindedByName;
*/