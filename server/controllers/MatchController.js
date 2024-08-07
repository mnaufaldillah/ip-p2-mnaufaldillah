const apiFootballInstance = require("../config/apiFootballInstance");
const { lastTwoDaysfromCurrentDay, nextTwoDaysfromCurrentDay } = require("../helpers/currentDate");

class MatchController {
    static async getMatches(req, res, next) {
        try {
            const { data } = await apiFootballInstance({
                url: `/fixtures`,
                method: `GET`,
                params: {
                    league: 274,
                    season: 2024,
                    from: lastTwoDaysfromCurrentDay(),
                    to: nextTwoDaysfromCurrentDay(),
                    timezone: `Asia/Jakarta`
                },
                headers: {
                    'x-rapidapi-key': process.env.X_RAPIDAPI_KEY,
                    'x-rapidapi-host': `api-football-v1.p.rapidapi.com`
                }
            });

            res.status(200).json({
                data
            });
        } catch (error) {
            next(error)
        }
    }

    static async getMatchById(req, res, next) {
        try {
            const {matchId} = req.params;


            const { dataMatches } = await apiFootballInstance({
                url: `/fixtures`,
                method: `GET`,
                params: {
                    id: matchId
                },
                headers: {
                    'x-rapidapi-key': process.env.X_RAPIDAPI_KEY,
                    'x-rapidapi-host': `api-football-v1.p.rapidapi.com`
                }
            });

            res.status(200).json({
                dataMatches
            })
        } catch (error) {
            next(error)
        }
    }

    static async getMatchPredictionById(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = MatchController;