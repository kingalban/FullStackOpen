require('dotenv').config()

const PORT = process.env.PORT

let MONGODB_URI = process.env.MONGODB_URI

const NODE_ENV = process.env.NODE_ENV

const SECRET = process.env.SECRET

if (NODE_ENV === 'test') {  
	MONGODB_URI = process.env.TEST_MONGODB_URI
}


module.exports = {
	MONGODB_URI,
	PORT,
	NODE_ENV,
	SECRET
}