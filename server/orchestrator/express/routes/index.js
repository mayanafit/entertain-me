const router = require('express').Router()
const movieRoutes = require(`./movies`);
const serieRoutes = require(`./series`);
const EntertainMeController = require(`../controllers/EntertainMeController`);

router.use(`/movies`, movieRoutes)
router.use(`/series`, serieRoutes)
router.get(`/entertainme`, EntertainMeController.findAll)

module.exports = router