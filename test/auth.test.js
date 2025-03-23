const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

describe('Auth API', () => {
    describe('POST /api/auth/login', () => {
        it('should login a user with valid credentials', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'password123'
                });
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('token');
        });

        it('should reject invalid credentials', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'wrong@example.com',
                    password: 'wrongpass'
                });
            expect(res.status).to.equal(401);
        });
    });
});