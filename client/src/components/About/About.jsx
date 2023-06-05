import React from "react";
// import s from './About.module.css'
import github from "../../img/github.png";
import linkedin from "../../img/linkedin.png";
import mail from "../../img/mail.png";

function About() {
	return (
		<footer>
			<a
				rel='noreferrer'
				target='_blank'
				href='https://github.com/Aldinti'
			>
				<img
					alt='logo github'
					src={github}
				/>
			</a>
			<a
				rel='noreferrer'
				target='_blank'
				href='https://www.linkedin.com/in/Aldinti/'
			>
				<img
					alt='logo linkedin'
					src={linkedin}
				/>
			</a>
			<a
				rel='noreferrer'
				target='_blank'
				href='mailto:aldopati@gmail.com'
			>
				<img
					alt='logo mail'
					src={mail}
				/>
			</a>
		</footer>
	);
}

export default About;
