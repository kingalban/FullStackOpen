const supertest = require('supertest')
const _ = require('lodash')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    
    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))

    const promiseArray = blogObjects.map(blog => blog.save())
    
    await Promise.all(promiseArray)
})

describe("receiving from DB", () => {

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

describe("sending to DB", () => {

    test("POSTing a blog adds it to the server", async () => {
        const newBlog = {
            author: "Andrew Healey",
            title: "Building My Own Chess Engine",
            url: "https://healeycodes.com/building-my-own-chess-engine/",
            likes: 2,  
        }

        await api.post("/api/blogs")
            .send(newBlog)
            .expect(200)

        const blogsInDB = await helper.blogsInDB()

        const retunedBlog = _.chain(blogsInDB)
                            .last()
                            .pick(_.keys(newBlog))
                            .value()

        expect(blogsInDB.length).toBe(helper.initialBlogs.length + 1)
        expect(retunedBlog).toEqual(newBlog)

    })

    test("likes default to 0", async () => {
        const newBlog = {
            author: "Andrew Healey",
            title: "Building My Own Chess Engine",
            url: "https://healeycodes.com/building-my-own-chess-engine/"
        }

        await api.post("/api/blogs")
            .send(newBlog)
            .expect(200)
            
        const blogsInDB = await helper.blogsInDB()

        expect(_.last(blogsInDB).likes).toBe(0)

    })

    test("title is required", async () => {
        const newBlog = {
            author: "Andrew Healey",
            url: "https://healeycodes.com/building-my-own-chess-engine/"
        }

        await api.post("/api/blogs")
            .send(newBlog)
            .expect(400)
    })

    test("url is required", async () => {
        const newBlog = {
            author: "Andrew Healey",
            title: "Building My Own Chess Engine"
        }

        await api.post("/api/blogs")
            .send(newBlog)
            .expect(400)
    })

    test("PUT update with whole entry", async () => {
        const blogToUpdate = (await helper.blogsInDB())[0]
        const sentBlog = {
            author: "Andrew Healey",
            url: "http.com...",
            title: "Building My Own Chess Engine",
            likes: 100,
            id: blogToUpdate.id
        }

        const updatedBlog = await api.put(`/api/blogs/${blogToUpdate.id}`)
                        .send(sentBlog)
                        .expect(200)

        const blogInDB = await api.get(`/api/blogs/${blogToUpdate.id}`)
                        .expect(200)

        expect(updatedBlog.body).toEqual(sentBlog)
        expect(blogInDB.body).toEqual(sentBlog)

    })

    test("PUT update likes only", async () => {
        const blogToUpdate = (await helper.blogsInDB())[0]
        const sentBlog = {
            likes: 1
        }

        const updatedBlog = await api.put(`/api/blogs/${blogToUpdate.id}`)
                        .send(sentBlog)
                        .expect(200)

        const blogInDB = await api.get(`/api/blogs/${blogToUpdate.id}`)
                        .expect(200)

        expect(updatedBlog.body.likes).toEqual(sentBlog.likes)

    })

})

describe("deleting from DB",  () => {

    test("succeed with code 204 if id is valid", async () => {
        var DBcontent = await helper.blogsInDB()
        const blogToDelete = DBcontent[0]
        
        console.log(`/api/blogs/${blogToDelete.id}`)
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
        
        DBcontent = await helper.blogsInDB()

        expect(DBcontent).not.toContain(blogToDelete)
    })
})

afterAll( () => {
    mongoose.connection.close()
})
