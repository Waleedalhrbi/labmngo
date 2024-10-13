import mongoose from 'mongoose';
const { Schema } = mongoose;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'User',  
        required: true
    },
    editionNumber: {
        type: Number,
        required: true
    },
    publishDate: {
        type: Date,
        required: true
    },
    hasEbook: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        required: true
    },
    supportedLanguages: {
        type: [String],
        required: true
    },
    category: {
        type: String,
        required: true
    }
},
{ timestamps: true }
);

const Book = mongoose.model('Book', bookSchema);

export default Book;
