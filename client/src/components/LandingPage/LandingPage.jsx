import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

function LandingPage() {
	return (
		<div className={styles.container}>
			<h1 className={styles.h1landing}>Welcome to world's countries</h1>
			<Link to='/home'>
				<button className={styles.enter}>
				<span className="text">Start</span><span>the tour</span>
				</button>
			</Link>
		</div>
	);
};

export default LandingPage;