import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions";
import styles from "./Detail.module.css";
import { BtnGoBack } from "./../BtnGoBack/BtnGoBack";

export default function Detail() {
	const { id } = useParams();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getDetail(id));
	}, [dispatch, id]);

	const detalles = useSelector((state) => state.detail);

	return (
		<div className={styles.divMainDetail}>
			<div className={styles.cardBoxDetail}>
				<div className={styles.cardDetail}>
					{detalles.id ? (
						<div>
							<div
								key={detalles.id}
								className={styles.h4Detail}
							>
								<h2>{detalles.name + " [" + detalles.id}]</h2>

								<img
									className={styles.imagenDetail}
									src={detalles.image}
									alt={detalles.name}
								/>
							</div>
							<div className={styles.contentDetail}>
								<h3 className={styles.h3Detail}>Capital: {detalles.capital}</h3>
								<p className={styles.pDetail}>
									Continente: {detalles.continent}
									<br />
									Subregión: {detalles.subregion ? detalles.subregion : ""}
									<br />
									<br />
									Área: {detalles.area
										? detalles.area.toLocaleString()
										: ""}{" "}
									m&sup2;
									<br />
									<br />
									{detalles.population.toLocaleString()} inhabitants
								</p>
								<BtnGoBack />
							</div>
						</div>
					) : (
						<h1>Loading...</h1>
					)}
				</div>
			</div>
		</div>
	);
}

/* <div class="cardBox">
  <div class="card">
     <div class="h4">Animated card</div>
   
    <div class="content">
      <div class="h3">How's it goin Fam ?</div>
      <p>This is Pradeep Saran, your tech mate!!! I love you all. Lets make this world a better place for all of us. Keep prospering...Keep learning!!!</p>
    </div>
  </div>
</div> */
