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
            // arrBookmarks = Bookmarks.map((item, index) => {
            //     if(index > 50) {
            //         break;
            //     }

            //     arrBookmarks.push(item.ArticleId);
            // });

            for(let i = 0; i < Bookmarks.length; i++) {
                if(i > 50) {
                    break;
                }

                arrBookmarks.push(Bookmarks[i].ArticleId);
            }

            arrBookmarks = arrBookmarks.join(`,`);

            let options = {
                url: `/latest`,
                method: `GET`,
                params: {
                    apikey: process.env.NEWSDATA_IO_API_KEY,
                }
            }

            if(arrBookmarks) {
                options.params.id = arrBookmarks
            }

            const { data } = await newsDataInstance(options);

            res.status(200).json(data);
        } catch (error) {
            // console.log(error, `<-------- Eror`);
            
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
            console.log(error, `<-------- Eror Deelete`);
            next(error)
        }
    }
}

module.exports = BookmarkController;