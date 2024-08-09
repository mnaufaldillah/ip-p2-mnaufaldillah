const { Comment } = require(`../models/index.js`);

async function authorizationComment(req, res, next ) {
    try {
        const { commentId } = req.params;
        const comment = await Comment.findByPk(commentId);

        if(!comment) {
            throw { name: `NotFound`}
        }

        if(comment.UserId !== req.user) {
            throw { name: `Forbidden`};
        }

        next();
    } catch (error) {
        next(error)
    }
}

module.exports = authorizationComment;