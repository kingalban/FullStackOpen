const Blog = require("../models/blog")

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


const nonExistingId = async () => {
    const blog = new Blog(initialBlogs[0])
    await blog.save()
    await blog.remove()
  
    return blog._id.toString()
  }



module.exports = {initialBlogs, blogsInDB, nonExistingId}