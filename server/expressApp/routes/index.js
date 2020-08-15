const router = require(`express`).Router();
const movieRoutes = require(`./movies`);
const serieRoutes = require(`./series`);

router.use(`/movies`, movieRoutes)
router.use(`/series`, serieRoutes)
router.get(`/`, (req, res) => {
    res.send(`hello masuk pak eko`)
})

module.exports = router