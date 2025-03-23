const { getBooks, getBook, addBook, updateBook } = require('../controllers/bookController');
const Book = require('../models/Book');

jest.mock('../models/Book');

describe('Book Controller', () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    req = { body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };
  });

  it('should return all books', async () => {
    const mockBooks = [{ title: 'Book 1' }, { title: 'Book 2' }];
    Book.find.mockResolvedValue(mockBooks);

    await getBooks(req, res);

    expect(res.json).toHaveBeenCalledWith(mockBooks);
  });

  it('should return a single book by ID', async () => {
    const mockBook = { title: 'Book 1' };
    req.params.id = '123';
    Book.findById.mockResolvedValue(mockBook);

    await getBook(req, res);

    expect(res.json).toHaveBeenCalledWith(mockBook);
  });

  it('should return 404 if book not found', async () => {
    req.params.id = '123';
    Book.findById.mockResolvedValue(null);

    await getBook(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Book not found' });
  });

  it('should add a new book', async () => {
    const mockBook = { title: 'New Book', author: 'Author Name' };
    req.body = mockBook;

    
    Book.prototype.save = jest.fn().mockResolvedValue(mockBook);

    await addBook(req, res);

    expect(Book.prototype.save).toHaveBeenCalled(); // optional: verify save called
    expect(res.json).toHaveBeenCalledWith(mockBook);
  });

  it('should update an existing book', async () => {
    const mockBook = {
      _id: 'bookId123',
      title: 'Original Title',
      author: 'Original Author',
      publicationDate: '2024-01-01',
      description: 'Original Description',
      save: jest.fn().mockResolvedValue(true) 
    };

    req.params.id = 'bookId123';
    req.body = { title: 'Updated Title' };

    Book.findById.mockResolvedValue(mockBook);

    await updateBook(req, res);

    
    expect(mockBook.title).toBe('Updated Title');

    expect(mockBook.save).toHaveBeenCalled();

    
    expect(res.json).toHaveBeenCalledWith(mockBook);
  });

  it('should return 404 if book to update is not found', async () => {
    req.params.id = '123';
    Book.findById.mockResolvedValue(null);

    await updateBook(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Book not found' });
  });
});
