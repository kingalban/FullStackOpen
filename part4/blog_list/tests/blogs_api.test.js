const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

// console.log("in DB", helper.initialBlogs)

describe("api tests", () => {

    beforeEach(async () => {
        await Blog.deleteMany({})
    
        const blogObjects = helper.initialBlogs
          .map(blog => new Blog(blog))
        const promiseArray = blogObjects.map(blog => blog.save())
        await Promise.all(promiseArray)
    })

    test("blogs returned with json header", async () => {
        await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test("all blogs are returned", async () => {
        const response = await api.get('/api/blogs')

        expect(response.body.length).toBe(helper.initialBlogs.length)
    })

    test("_id has been changed to id", async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].id).toBeDefined()
        expect(response.body[0]._id).not.toBeDefined()
    })
    

})

afterAll( () => {
    mongoose.connection.close()
})
