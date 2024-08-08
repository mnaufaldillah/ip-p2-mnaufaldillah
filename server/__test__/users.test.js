const request = require(`supertest`)
const app = require(`../app.js`);
const fs = require(`fs`).promises;
const { sequelize, User }  = require(`../models/index.js`);
const { hashPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt.js");
const { queryInterface } = sequelize

let token

beforeAll(async () => {
    try {
        let dataUser = await fs.readFile(`./data/user.json`, `utf8`);
        dataUser = JSON.parse(dataUser);
        dataUser = dataUser.map((item) => {
            delete item.id;
            item.password = hashPassword(item.password);
            item.imageUrl = '';
            item.createdAt = new Date();
            item.updatedAt = new Date();
            return item;
        });

        await queryInterface.bulkInsert(`Users`, dataUser, {});

        token = signToken({ id: 1 });
    } catch (error) {
        console.log(error);
    }
});

afterAll(async () => {
    try {
        await queryInterface.bulkDelete(`Users`, null, {
            truncate: true,
            restartIdentity: true,
            cascade: true
        });
    } catch (error) {
        console.log(error);
        
    }
})

describe(`POST /add-user`, () => {
    describe(`Success`, () => {
        test(`Success Created 201`, async () => {
            const response = await request(app)
                .post(`/add-user`)
                .send({ 
                    fullName: `Nauf`,
                    email: `mnaufaldillah@outlook.com`,
                    password: `12345`
                })

            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty(`email`, `mnaufaldillah@outlook.com`);
        })
    })

    describe(`Failed`, () => {
        test(`Failed 400, No Email Input`, async () => {
            const response = await request(app)
                .post(`/add-user`)
                .send({ 
                    fullName: `Nauf`,
                    password: `12345`
                })

            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty(`message`, `Email is Required`);
        })

        test(`Failed 400, No Password Input`, async () => {
            const response = await request(app)
                .post(`/add-user`)
                .send({ 
                    fullName: `Nauf`,
                    email: `mnaufaldillah@outlook.com`
                });

            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty(`message`, `Password is Required`);
        })

        test(`Failed 400, Email already in Use`, async () => {
            const response = await request(app)
                .post(`/add-user`)
                .send({ 
                    fullName: `Nauf`,
                    email: `mnaufaldillah@gmail.com`,
                    password: `12345`
                })

            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty(`message`, `The Email is Already in Use`);
        })
    })
})

describe(`POST /login`, () => {
    describe(`Success`, () => {
        test(`Success 200`, async () => {
            const response = await request(app)
                .post(`/login`)
                .send({ 
                    email: `mnaufaldillah@gmail.com`,
                    password: `massa123`
                });

            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty(`access_token`, expect.any(String));
        })
    })

    describe(`Failed`, () => {
        test(`Failed 400, No Email Input`, async () => {
            const response = await request(app)
                .post(`/login`)
                .send({ 
                    email: ``,
                    password: `massa123`
                });

            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty(`message`, `Email is Required`);
        })

        test(`Failed 400, No Password Input`, async () => {
            const response = await request(app)
                .post(`/login`)
                .send({ 
                    email: `mnaufaldillah@gmail.com`,
                    password: ``
                });

            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty(`message`, `Password is Required`);
        })

        test(`Failed 400, Wrong Email Input`, async () => {
            const response = await request(app)
                .post(`/login`)
                .send({ 
                    email: `example@gmail.com`,
                    password: `12345`
                });

            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty(`message`, `Email or Password is Invalid`);
        })

        test(`Failed 400, Wrong Password Input`, async () => {
            const response = await request(app)
                .post(`/login`)
                .send({ 
                    email: `mnaufaldillah@gmail.com`,
                    password: `1234567`
                });

            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty(`message`, `Email or Password is Invalid`);
        })
    })
})

describe(`PATCH /user-upload`, () => {
    describe(`Success`, () => {
        test(`Success 200`, async () => {
            const response = await request(app)
                .post(`/user-upload`)
                .attach('image', './files/OIG1.jpg')
                .set(`Authorization`, `Bearer ${token}`);

            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty(`message`, `User Image success to update`);
        })
    })

    describe(`Failed`, () => {
        test(`Failed 400, No Image Attched`, async () => {
            const response = await request(app)
                .post(`/user-upload`)
                .attach('image', '')
                .set(`Authorization`, `Bearer ${token}`);

            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty(`message`, `Cannot read properties of undefined (reading 'buffer')`);
        })


        test(`Failed 401, Unauthenticated No Token`, async () => {
            const response = await request(app)
                .post(`/user-upload`)
                .attach('image', './files/OIG1.jpg')

            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty(`message`, `Unauthenticated`);
        })
    })
})