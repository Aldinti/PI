const { Router } = require("express");
const countries = require("./countries")
const activities = require("./activities")
const continents = require("./continents")

const router = Router();
router.use("/countries", countries);
router.use("/activities", activities);
router.use("/continents", continents);

module.exports = router;
