const charAllowed = /\W+/g;
// const charAllowed = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;

export default function validate(form) {
	let errors = {};
	if (!form.name) {
		errors.name = "Name is required";
	}
	if (
		(form.name.length >= 1 && form.name.length < 3) ||
		form.name.length > 30
	) {
		errors.name = "Name should be [3 to 30] characters";
	}
	if (charAllowed.test(form.name)) {
		errors.name = "Only [A-Z,a-z,0-9] characters";
	}
	if (!form.difficulty || form.difficulty === " ") {
		errors.difficulty = "Difficulty is required";
	}
	if (form.difficulty > 5 || form.difficulty < 1) {
		errors.difficulty = "Only [1 to 5] are accepted";
	}
	if (!form.duration || form.duration === " ") {
		errors.duration = "Duration is required";
	}
	if (form.duration > 24 || form.duration < 1) {
		errors.duration = "Only [1 to 24] are accepted";
	}
	if (!form.season || form.season.length === 0) {
		errors.season = "At least one season";
	}
	if (!form.season /* || form.season.length > 2 */) {
		errors.season = "Maximun two seasons";
	}
	if (!form.countries || form.countries.length === 0) {
		errors.countries = "Choose a country";
	}
	return errors;
}
