const bcrypt = require('bcrypt')
// const { request } = require('../app')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

usersRouter.get('/', async (request, response) =>{
    const users = await User
        .find({})
        .populate('blogs', {title:1, author:1, url:1, likes:1})

    response.json(users.map(user => user.toJSON()))
})

usersRouter.post('/', async (request, response) => {
    const body = request.body

    if(body.password === undefined){
        return response.status(401).json({error:"password required"}).end() 
    }

    if(body.password.length < 3) {
        return response.status(401).json({error:"password must be at least 3 characters"}).end()
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

module.exports = usersRouter