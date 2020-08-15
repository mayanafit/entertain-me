const router = require(`express`).Router();
const MovieController = require(`../controllers/MovieController`);

router.get(`/`, MovieController.findAll)
router.get(`/:id`, MovieController.findOne)
router.post(`/`, MovieController.insertOne)
router.put(`/:id`, MovieController.updateOne)
router.delete(`/:id`, MovieController.deleteOne)

module.exports = router