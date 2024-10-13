import Book from '../models/book.js';

 
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching books' });
  }
};

 
export const addBook = async (req, res) => {
  try {
    const { title, author, editionNumber, publishDate, hasEbook, price, supportedLanguages, category } = req.body;

    const newBook = new Book({
      title,
      author,
      editionNumber,
      publishDate,
      hasEbook,
      price,
      supportedLanguages,
      category
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(500).json({ message: 'Error adding book' });
  }
};

 
