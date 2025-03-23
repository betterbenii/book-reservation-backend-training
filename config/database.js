module.exports = {
    database: process.env.NODE_ENV === 'test' 
        ? 'mongodb://localhost:27017/test_database'
        : 'mongodb://localhost/book_reservation_app',
    secret: process.env.JWT_SECRET || 'your_jwt_secret'
};
 