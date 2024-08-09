const MatchController = require("../controllers/MatchController");
const router = require(`express`).Router();


router.get(`/`, MatchController.getMatches);
router.get(`/:matchId`, MatchController.getMatchById);
router.get(`/:matchId/prediction`, MatchController.getMatchPredictionById);

module.exports = router;