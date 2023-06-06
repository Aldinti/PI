import {
	GET_COUNTRIES,
	FIND_COUNTRY,
	ORDER_BY_NAME,
	ORDER_BY_POPULATION,
	FILTER_BY_ACTIVITY,
	FILTER_BY_CONTINENT,
	POST_ACTIVITY,
	GET_DETAIL,
} from "../actions/types";

const initialState = {
	countries: [],
	detail: [],
	activities: [],
	countriesFiltered: [],
	countriesToDisplay: [],
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_COUNTRIES:
			return {
				...state,
				countries: action.payload,
				countriesToDisplay: action.payload,
			};

		case FIND_COUNTRY:
			return {
				...state,
				countries: action.payload,
			};

		case FILTER_BY_CONTINENT:
			state.countries = state.countriesToDisplay;
			state.countriesFiltered =
				action.payload === "All"
					? state.countries
					: state.countries.filter(
							(country) => country.continent === action.payload,
					  );
			return {
				...state,
				countries: state.countriesFiltered,
			};

		case FILTER_BY_ACTIVITY:
			state.countries = state.countriesToDisplay;
			state.countriesFiltered =
				action.payload === "All" && state.countriesToDisplay;
			if (action.payload !== "All") {
				state.countriesFiltered = state.countries.filter((country) =>
					country["Activities"].some((act) => act.name === action.payload),
				);
			}
			return {
				...state,
				countries: state.countriesFiltered,
			};

		case ORDER_BY_NAME:
			if (action.payload === "Nom[A-Z]") {
				state.countriesFiltered = state.countries.sort((a, b) => {
					if (a.name > b.name) return 1;
					if (b.name > a.name) return -1;
					return 0;
				});
			} else if (action.payload === "Nom[Z-A]") {
				state.countriesFiltered = state.countries.sort((a, b) => {
					if (a.name > b.name) return -1;
					if (b.name > a.name) return 1;
					return 0;
				});
			} else {
				state.countriesFiltered = state.countriesToDisplay;
			}
			return {
				...state,
				countries: state.countriesFiltered,
			};

		case ORDER_BY_POPULATION:
			const countriesFiltered = [...state.countries].sort((a, b) => {
				if (a.population > b.population) {
					return action.payload === "Pob[0-9]" ? 1 : -1;
				} else if (a.population < b.population) {
					return action.payload === "Pob[9-0]" ? 1 : -1;
				} else {
					return 0;
				}
			});
			return {
				...state,
				countries: countriesFiltered,
			};

		case POST_ACTIVITY:
			return {
				...state,
			};

		case GET_DETAIL:
			return {
				...state,
				detail: action.payload,
			};

		default:
			return state;
	}
}
