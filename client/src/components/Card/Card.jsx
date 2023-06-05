import React from "react";
import styles from "./Card.module.css"
import { Link } from "react-router-dom";

function Card({ id, name, image, continent, population }) {
	return (
		<div className={styles.container}>
			<hr />
			<Link key={id} to={`/detail/${id}`}>
			<img className={styles.img}
				src={image}
					alt='img not found' />
			</Link>
			<h3>{name}</h3>
			<h3>{continent}</h3>
			<h3>{population}</h3>
		</div>
	);
}

export default Card;
