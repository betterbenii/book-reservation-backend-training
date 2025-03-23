const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

describe('Books API', () => {
    let authToken;
    
    before(async () => {
        // Login and get token for authenticated requests
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });
        authToken = res.body.token;
    });

    describe('GET /api/books', () => {
        it('should return all books', async () => {
            const res = await request(app)
                .get('/api/books')
                .set('Authorization', `Bearer ${authToken}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
        });
    });

    describe('POST /api/books', () => {
        it('should create a new book', async () => {
            const res = await request(app)
                .post('/api/books')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    title: 'Test Book',
                    author: 'Test Author',
                    isbn: '1234567890'
                });
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('title', 'Test Book');
        });
    });
});