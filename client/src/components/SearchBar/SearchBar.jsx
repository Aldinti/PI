import React from "react";
import { useDispatch } from "react-redux";
import { handleInputChange } from "../../handlers/handleInputChange";
import styles from "./SearchBar.module.css"

export default function SearchBar() {
	const dispatch = useDispatch();

	return (
		<div className={styles.searchBar}>
			<input
				type='text'
				placeholder='Buscar...'
				onChange={(event) => handleInputChange(event, dispatch)}
			/>
		</div>
	);
}
