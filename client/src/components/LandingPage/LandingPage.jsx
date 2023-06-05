import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

function LandingPage() {
	return (
		<div className={styles.container}>
			<h1>Welcome to world's countries</h1>
			<Link to='/home'>
				<button className={styles.enter}>
				<span class="text">Start</span><span>the tour</span>
				</button>
			</Link>
		</div>
	);
};

export default LandingPage;