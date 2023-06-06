import React from "react";
import { Link } from "react-router-dom";
import styles from "./BtnGoBack.module.css";

export const BtnGoBack = () => {
	return (
		<div>
			{" "}
			<Link to='/home'>
				<button className={styles.buttonDetail}>Go back</button>
			</Link>
		</div>
	);
};
