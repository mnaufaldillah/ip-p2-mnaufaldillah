const request = require(`supertest`)
const app = require(`../app.js`);
const fs = require(`fs`).promises;
const { sequelize, Bookmark }  = require(`../models/index.js`);
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

        let dataBookmark = await fs.readFile(`./data/bookmark.json`, `utf8`);
        dataBookmark = JSON.parse(dataBookmark);
        dataBookmark = dataBookmark.map((item) => {
            delete item.id;
            item.password = hashPassword(item.password);
            item.imageUrl = '';
            item.createdAt = new Date();
            item.updatedAt = new Date();
            return item;
        });

        await queryInterface.bulkInsert(`Users`, dataUser, {});
        await queryInterface.bulkInsert(`Bookmarks`, dataBookmark, {});

        token = signToken({ id: 1 });
         console.log(token, `<----------- token di before all`);
    } catch (error) {
        // console.log(error);
    }
});

afterAll(async () => {
    try {
        await queryInterface.bulkDelete(`Bookmarks`, null, {
            truncate: true,
            restartIdentity: true,
            cascade: true
        });

        await queryInterface.bulkDelete(`Users`, null, {
            truncate: true,
            restartIdentity: true,
            cascade: true
        });
    } catch (error) {
        console.log(error);
    }
})

describe(`POST /bookmarks`, () => {
    describe(`Success`, () => {
        test(`Success Created 201`, async () => {
            const response = await request(app)
                .post(`/bookmarks`)
                .send({ 
                    ArticleId: `a41643bf6173243d166d108743e9acb3`
                })
                .set(`Authorization`, `Bearer ${token}`);

            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty(`ArticleId`, `a41643bf6173243d166d108743e9acb3`);
        })
    })

    describe(`Failed`, () => {
        test(`Failed 400, No Article ID Input`, async () => {
            const response = await request(app)
                .post(`/bookmarks`)
                .send({ 
                })
                .set(`Authorization`, `Bearer ${token}`);

            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty(`message`, `Article ID is Required`);
        })

        test(`Failed 401, Unauthenticated No Token`, async () => {
            const response = await request(app)
                .post(`/bookmarks`)
                .send({ 
                    ArticleId: `a41643bf6173243d166d108743e9acb3`
                })

            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty(`message`, `Unauthenticated`);
        })
    })
})

describe(`DELETE /bookmarks`, () => {
    describe(`Success`, () => {
        test(`Success 200`, async () => {
            const ArticleId = `dc2cb2263805e06c003a6724feec29e0`;
            const response = await request(app)
                .delete(`/bookmarks/${ArticleId}`)
                .set(`Authorization`, `Bearer ${token}`);

            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty(`message`, `Bookmark Success to Delete`);
        })
    })

    describe(`Failed`, () => {
        test(`Failed 404, Article ID Not Found`, async () => {
            const ArticleId = `0380026009217bb2d0708bc9e147b9d4`;
            const response = await request(app)
                .delete(`/bookmarks/${ArticleId}`)
                .set(`Authorization`, `Bearer ${token}`);

            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty(`message`, `Data is not found`);
        })

        test(`Failed 401, Unauthenticated No Token`, async () => {
            const ArticleId = `0380026009217bb2d0708bc9e147b9d4`;
            const response = await request(app)
                .delete(`/bookmarks/${ArticleId}`)


            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty(`message`, `Unauthenticated`);
        })
    })
})