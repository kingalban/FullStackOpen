
const morgan = require('morgan')
const logger = require('../utils/logger')

morgan.token("printPOST", (req, res) => {
  if(req.method === "POST" | req.method === "PUT"){
      return JSON.stringify(req.body)
  } 
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
    
const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
    console.log(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: "invalid token" })
    }
    
    next(error)
}
  
module.exports = {
    morgan:  morgan(':method :url :status :res[content-length] - :response-time ms :printPOST' ),
    errorHandler,
    unknownEndpoint
}