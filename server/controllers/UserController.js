const { comparePassword } = require(`../helpers/bcrypt.js`);
const { User } = require(`../models/index.js`);
const { signToken } = require(`../helpers/jwt.js`);
const { OAuth2Client } = require(`google-auth-library`);
const { where } = require("sequelize");

class UserController {
    static async registerUser(req, res, next) {
        try {
            const { fullName, email, password } = req.body;

            const newUser = await User.create({
                fullName,
                email,
                password
            });

            res.status(201).json({
                id: newUser.id,
                fullName: newUser.fullName,
                email: newUser.email,
            })
        } catch (error) {
            next(error)
        }
    }

    static async loginUser(req, res, next) {
        try {
            const {email, password } = req.body;

            if(!email) {
                throw { name: `CredentialsRequired`, message: `Email is Required`};
            }

            if(!password ) {
                throw { name: `CredentialsRequired`, message: `Password is Required`};
            }

            const foundUser = await User.findOne({
                where: {
                    email
                }
            });

            if(!foundUser) {
                throw { name: `Unauthorized`, message: `Email or Password is Invalid`};
            }

            const comparedPass = comparePassword(password, foundUser.password);

            if(!comparedPass) {
                throw { name: `Unauthorized`, message: `Email or Password is Invalid`};
            }

            const access_token = signToken({id: foundUser.id});

            res.status(200).json({access_token});
        } catch (error) {
            next(error)
        }
    }

    static async googleLoginUser(req, res, next) {
        try {
            const token = req.headers.google_token;
            const client = new OAuth2Client();
            
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: `819254476615-jbpdeo1hlfpb8c41rldcq91bmh6ol8ol.apps.googleusercontent.com`
            });

            const payload = ticket.getPayload();

            // console.log(payload);

            const email = payload.email;
            const fullName = payload.name

            const [user, created] = await User.findOrCreate({
                where: { email },
                defaults: {
                    fullName,
                    email,
                    password: `googlelogin`
                },
                hooks: false
            })
            
            if(!created) {
                if(user.password !== `googlelogin`) {
                    throw { name: `EmailAlreadyRegisteredNonGoogle`, message: `Email is already registered`}
                }
            };

            const access_token = signToken({id: user.id});

            res.status(200).json({access_token});
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController