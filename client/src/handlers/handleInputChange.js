import { findCountry } from "../actions/index";

export function handleInputChange(event, dispatch) {
	event.preventDefault();
	dispatch(findCountry(event.target.value));
}
