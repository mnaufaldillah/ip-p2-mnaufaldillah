const CommentController = require("../controllers/CommentController");
const authorizationComment = require("../middleware/authorizationComment");
const router = require(`express`).Router();


router.post(`/`, CommentController.createComment);
router.get(`/`, CommentController.getComments);
router.put(`/:commentId`, authorizationComment, CommentController.editComment);
router.delete(`/:commentId`, authorizationComment, CommentController.deleteComment);

module.exports = router;