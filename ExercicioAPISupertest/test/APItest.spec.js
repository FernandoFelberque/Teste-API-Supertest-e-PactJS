const req = require('supertest');
const { getAccessToken } = require('../utils/request');
const API_URL = process.env.API_URL

describe('Exercicio testando API customers e addresses', () => {

    let token

    beforeAll(async () => {
        token = await getAccessToken('admin', 'admin')
    })

    it('(HealthCheck) Customers API', () => {

        req('http://localhost:3000/api')
            .post('/customers')
            .send({
                "address": {
                    "id": "string"
                },
                "email": "string",
                "firstName": "string",
                "lastName": "string",
                "phone": "string"
            }).set('Accept', 'application/json')
            .then(response => {
                expect(response.statusCode).toEqual(201)
                expect(response.email).not.toBe(undefined)
            })
    });

    it('(E2E) addresses API', () => {

        req('http://localhost:3000/api')
            .get('/addresses')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .then(response => {
                expect(response.statusCode).toEqual(201)
                expect(response.body).toBeInstanceOf(Array)
            })
    });

});