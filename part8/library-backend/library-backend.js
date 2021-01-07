const { ApolloServer, UserInputError, gql, AuthenticationError  } = require('apollo-server')
const { v4: uuid } = require('uuid')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Author = require("./models/author")
const Book = require("./models/book")
const User = require("./models/user")

const MONGODB_URI = "mongodb+srv://phonebook-user:mango-mungo@fullstackopen-phonebook.qc7x0.mongodb.net/library?retryWrites=true&w=majority"
const JWT_SECRET = 'what-is-six-times-seven'

mongoose.set('useCreateIndex', true)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = gql`
    type Author {
        name: String!
        born: Int
        ID: ID!
        bookCount: Int!
    }
    
    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String!]!
        id: ID!
    }

    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
    }

    type Mutation {
        addBook (
            title: String!
            published: Int!
            author: String!
            genres: [String!]!
        ): Book

        editAuthor (
            name: String!
            setBornTo: Int!
        ): Author
        
        createUser(
            username: String!
            favoriteGenre: String!
        ): User

        login(
            username: String!
            password: String!
        ): Token
    }
`

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: (root, args) => {
            return Book
                .find({genres: { $elemMatch: { $eq: args.genre} } })
                .populate("author")
        },
        allAuthors: () => Author.find({}),
        me: (root, args, context) => {
            return context.currentUser
        }
    },

    Author: {
        bookCount: async (root) => {
            const bookList = await Book.find({author: root._id})
            console.log("booklist:", bookList)
            return bookList.length
        },
    },    

    Mutation: {
        addBook: async (root, args, context) => {

            if (!context.currentUser) {
            throw new AuthenticationError("not authenticated")
            }

            let authorResponse = await Author.find({name: args.author})
            
            if(!authorResponse.length) {
                author = new Author({
                    name: args.author
                })
                try {
                    authorResponse = await author.save()                
                } catch  (error) {
                    throw new UserInputError(error.message, {
                      invalidArgs: args,
                    })
                }
            } 

            const book = new Book({
                ...args,
                author: authorResponse._id,
            })

            try {
                bookResponse = await book.save()                
            } catch  (error) {
                throw new UserInputError(error.message, {
                  invalidArgs: args,
                })
            }
            
            return await Book.populate(bookResponse, "author") 
        },

        editAuthor: async (root, args, context) => {

            if (!context.currentUser) {
                throw new AuthenticationError("not authenticated")
            }
    
            const author = await Author.find({name: args.name}) 

            if(author.length) {   
                const response = await Author.findByIdAndUpdate(
                    author[0]._id,
                    { born: args.setBornTo },
                    { new: true }
                )
                return response
            }

            return null
        },
        
        createUser: async (root, args) => {
            const user = new User({ ...args })

            try {
                const response = await user.save()
                console.log("user response:", response)
                return response                
            } catch  (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }

        },

        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })
        
            if ( !user || args.password !== 'secred' ) {
              throw new UserInputError("wrong credentials")
            }
        
            const userForToken = {
              username: user.username,
              id: user._id,
            }
        
            return { value: jwt.sign(userForToken, JWT_SECRET) }
          }
    }

}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), JWT_SECRET
            )
        
            const currentUser = await User
                .findById(decodedToken.id)
                .populate('friends')

            return { currentUser }
        }
    }  
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})  