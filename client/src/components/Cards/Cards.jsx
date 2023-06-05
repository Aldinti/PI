import Card from "../Card/Card";
import styles from "./Cards.module.css";

export default function Cards({ countries }) {
	return (
		<div className={styles.cardsContainer}>
			{countries.map(({ id, name, image, continent, population }) => (
				<Card
					key={`${continent}_${id}`}
					name={name}
					id={id}
					image={image}
					continent={continent}
					population={population}
				/>
			))}
		</div>
	);
}
