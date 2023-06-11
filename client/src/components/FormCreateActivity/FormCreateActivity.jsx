import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, postActivity } from "./../../actions/index";
import styles from "./FormCreateActivity.module.css";
import validate from "../../validate.js";
import { BtnGoBack } from "./../BtnGoBack/BtnGoBack";

function FormCreateActivity() {
	const dispatch = useDispatch();
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

	function handleDeleteCountrySelect(elem) {
		setSelectedCountries(
			selectedCountries.filter((country) => country !== elem),
		);
		setNewActivity({
			...newActivity,
			countries: selectedCountries.filter((country) => country !== elem),
		});
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
			if (newActivity.countries.length !== 0) {
				setNewActivity({
					name: "",
					difficulty: "",
					duration: "",
					season: "",
					countries: [],
				});
				setSelectedCountries([]);
				alert("Actividad creada con éxito");
			}
		} else {
			alert("No se pudo crear la actividad");
		}
	}

	useEffect(() => {
		dispatch(getCountries());
	}, [dispatch]);

	return (
		<div className={styles.loginbox}>
			<h1 className={styles.h1box}>Crear Actividad(es)</h1>
			<form
				className={styles.formbox}
				onSubmit={(event) => handleSubmit(event)}
			>
				<div className={styles.userbox}>
					<input
						className={styles.inputbox}
						type='text'
						name='name'
						value={newActivity.name}
						onChange={(event) => handleChange(event)}
					/>
					<label className={styles.labelbox}>Nombre: </label>
				</div>
				<span className={styles.spanCrearAct}>{errors.name}</span>
				{/* if(newActivity.name.length === 0) return (<span className={styles.spanCrearAct}>Debe ingresar un nombre</span> */}
				<div className={styles.userbox}>
					<input
						className={styles.inputbox}
						type='number'
						name='difficulty'
						min={1}
						max={5}
						value={newActivity.difficulty}
						onChange={(event) => handleChange(event)}
					/>
					<label className={styles.labelbox}>Dificultad: </label>
				</div>
				<span className={styles.spanCrearAct}>{errors.difficulty}</span>
				{/* if(newActivity.difficulty.length === 0) return (<span className={styles.spanCrearAct}>Debe ingresar un nivel de dificultad</span> */}
				<div className={styles.userbox}>
					<input
						className={styles.inputbox}
						type='number'
						name='duration'
						min={1}
						max={24}
						value={newActivity.duration}
						onChange={(event) => handleChange(event)}
					/>
					<label className={styles.labelbox}>Duración: </label>
				</div>
				<span className={styles.spanCrearAct}>{errors.duration}</span>
				{/* if(newActivity.duration.length === 0) return (<span className={styles.spanCrearAct}>Debe ingresar una duración</span> */}
				<div className={styles.userbox}>
					{/* <label className={styles.labelbox}>Temporada</label><br /><br />	 */}
					<select
						className={styles.selectbox}
						name='season'
						id='season'
						onChange={(event) => handleChange(event)}
					>
						<option value='Temporada'>Temporada</option>
						<option value='Primavera'>Primavera</option>
						<option value='Verano'>Verano</option>
						<option value='Otoño'>Otoño</option>
						<option value='Invierno'>Invierno</option>
					</select>
				</div>
				<span className={styles.spanCrearAct}>{errors.season}</span>
				{/* if(newActivity.season.length === 0) return (<span className={styles.spanCrearAct}>Debe seleccionar una temporada</span> */}
				<div className={styles.userbox}>
					<label className={styles.labelbox}>Países: </label>
					<br />
					<br />
					<select
						className={styles.selectbox}
						name='countries'
						onChange={(event) => handleChange(event)}
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
						{newActivity.countries.map((country) => (
							<li className={styles.libox}>
								{country}
								<button
									key={country}
									onClick={() => handleDeleteCountrySelect(country)}
								>
									X
								</button>
							</li>
						))}
					</ul>
					{/* <ul><li className={styles.libox}>{newActivity.countries.map((country) => country += "+" )}</li></ul> */}
				</div>
				<span className={styles.spanCrearAct}>{errors.countries}</span>
				{/* if(newActivity.countries.length === 0) return (<span className={styles.spanCrearAct}>Debe seleccionar al menos un país</span>) */}
				<button
					type='submit'
					className={styles.abox}
				>
					Crear Actividad <span className={styles.spanbox}></span>
				</button>
				<BtnGoBack />
			</form>
		</div>
	);
}

export default FormCreateActivity;
