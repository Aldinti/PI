import axios from "axios";
import {
	GET_COUNTRIES,
	FIND_COUNTRY,
	ORDER_BY_NAME,
	ORDER_BY_POPULATION,
	FILTER_BY_ACTIVITY,
	FILTER_BY_CONTINENT,
	GET_DETAIL,
} from "./types";

// export function getCountries() {
// 	return async function (dispatch) {
// 		const countriesFromDB = await axios.get("http://localhost:3001/countries");
// 		return dispatch({
// 			type: GET_COUNTRIES,
// 			payload: countriesFromDB.data,
// 		});
// 	};
// }
export function getCountries() {
	return function (dispatch) {
		axios
			.get("http://localhost:3001/countries")
			.then((countriesFromDB) =>
				dispatch({
					type: GET_COUNTRIES,
					payload: countriesFromDB.data,
				}),
			)
			.catch((error) => console.log(error));
	};
}

export function postActivity(payload) {
	return function () {
		axios
			.post("http://localhost:3001/activities", payload)
			.then((response) => response.data);
	};
}

export function findCountry(name) {
	return function (dispatch) {
		axios
			.get(`http://localhost:3001/countries?name=${name}`)
			.then((findedCountryFromDB) =>
				dispatch({
					type: FIND_COUNTRY,
					payload: findedCountryFromDB.data,
				}),
			)
			.catch((error) => console.log(error));
	};
}

export function filterByContinent(payload) {
	return {
		type: FILTER_BY_CONTINENT,
		payload,
	};
}

export function filterByActivity(payload) {
	return {
		type: FILTER_BY_ACTIVITY,
		payload,
	};
}

export function orderCountriesByName(payload) {
	return {
		type: ORDER_BY_NAME,
		payload,
	};
}

export function orderCountriesByPopulation(payload) {
	return {
		type: ORDER_BY_POPULATION,
		payload,
	};
}

export function getDetail(id) {
	return function (dispatch) {
		axios.get(`http://localhost:3001/countries/${id}`).then((response) =>
			dispatch({
				type: GET_DETAIL,
				payload: response.data,
			}),
		);
	};
}
