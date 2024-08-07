const { Bookmark } = require(`../models/index.js`);

async function authorizationBookmark(req, res, next ) {
    try {
        const { bookmarkId } = req.params;
        const bookmark = await Bookmark.findByPk(bookmarkId);

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