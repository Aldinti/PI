import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
	getCountries,
	orderCountriesByName,
	filterByActivity,
	filterByContinent,
	orderCountriesByPopulation,
} from "../../actions/index";
import { Link } from "react-router-dom";
import Cards from "../Cards/Cards";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./Home.module.css";

function Home() {
	const dispatch = useDispatch();
	const allCountries = useSelector((state) => state.countries);
	const [activities, setActivities] = useState([]);
	const [continents, setContinents] = useState([]);
	const [order, setOrder] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [countriesPerPage /* setCuntriesPerPage */] = useState(10);
	const lastCountryInPage = currentPage * countriesPerPage; //10
	const firstCountryInPage = lastCountryInPage - countriesPerPage; //0
	const countriesInCurrentPage = allCountries.slice(
		firstCountryInPage,
		lastCountryInPage,
	);

	useEffect(() => {
		axios
			.get("http://localhost:3001/activities")
			.then((activity) => setActivities(activity.data));
		axios
			.get("http://localhost:3001/continents")
			.then((continent) => setContinents(continent.data));
	}, []);

	useEffect(() => {
		setCurrentPage(1);
	}, [allCountries]);

	useEffect(() => {
		dispatch(getCountries());
	}, [dispatch]);

	const paginado = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	// ! Inicio de los Handlers
	// ! event.target.value es lo que llega desde el select, es lo que recibe la action como payload
	function handleClick(event) {
		event.preventDefault();
		dispatch(getCountries());
	}

	function handleSort(event) {
		event.preventDefault();
		console.log(event.target.id);
		if (event.target.id === "orderByName")
			dispatch(orderCountriesByName(event.target.value));
		if (event.target.id === "orderByPopulation")
			dispatch(orderCountriesByPopulation(event.target.value));
		setOrder(`Ordenado ${event.target.value}`);
	}

	function handleFilterContinent(event) {
		dispatch(filterByContinent(event.target.value));
	}

	function handleFilterByActivity(event) {
		dispatch(filterByActivity(event.target.value));
	}
	// ! Fin de los Handlers

	const loadActivitiesInOptions = function () {
		const optionsActivities = [];
		const lookupObject = {};

		for (let i in activities) {
			lookupObject[activities[i].name] = activities[i];
		}

		for (let i in lookupObject) {
			optionsActivities.push(lookupObject[i]);
		}

		return optionsActivities.map((activity) => (
			<option
				key={activity.id + activity.name}
				value={activity.name}
			>
				{activity.name}
			</option>
		));
	};
	const loadContinentsInOptions = function () {
		const optionsContinents = [];
		const lookupObject = {};
		for (let i in continents) {
			lookupObject[continents[i].continent] = continents[i];
		}

		for (let i in lookupObject) {
			optionsContinents.push(lookupObject[i]);
		}

		return optionsContinents.map((elem) => (
			<option
				key={elem.id + elem.continent}
				value={elem.continent}
			>
				{elem.continent}
			</option>
		));
	};

	return (
		<div>
			<Link to="/activities">Create Activities</Link><br />
			<button
				className={styles.titulo}
				onClick={(event) => {
					handleClick(event);
				}}
			>
				World's Countries
			</button>
			<div>
				<select
					id='orderByPopulation'
					name={order}
					onChange={(event) => handleSort(event)}
				>
					<option
						key='10'
						value='All'
					>
						Population
					</option>
					<option
						key='11'
						value='Pob[0-9]'
					>
						Ascending [0-9]
					</option>
					<option
						key='12'
						value='Pob[9-0]'
					>
						Descending [9-0]
					</option>
				</select>
				<select
					id='orderByName'
					name={order}
					onChange={(event) => handleSort(event)}
				>
					<option
						key='20'
						value='All'
					>
						Name
					</option>
					<option
						key='21'
						value='Nom[A-Z]'
					>
						Name A-Z
					</option>
					<option
						key='22'
						value='Nom[Z-A]'
					>
						Name Z-A
					</option>
				</select>
				<select
					name='filtrarPorContinente'
					onChange={(event) => handleFilterContinent(event)}
				>
					<option
						key={"Continentes"}
						value='All'
					>
						Continents
					</option>
					{loadContinentsInOptions()}
				</select>
				<select
					name='filtrarPorActividad'
					onChange={(event) => handleFilterByActivity(event)}
				>
					<option
						key={"Actividades"}
						value='All'
					>
						Activities
					</option>
					{loadActivitiesInOptions()}
				</select>
				<Paginado
					countriesPerPage={countriesPerPage}
					allCountries={allCountries.length}
					paginado={paginado}
				/>
				<SearchBar />
			</div>
			<Cards countries={countriesInCurrentPage} />
		</div>
	);
}

export default Home;
