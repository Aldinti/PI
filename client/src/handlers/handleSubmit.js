import { findCountry } from "../actions/index";

export function handleSubmit(event, dispatch, name) {
	event.preventDefault();
	dispatch(findCountry(event.target.value));
}