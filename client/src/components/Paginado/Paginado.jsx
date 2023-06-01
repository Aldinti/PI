import React from "react";
import styles from "./Paginado.module.css";

export default function Paginado({ countriesPerPage, allCountries, paginado }) {
	const pageNumbers = [];

	for (
		let index = 1;
		index <= Math.ceil(allCountries / countriesPerPage);
		index++
	) {
		pageNumbers.push(index);
	}

	return (
		<nav>
			<ul>
				{pageNumbers &&
					pageNumbers.map((number) => (
						<li key={number}>
							<button
								className={styles.elButton}
								onClick={() => paginado(number)}
							>
								{number}
							</button>
						</li>
					))}
			</ul>
		</nav>
	);
}
