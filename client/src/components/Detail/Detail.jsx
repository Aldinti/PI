import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions";

export default function Detail(props) {
	console.log("Debug Detail: ",props);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getDetail(props.match.params.id));
	}, [dispatch, props.match.params.id]);

	const { id, name, image, continent, capital, subregion, area } = useSelector(
		(state) => state.detail,
	);

	return (
		<div>
			<Link to='/home'>
				<button>Go back</button>
			</Link>
			{id ? (
				<div key={id}>
					<h1>Detail</h1>
					<h2>Id: {id}</h2>
					<h2>Nombre: {name}</h2>
					<h3>Bandera:</h3>
					<img
						src={image}
						alt={name}
					/>
					<h3>Continente: {continent}</h3>
					<h3>Capital: {capital}</h3>
					<h3>Subregión: {subregion ? subregion : ""}</h3>
					<h3>Área: {area ? area : ""}</h3>
				</div>
			) : (
				<h1>Loading...</h1>
			)}
		</div>
	);
}
