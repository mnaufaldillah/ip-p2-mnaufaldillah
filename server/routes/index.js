const UserController = require("../controllers/UserController");
const authentication = require("../middleware/authentications");

const router = require(`express`).Router();
const routerMatch = require(`./matches.js`);
const routerArticle = require(`./articles.js`);
const routerBookmark = require(`./bookmarks.js`);
const routerComment = require(`./comments.js`);

const multer = require(`multer`);
const storage = multer.memoryStorage();
const upload = multer({ storage: storage});

router.post(`/add-user`, UserController.registerUser);
router.post(`/login`, UserController.loginUser);
router.post(`/google-login`, UserController.googleLoginUser);

router.use(authentication);

router.patch(`/user-upload`, upload.single(`image`), UserController.uploadImageUser)

// router.use(`/articles`)
router.use(`/matches`, routerMatch);
router.use(`/articles`, routerArticle);
router.use(`/bookmarks`, routerBookmark);
router.use(`/comments`, routerComment);

module.exports = router;