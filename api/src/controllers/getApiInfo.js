const axios = require("axios");
const { Country } = require("../db");

const getApiInfo = async () => {
	const regInCountriesTable = await Country.count();
	if (!regInCountriesTable) {
		const countriesInfoFromApi = await axios.get(
			"https://restcountries.com/v3/all",
		);
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
		await Country.bulkCreate(apiCountries);
		console.log("API countries loaded in the DB!");
	} else {
		console.log("API Countries already loaded in the DB!");
	}
};

module.exports = getApiInfo;
