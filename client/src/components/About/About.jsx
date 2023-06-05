import React from "react";
import styles from './About.module.css'
import github from "../../img/github.png";
import linkedin from "../../img/linkedin.png";
import mail from "../../img/mail.png";
import { Link } from 'react-router-dom';

function About() {
	return (
		<footer>
			<Link to='/home'>
				<button>Go back</button>
			</Link><br />
			<a
				rel='noreferrer'
				target='_blank'
				href='https://github.com/Aldinti'
			>
				<img className={styles.imagenes}
					alt='logo github'
					src={github}
				/>
			</a>
			<a
				rel='noreferrer'
				target='_blank'
				href='https://www.linkedin.com/in/Aldinti/'
			>
				<img className={styles.imagenes}
					alt='logo linkedin'
					src={linkedin}
				/>
			</a>
			<a
				rel='noreferrer'
				target='_blank'
				href='mailto:aldopati@gmail.com'
			>
				<img className={styles.imagenes}
					alt='logo mail'
					src={mail}
				/>
			</a>
		</footer>
	);
}

export default About;
