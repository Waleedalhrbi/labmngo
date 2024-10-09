import express from 'express'
import mongoose from 'mongoose';
import Book from './models/book.js';
import dotenv from 'dotenv';

const app = express()
app.use(express.json()) 
dotenv.config();

 
const port = 9000
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connection successful');
}

 
app.get('/books', (req, res) => {
    Book.find()
    .then(result => {
        res.send(result);
    })
})

 
app.post('/books', (req, res) => {
    const newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        editionNumber: req.body.editionNumber,
        publishDate: req.body.publishDate,
        hasEbook: req.body.hasEbook,
        price: req.body.price,
        supportedLanguages: req.body.supportedLanguages,
        category: req.body.category
    });

    newBook.save()
    .then(result => {
        res.send(result);
    })
})

 
app.patch('/update/:id', (req, res) => {
    const { id } = req.params;
    Book.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    .then(result => {
        res.send(result);
    })
})

 
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    
    Book.deleteOne({ _id: id })
    .then(result => {
        if (result.deletedCount === 0) {
            return res.status(404).send('Book not found');
        }
        res.send('Deleted successfully');
    });
})

 
app.get('/book/:id', (req, res) => {
    const { id } = req.params;
    
    Book.findById(id)
    .then(result => {
        if (!result) {
            return res.status(404).send('Book not found');
        }
        res.send(result);
    })
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});
