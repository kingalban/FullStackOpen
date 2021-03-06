const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, {
        useNewUrlParser: true, 
        useUnifiedTopology: config.NODE_ENV === "test" ? false : true, 
        useFindAndModify: false, 
        useCreateIndex: true })
    .then(() => logger.info("Connected to MongoDB"))
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })

app.use(cors())


app.use(express.json())

// if(config.NODE_ENV !== "test"){
    app.use(middleware.morgan)
// }

app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)

app.use('/api/users', usersRouter)

app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {  
    const testingRouter = require('./controllers/testing')  
    app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)

app.use(middleware.errorHandler)

module.exports = app