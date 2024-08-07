const UserController = require("../controllers/UserController");
const authentication = require("../middleware/authentications");

const router = require(`express`).Router();

router.post(`/add-user`, UserController.registerUser);
router.post(`/login`, UserController.loginUser);
router.post(`/google-login`, UserController.googleLoginUser);

// router.use(authentication);


module.exports = router;