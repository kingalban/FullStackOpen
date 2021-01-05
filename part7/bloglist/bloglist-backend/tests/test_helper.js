const Blog = require("../models/blog")
const User = require("../models/user")

const initialBlogs = [
    {
        author: "Chris Achard",
        title: "How to Find Consulting Clients",
        url: "https://chrisachard.com/how-to-find-consulting-clients",
        likes: 8,        
    },
    {
        author: "Susan Fowler",
        title: "So You Want to Learn Physics...",
        url: "https://www.susanjfowler.com/blog/2016/8/13/so-you-want-to-learn-physics",
        likes: 3
    },
    {

        author: "Jacques Mattheij",
        title: "How to Improve a Legacy Codebase",
        url: "https://jacquesmattheij.com/improving-a-legacy-codebase/",
        likes: 5
    }
]

const blogsInDB = async () => {
    let dbList = await Blog.find({})
    return dbList.map(blogs => blogs.toJSON())
}

const initialUsers = [
    {
        username: "user1",
        name: "adam",
        password: "qwerty"
    },
    {
        username: "user2",
        name: "eve",
        password: "changeme"
    }

]

const usersInDB = async () => {
    let dbList = await User.find({})
    return dbList.map(user => user.toJSON())
}


module.exports = {
    initialBlogs, 
    initialUsers,
    blogsInDB,
    usersInDB
}