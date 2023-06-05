const { Router } = require("express");
const getAllContinents = require("../controllers/getAllContinents");
const router = Router();

router.get("/", async (req, res) => {
	const { name } = req.query;
	try {
		const resContinent = name
			? await getAllContinents({ name })
			: await getAllContinents();
		res.status(200).json(resContinent);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
});

module.exports = router;
