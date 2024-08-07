const UserController = require("../controllers/UserController");
const authentication = require("../middleware/authentications");

const router = require(`express`).Router();
const routerMatch = require(`./matches.js`);

router.post(`/add-user`, UserController.registerUser);
router.post(`/login`, UserController.loginUser);
router.post(`/google-login`, UserController.googleLoginUser);

router.use(authentication);

// router.use(`/articles`)
router.use(`/matches`, routerMatch)

module.exports = router;