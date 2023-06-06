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
// import { Link } from "react-router-dom";
import Cards from "../Cards/Cards";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import { Nav } from "../Nav/Nav";
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
			<Nav />
			<h1 className={styles.h1Home}>World's Countries</h1>
			<div className={styles.divMainHome}>
				<button className={styles.buttonReloadHome} onClick={(event) => {handleClick(event);}}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='20'
						viewBox='0 0 20 20'
						height='20'
						fill='none'
						className={styles.svgiconHome}
					>
						<g strokeWidth='1.5' strokeLinecap='round' stroke='#5d41de'>
							<circle r='2.5'	cy='10'	cx='10'></circle>
							<path
								fillRule='evenodd'
								d='m8.39079 2.80235c.53842-1.51424 2.67991-1.51424 3.21831-.00001.3392.95358 1.4284 1.40477 2.3425.97027 1.4514-.68995 2.9657.82427 2.2758 2.27575-.4345.91407.0166 2.00334.9702 2.34248 1.5143.53842 1.5143 2.67996 0 3.21836-.9536.3391-1.4047 1.4284-.9702 2.3425.6899 1.4514-.8244 2.9656-2.2758 2.2757-.9141-.4345-2.0033.0167-2.3425.9703-.5384 1.5142-2.67989 1.5142-3.21831 0-.33914-.9536-1.4284-1.4048-2.34247-.9703-1.45148.6899-2.96571-.8243-2.27575-2.2757.43449-.9141-.01669-2.0034-.97028-2.3425-1.51422-.5384-1.51422-2.67994.00001-3.21836.95358-.33914 1.40476-1.42841.97027-2.34248-.68996-1.45148.82427-2.9657 2.27575-2.27575.91407.4345 2.00333-.01669 2.34247-.97026z'
								clipRule='evenodd'
							></path>
						</g>
					</svg>
					<span className={styles.labelHome}>Reload</span>
				</button>
			</div>
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
