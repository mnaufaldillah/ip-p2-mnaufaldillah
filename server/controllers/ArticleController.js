const newsDataInstance = require("../config/newsdataInstance");
const summaryGemini = require("../helpers/summaryGemini");

class ArticleController {
    static async getArticles(req, res, next) {
        try {
            const { data } = await newsDataInstance({
                url: `/latest`,
                method: `GET`,
                params: {
                    apikey: process.env.NEWSDATA_IO_API_KEY,
                    language: `en`,
                    category: `sports`,
                    timezone: `Asia/Jakarta`
                }
            });

            res.status(200).json(data);
        } catch (error) {
            next(error)
        }
    }

    static async getArticleSummaryById(req, res, next) {
        try {
            const { articleId } = req.params;

            // console.log(typeof articleId, `<-------- Article Id Type`, articleId, `<----------- Article ID get`);
            
            
            const { data } = await newsDataInstance({
                url: `/latest`,
                method: `GET`,
                params: {
                    apikey: process.env.NEWSDATA_IO_API_KEY,
                    id: `${articleId}`
                }
            });

            const getArticle = data.results[0];
            const articleTitle = getArticle.title;
            const articleImageUrl = getArticle.image_url;
            const articleDescription = getArticle.description;
            const articlePubDate = getArticle.pubDate;
            const articleLink = getArticle.link;
            const summaryText = await summaryGemini(articleLink);

            res.status(200).json({
                articleTitle,
                articleImageUrl,
                articleDescription,
                articlePubDate,
                summaryText
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ArticleController;