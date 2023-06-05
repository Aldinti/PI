import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions";

export default function Detail() {
	const {id}=useParams();
	console.log("Debug Detail: ", id);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getDetail(id));
	}, [dispatch, id]);

	const detalles = useSelector(
		(state) => state.detail,
	);

	return (
		<div>
			<Link to='/home'>
				<button>Go back</button>
			</Link>
			{detalles.id ? (
				<div key={detalles.id}>
					<h1>Detail</h1>
					<h2>Id: {detalles.id}</h2>
					<h2>Nombre: {detalles.name}</h2>
					<h3>Bandera:</h3>
					<img
						src={detalles.image}
						alt={detalles.name}
					/>
					<h3>Continente: {detalles.continent}</h3>
					<h3>Capital: {detalles.capital}</h3>
					<h3>Subregión: {detalles.subregion ? detalles.subregion : ""}</h3>
					<h3>Área: {detalles.area ? detalles.area : ""}</h3>
				</div>
			) : (
				<h1>Loading...</h1>
			)}
		</div>
	);
}
