const ArticleController = require("../controllers/ArticleController");
const router = require(`express`).Router();

router.get(`/`, ArticleController.getArticles);
router.get(`/:articleId`, ArticleController.getArticleSummaryById);

module.exports = router;