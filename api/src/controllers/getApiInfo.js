const { axios } = require("axios");
const { Country } = require("../db");

const getApiInfo = async () => {
	// Contar los registros de la tabla countries y guardar la cantidad en "regInCountriesTable"
	const regInCountriesTable = await Country.count();
	// Si la tabla countries no tiene registros, se le deben cargar desde la API
	if (!regInCountriesTable) {
		const countriesInfoFromApi = await axios.get(
			"https://restcountries.com/v3/all",
		);
		// Mapear cada dato obtenido de la API en el campo adecuado de la tabla
		const apiCountries = countriesInfoFromApi.data.map((countryFromApi) => {
			return {
				id: countryFromApi.cca3,
				name: countryFromApi.name.common,
				image: countryFromApi.flags[0],
				continent: countryFromApi.continents[0],
				capital: countryFromApi.capital
					? countryFromApi.capital[0]
					: "No data!",
				subregion: countryFromApi.subregion,
				area: countryFromApi.area,
				population: countryFromApi.population,
			};
		});
		// Guardar los datos obtenidos de la API en la tabla de la base de datos
		await Country.bulkCreate(apiCountries);
		console.log("API countries loaded in the DB!");
	} else {
		console.log("API Countries already loaded in the DB!");
	}
};

module.exports = getApiInfo;
/* const getApiInfo = async () => {
	const apiUrl = await axios.get("https://restcountries.com/v3/all");
	const apiInfo = await apiUrl.data.map((country) => {
		return {
			id: country.cca3,
			name: country.name,
			imgflag: country.flags.map((flag) => flag),
			continent: country.continents.map((continent) => continent),
			capital: country.capital.map((cap) => cap),
			subregion: country.subregion,
			area: country.area,
			population: country.population,
		};
	});
	return apiInfo;
};
 */