import React from "react";
import styles from "./Card.module.css"

function Card({ name, image, continent, population }) {
	return (
		<div className={styles.container}>
			<hr />
			<img
				src={image}
				alt='img not found'
			/>
			<h3>{name}</h3>
			<h3>{continent}</h3>
			<h3>{population}</h3>
		</div>
	);
}

export default Card;
