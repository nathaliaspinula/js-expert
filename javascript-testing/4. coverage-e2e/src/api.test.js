const { describe, it } = require('mocha');
const request = require('supertest');
const app = require('./api');
const assert = require('assert');

describe('API suite test', () => {
    describe('/contact', () => {
        it('should request the contact page and return HTTP status 200', async () => {
            const response = await request(app)
                .get('/contact')
                .expect(200);

            assert.deepStrictEqual(response.text, 'contact us page');
        });
    });

    describe('/hello', () => {
        it('should request an inexistent route and redirect to /hello', async () => {
            const response = await request(app)
                .get('/abc')
                .expect(200);

            assert.deepStrictEqual(response.text, 'hello world');
        });
    });

    describe('/login', () => {
        it('should login with success on the login route and return HTTP status 200', async () => {
            const response = await request(app)
                .post('/login')
                .send({
                    username: "nath",
                    password: "123"
                })
                .expect(200);

            assert.deepStrictEqual(response.text, 'login has succeed');
        });

        it('should unathourize a request when requesting it using wrong credentials and return HTTP status 401', async () => {
            const response = await request(app)
                .post('/login')
                .send({
                    username: "pipoca",
                    password: "com manteiga"
                })
                .expect(401);

            assert.deepStrictEqual(response.text, 'login has failed');
        });
    });
});