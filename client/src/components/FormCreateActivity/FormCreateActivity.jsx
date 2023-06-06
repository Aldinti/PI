import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, postActivity } from "./../../actions/index";
import styles from "./FormCreateActivity.module.css";
import validate from "../../validate.js";
import { BtnGoBack } from './../BtnGoBack/BtnGoBack';

function FormCreateActivity() {
	const dispatch = useDispatch();
	// const history = useHistory();
	const countries = useSelector((state) => state.countries);
	const [newActivity, setNewActivity] = useState({
		name: "",
		difficulty: "",
		duration: "",
		season: "",
		countries: [],
	});

	const [errors, setErrors] = useState({
		name: "",
		difficulty: "",
		duration: "",
		season: "",
		countries: "",
	});
	const [selectedCountries, setSelectedCountries] = useState([]);

	function handleChange(event) {
		if (event.target.name === "countries") {
			return handleSelect(event);
		}
		setNewActivity({
			...newActivity,
			[event.target.name]: event.target.value,
		});
		setErrors(
			validate({
				...newActivity,
				[event.target.name]: event.target.value,
			}),
		);
	}

	function handleSelect(event) {
		setSelectedCountries([...selectedCountries, event.target.value]);
		if (!selectedCountries.includes(event.target.value)) {
			setNewActivity({
				...newActivity,
				countries: [...selectedCountries, event.target.value],
			});
		}
		return selectedCountries;
	}

	function handleSubmit(event) {
		event.preventDefault();
		console.log(newActivity);
		if (
			!errors.name &&
			!errors.difficulty &&
			!errors.duration &&
			!errors.season &&
			!errors.countries
		) {
			dispatch(postActivity(newActivity));
			alert("Actividad creada con éxito");
			setNewActivity({
				name: "",
				difficulty: "",
				duration: "",
				season: "",
				countries: [],
			});
			setSelectedCountries([]);
		} else {
			alert("No se pudo crear la actividad");
		}
		// history.push("/home");
	}

	useEffect(() => {
		dispatch(getCountries());
	}, [dispatch]);

	return (
		<div className={styles.divCrearAct}>
			<BtnGoBack />
			<h1>Crear Actividad(es)</h1>
			<form
				className={styles.formContainer}
				onSubmit={(event) => handleSubmit(event)}
			>
				<div className={styles.divCrearAct}>
					<label>Nombre: </label>
					<input
						type='text'
						name='name'
						value={newActivity.name}
						onChange={(event)=>handleChange(event)}
					/>
				</div>
				<span className={styles.spanCrearAct}>{errors.name}</span>
				<div className={styles.divCrearAct}>
					<label>Dificultad: </label>
					<input
						type='number'
						name='difficulty'
						min={1}
						max={5}
						value={newActivity.difficulty}
						onChange={(event)=>handleChange(event)}
					/>
				</div>
				<span className={styles.spanCrearAct}>{errors.difficulty}</span>
				<div className={styles.divCrearAct}>
					<label>Duración: </label>
					<input
						type='number'
						name='duration'
						min={1}
						max={24}
						value={newActivity.duration}
						onChange={(event)=>handleChange(event)}
					/>
				</div>
				<span className={styles.spanCrearAct}>{errors.duration}</span>
				<div className={styles.divCrearAct}>
					<label>Temporada</label>
					<select
						name='season'
						id='season'
						onChange={(event)=>handleChange(event)}
					>
						<option value='Primavera'>Primavera</option>
						<option value='Verano'>Verano</option>
						<option value='Otoño'>Otoño</option>
						<option value='Invierno'>Invierno</option>
					</select>
				</div>
				<span className={styles.spanCrearAct}>{errors.season}</span>
				<div className={styles.divCrearAct}>
					<label>Países: </label>
					<select
						name='countries'
						onChange={(event)=>handleChange(event)}
					>
						{countries.map((country) => (
							<option
								key={country.id}
								type='text'
								value={country.id}
							>
								{country.name}
							</option>
						))}
					</select>
					<ul>
						<li>{newActivity.countries.map((country) => country + ", ")}</li>
					</ul>
				</div>
				<span className={styles.spanCrearAct}>{errors.countries}</span>
				<button type='submit' className={styles.buttonCrearAct}>Crear Actividad</button>
			</form>
		</div>
	);
}

export default FormCreateActivity;
