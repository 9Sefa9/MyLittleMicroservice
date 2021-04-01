const mongoose = require('mongoose');
const Author = require('../../models/Author');

module.exports = {
    createAuthor: async (name,books) => {
        const author = new Author({
            _id: new mongoose.Types.ObjectId(),
            name: name,
            books: books
        });
        try {
            const newAuthorEntry = await author.save()
            return newAuthorEntry; 
        } catch (error) {
            throw error
        }
    },
 
    getAuthor: async (id) => {
        // ..
    },
 
    getAllAuthors: async() => {
        const allAuthors = await Author.find();
        return allAuthors;
    }
}