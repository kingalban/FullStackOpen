const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const config = require('../utils/config')
const Comment = require('../models/comment')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', {username:1, name:1, id:1})
        .populate('comments', {comment:1, id:1})

    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response, next) => {
    const blog = await Blog
        .findById(request.params.id)
        .populate('user', {username:1, name:1, id:1})
        .populate('comments', {comment:1})

    if(blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})
    
blogsRouter.post('/', async (request, response) => {
    const body = request.body

    console.log("blog post:", body)
    const decodedToken = jwt.verify(request.token, config.SECRET)

    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    
    const user = await User.findById(decodedToken.id)    

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()
    
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog)  
})

blogsRouter.delete('/:id', async (request, response) => {

    const decodedToken = jwt.verify(request.token, config.SECRET)

    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)    
    
    const blogToDelete = await Blog.findById(request.params.id)
    
    if(blogToDelete.user.toString() === user._id.toString()){
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } else {
        response.status(401).end()
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
})

// Comments router:

blogsRouter.get('/:id/comments', async (request, response) => {
    const comments = await Comment
        .find({})
        .populate('blog', {title:1, url:1, likes:1, user:1, id:1})
    
    response.json(comments.map(comment => comment.toJSON()))
})

blogsRouter.post("/:id/comments", async (request, response) => {
    const body = request.body
    console.log("body:", body)

    const blog = await Blog.findById(request.params.id)
    
    const comment = new Comment({
        comment: body.comment,
        blog: blog._id,
        date: new Date()
    })

    const savedComment = await comment.save()
    
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()

    response.json(savedComment)  

})

module.exports = blogsRouter