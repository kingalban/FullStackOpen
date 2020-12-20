const mongoose = require('mongoose')
require('dotenv').config()

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


// if(process.argv.length < 2){
//     console.log("Please provide the password as an argument: node mongo.js <password>")
//     process.exit(1)
// }

// const password = process.argv[2]

const url = process.env.mangodb_url
//`mongodb+srv://phonebook-user:${password}@fullstackopen-phonebook.qc7x0.mongodb.net/phonebook?retryWrites=true&w=majority`

var connected = {value:false}

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {connected.value = true; console.log("...")})
    .catch(err => console.log(err))

dotdotdot(connected)

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })
  
const Blog = mongoose.model('Blog', blogSchema)

if(process.argv.length === 2){
    Blog.find({}).then(result =>{
        console.log("blog list:")
        result.forEach(blog => console.log(blog))
        mongoose.connection.close()
        connected.value = true
    })

} else {
    
    const blog = new Blog({
        title: process.argv[2],
        author: process.argv[3],
        url: process.argv[4],
        likes: process.argv[5]
    })
    
    blog.save().then(result => {
        console.log("blog recorded") 
        mongoose.connection.close()
        connected.value = true
    })
}


dotdotdot(connected)
  