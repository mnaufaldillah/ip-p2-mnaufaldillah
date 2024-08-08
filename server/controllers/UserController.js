const { comparePassword } = require(`../helpers/bcrypt.js`);
const { User } = require(`../models/index.js`);
const { signToken } = require(`../helpers/jwt.js`);
const { OAuth2Client } = require(`google-auth-library`);
const { where } = require("sequelize");
const cloudinary = require(`cloudinary`).v2;
const nodemailer = require("nodemailer");

class UserController {
    static async registerUser(req, res, next) {
        try {
            const { fullName, email, password } = req.body;

            const newUser = await User.create({
                fullName,
                email,
                password
            });

            const html = `
                <h1>Hello, Welcome to World Wide of Football News</h1>
                <p>Thank you to sign up for our news website</p>
            `

            const transporter = nodemailer.createTransport({
                service: "Gmail",
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: "rcarr9645@gmail.com",
                    pass: process.env.GOOGLE_EMAIL_PASSWORD
                },
            });

            const mailOptions = {
                from: "rcarr9645@gmail.com",
                to: email,
                subject: "Welcome to World Wide of Football News",
                html
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.error("Error sending email: ", error);
                } else {
                  console.log("Email sent: ", info.response);
                }
            });

            res.status(201).json({
                id: newUser.id,
                fullName: newUser.fullName,
                email: newUser.email,
            })
        } catch (error) {
            // console.log(error, `<----------------`);
            
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

            const html = `
                <h1>Hello, Welcome to World Wide of Football News</h1>
                <p>Thank you to sign up for our news website</p>
            `

            const transporter = nodemailer.createTransport({
                service: "Gmail",
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: "rcarr9645@gmail.com",
                    pass: process.env.GOOGLE_EMAIL_PASSWORD
                },
            });

            const mailOptions = {
                from: "rcarr9645@gmail.com",
                to: email,
                subject: "Welcome to World Wide of Football News",
                html
            };

            if(created) {
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                      console.error("Error sending email: ", error);
                    } else {
                      console.log("Email sent: ", info.response);
                    }
                });
            }

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