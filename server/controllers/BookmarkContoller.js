const { Bookmark } = require(`../models/index.js`);
const newsDataInstance = require("../config/newsdataInstance");
const { where } = require("sequelize");

class BookmarkController {
    static async createBookmark(req, res, next) {
        try {
            const { ArticleId } = req.body;

            const bookmark = await Bookmark.create({
                UserId: req.user,
                ArticleId
            });

            res.status(201).json(bookmark);
        } catch (error) {
            next(error)
        }
    }

    static async getBookmarks(req, res, next) {
        try {
            const Bookmarks = await Bookmark.findAll({
                where: {
                    UserId: req.user
                }
            });

            let arrBookmarks = [];
            arrBookmarks = Bookmarks.map((item, index) => {
                if(index > 50) {
                    return true;
                }

                arrBookmarks.push(item.ArticleId);
                return false
            });

            arrBookmarks = arrBookmarks.join(`,`);

            const { data } = await newsDataInstance({
                url: `/latest`,
                method: `GET`,
                params: {
                    apikey: process.env.NEWSDATA_IO_API_KEY,
                    id: `${arrBookmarks}`
                }
            });

            res.status(200).json(data);
        } catch (error) {
            next(error)
        }
    }

    static async getBookmarksForUser(req, res, next) {
        try {
            const Bookmarks = await Bookmark.findAll({
                where: {
                    UserId: req.user
                }
            });

            res.status(200).json(Bookmarks);
        } catch (error) {
            next(error)
        }
    }

    static async deleteBookmark(req, res, next) {
        try {
            const { ArticleId } = req.params;

            // console.log(ArticleId, `<-------------`, typeof ArticleId, `<----------------------`);
            

            await Bookmark.destroy({
                where: {
                    UserId: req.user,
                    ArticleId
                }
            });

            res.status(200).json({ message: `Bookmark Success to Delete`})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = BookmarkController;