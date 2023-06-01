import { Link } from "react-router-dom";
import Card from "../Card/Card";
import styles from "./Cards.module.css";

export default function Cards({ countries }) {
	return (
		<div className={styles.cardsContainer}>
			{countries.map(
				({ id, name, image, continent }) => (
					<Link
						key={id}
						to={`/home/${id}`}
					>
						<Card
							key={`${continent}_${id}`}
							name={name}
							image={image}
							continent={continent}
						/>
					</Link>
				),
			)}
		</div>
	);
}
