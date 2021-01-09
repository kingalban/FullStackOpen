const { promises } = require('fs')
const mongoose = require('mongoose')
const Author = require("./models/author")
const Book = require("./models/book")
const User = require("./models/user")
const _ = require("lodash")
const { updateOne } = require('./models/author')

const MONGODB_URI = "mongodb+srv://phonebook-user:mango-mungo@fullstackopen-phonebook.qc7x0.mongodb.net/library?retryWrites=true&w=majority"

const authors = [
    {
        name: 'Robert Martin',
        id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        born: 1963
    },
    {
        name: 'Fyodor Dostoevsky',
        id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        born: 1821
    },
    { 
        name: 'Joshua Kerievsky', // birthyear not known
        id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    { 
        name: 'Sandi Metz', // birthyear not known
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
]
  
const books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
        genres: ['agile', 'patterns', 'design']
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: "afa5de00-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: "afa5de01-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'patterns']
    },  
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: "afa5de02-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'design']
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: "afa5de03-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'crime']
    },
    {
        title: 'The Demon ',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: "afa5de04-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'revolution']
    },
]

const users = [
    {
        username: "steve",
        favoriteGenre: "sci-fi"
    },
    {
        username: "mark",
        favoriteGenre: "refactoring"
    }
]

mongoose.set('useCreateIndex', true)
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => console.log("connected"))
    .catch(err => console.log(err));

(async function() {

    await Author.deleteMany({})
    await Book.deleteMany({})
    await User.deleteMany({})
    
    const authorData = await Promise.all(
        authors.map(a => {
            const author = new Author({
                name: a.name,
                born: a.born
            })

            const resp = author.save()
            return resp
        })
    )

    const bookPromises = books.map( async b => {
        const book = new Book({
            title: b.title,
            published: b.published,
            author: authorData.find(a => a.name === b.author)._id,
            genres: b.genres
        })
        return book.save()
    })


    await Promise.all(bookPromises)
   
    await Promise.all(users.map( async u => {
            const user = new User({ ...u })
            return  user.save()
        })
    )

    console.log("done")
    
    process.exit()

})()
