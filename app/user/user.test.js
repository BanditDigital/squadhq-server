const expect = require('expect');
const request = require('supertest');

const {app} = require('../server');

var users = ['John', 'Betty', 'Hal'];

describe('GET /user', function() {
    it('should respond with an array of users', function(done) {
        request(app)
            .get('/user')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(res => {
                expect(res.body).toEqual(users);
            })
            .expect(200, done);
    });
});