const BookmarkController = require("../controllers/BookmarkContoller");
const authorizationBookmark = require("../middleware/authorizationBookmark");
const router = require(`express`).Router();


router.post(`/`, BookmarkController.createBookmark);
router.get(`/`, BookmarkController.getBookmarks);
router.get(`/user`, BookmarkController.getBookmarksForUser);
router.delete(`/:ArticleId`, authorizationBookmark, BookmarkController.deleteBookmark);

module.exports = router;