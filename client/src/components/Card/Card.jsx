import React from "react";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";

function Card({ id, name, image, continent, population }) {
	return (
		<div className={styles.card}>
			<div className={styles.card2}>
				<Link
					key={id}
					to={`/detail/${id}`}
				>
					<img
						className={styles.imagen}
						src={image}
						alt='img not found'
					/>
				</Link>
				<h2 className={styles.h2Card}>{name}</h2>
				<h5 className={styles.h4Card}>{population.toLocaleString()+" inhabitants"}</h5>
				<h3 className={styles.h3Card}>{continent}</h3>
			</div>
		</div>
	);
}

export default Card;
