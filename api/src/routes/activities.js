const { Router } = require("express");
const createActivity = require("../controllers/createActivity");
const getAllActivities = require("../controllers/getAllActivities");
const router = Router();

//! 📍 GET | /activities
// Obtiene un arreglo de objetos, donde cada objeto es una actividad turística.

router.get("/", async (req, res) => {
	try {
		const allActivities = await getAllActivities();
		res.status(200).json(allActivities);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
});

//! 📍 POST | /activities
// Esta ruta recibirá todos los datos necesarios para crear una actividad turística y relacionarla con los países solicitados.
// Toda la información debe ser recibida por body.
// Debe crear la actividad turística en la base de datos, y esta debe estar relacionada con los países indicados (al menos uno).

router.post("/", async (req, res, next) => {
	const { name, difficulty, duration, season, countries } = req.body;
	try {
		const activityCreated = await createActivity({
			name,
			difficulty,
			duration,
			season,
			countries,
		});
		res.status(201).json(activityCreated);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;
