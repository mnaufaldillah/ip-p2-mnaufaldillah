const { Bookmark } = require(`../models/index.js`);

async function authorizationBookmark(req, res, next ) {
    try {
        const { ArticleId } = req.params;
        const bookmark = await Bookmark.findOne({
            where: {
                UserId: req.user,
                ArticleId
            }
        });

        if(!bookmark) {
            throw { name: `NotFound`}
        }

        if(bookmark.UserId !== req.user) {
            throw { name: `Forbidden`};
        }

        next();
    } catch (error) {
        next(error)
    }
}

module.exports = authorizationBookmark;