const router = require(`express`).Router();
const SerieController = require(`../controllers/SerieController`);

router.get(`/`, SerieController.findAll)
router.get(`/:id`, SerieController.findOne)
router.post(`/`, SerieController.insertOne)
router.put(`/:id`, SerieController.updateOne)
router.delete(`/:id`, SerieController.deleteOne)

module.exports = router