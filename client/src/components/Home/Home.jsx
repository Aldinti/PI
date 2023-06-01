import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getCountries,
	filterByContinent,
	filterByActivity,
} from "../../actions/index";
import { Link } from "react-router-dom";
import Cards from "../Cards/Cards";
import Paginado from "../Paginado/Paginado";
import styles from "./Home.module.css";

function Home() {
	const dispatch = useDispatch();
	const allCountries = useSelector((state) => state.countries);
	const [currentPage, setCurrentPage] = useState(1);
	const [countriesPerPage /* setCuntriesPerPage */] = useState(10);
	const lastCountryInPage = currentPage * countriesPerPage; //10
	const firstCountryInPage = lastCountryInPage - countriesPerPage; //0
	const countriesInCurrentPage = allCountries.slice(
		firstCountryInPage,
		lastCountryInPage,
	);

	const paginado = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	useEffect(() => {
		dispatch(getCountries());
	}, [dispatch]);

	// ! Inicio de los Handlers
	// ! event.target.value es lo que llega desde el select, es lo que recibe la action como payload
	function handleClick(event) {
		event.preventDefault();
		dispatch(getCountries());
	}

	function handleFilterContinent(event) {
		dispatch(filterByContinent(event.target.value));
	}

	function handleFilterByActivity(event) {
		dispatch(filterByActivity(event.target.value));
	}
	// ! Fin de los Handlers
	return (
		<div>
			<Link to='/countries' />
			{/* <h1>Paises del mundo</h1> */}
			<button
				className={styles.titulo}
				onClick={(event) => {
					handleClick(event);
				}}
			>
				World's Countries
			</button>
			<div>
				<select name='ordenarPor'>
					<option value='country'>Paises</option>
					<option value='population'>Población</option>
				</select>
				<select name='ordenar'>
					<option value='asc'>Ascendente</option>
					<option value='desc'>Descendente</option>
				</select>
				<select
					name='filtrarPorContinente'
					onChange={(event) => handleFilterContinent(event)}
				>
					<option value='All'>All</option>
					<option value='Africa'>Africa</option>
					<option value='Antarctica'>Antarctica</option>
					<option value='Asia'>Asia</option>
					<option value='Europe'>Europe</option>
					<option value='North America'>North America</option>
					<option value='Oceania'>Oceania</option>
					<option value='South America'>South America</option>
				</select>
				<select
					name='filtrarPorActividad'
					onChange={(event) => handleFilterByActivity(event)}
				>
					<option value='Natación'>Natación</option>
					<option value='Alpinismo'>Alpinismo</option>
				</select>
				<Paginado
					countriesPerPage={countriesPerPage}
					allCountries={allCountries.length}
					paginado={paginado}
				/>
			</div>
			<Cards countries={countriesInCurrentPage} />
		</div>
	);
}

export default Home;
