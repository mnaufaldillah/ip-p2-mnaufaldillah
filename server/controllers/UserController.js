const { comparePassword } = require(`../helpers/bcrypt.js`);
const { User } = require(`../models/index.js`);
const { signToken } = require(`../helpers/jwt.js`);
const { OAuth2Client } = require(`google-auth-library`);
const { where } = require("sequelize");
const cloudinary = require(`cloudinary`).v2;

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

            res.status(200).json({
                access_token,
                fullName: foundUser.fullName,
                imageurl: foundUser.imageUrl
            });
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

            res.status(200).json({
                access_token,
                fullName: user.fullName,
                imageUrl: user.imageUrl
            });
        } catch (error) {
            next(error)
        }
    }

    static async uploadImageUser(req, res, next) {
        try {
            cloudinary.config({
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET
            });

            const b64file = Buffer.from(req.file.buffer).toString(`base64`);

            const dataURI = `data:${req.file.mimetype};base64,${b64file}`

            const uploadFile = await cloudinary.uploader.upload(dataURI, {
                folder: `individual-project-p2`,
                public_id: req.file.originalname
            });

             const editedUser = await User.update({
                imageUrl: uploadFile.secure_url
            }, {
                where: {
                    id: req.user
                }
            });

            const uploadedImage = editedUser.imageUrl

            res.status(200).json({ message: `User Image success to update`, uploadedImage })
        } catch (error) {
            console.log(error);
            
            next(error)
        }
    }
}

module.exports = UserController