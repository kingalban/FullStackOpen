const mongoose = require('mongoose')
require('dotenv').config()
const Blog = require('./models/blog')

const dotdotdot = (target, rec = false) => {
    if(rec === false){
        target.value = false
    }

    if(target.value == false){
        process.stdout.write(".")       
        setTimeout(() => {
            dotdotdot(target, true)
        }, 500)
    }
}

var connected = {value:false}
const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {connected.value = true; console.log("...")})
    .catch(err => console.log(err))
    
dotdotdot(connected);

(async () => {

    var blogsInDB = await Blog.find({})

    console.log("deleting", blogsInDB.length, "blog" + (blogsInDB.length > 1 ? "s" : ""))

    await Blog.deleteMany({})

    blogsInDB = await Blog.find({})

    console.log(blogsInDB.length, "remaining...")

    mongoose.connection.close()

    process.exit()    
})()