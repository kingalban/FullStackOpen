const supertest = require('supertest')
const _ = require('lodash')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

var token       // defined in the global scope 

beforeAll(async () => {
    const admin = new User({username: "admin"})

    await admin.save()

    token = (await api.post('/api/login')
        .send({
            username: "admin"
        }))
        .body.token
})

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
            .set('Authorization', 'bearer ' + token)
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
            .set('Authorization', 'bearer ' + token)
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
            .set('Authorization', 'bearer ' + token)
            .send(newBlog)
            .expect(400)
    })

    test("url is required", async () => {
        const newBlog = {
            author: "Andrew Healey",
            title: "Building My Own Chess Engine"
        }

        await api.post("/api/blogs")
            .set('Authorization', 'bearer ' + token)
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

    test("user can create and successfully delete blog", async () => {
        const setupBlog = {
            author: "Andrew Healey",
            title: "not for long",
            url: "lmgtfy.com",
            likes: 0
        }

        const blogToDelete = (await api
            .post("/api/blogs")
            .set('Authorization', 'bearer ' + token)
            .send(setupBlog)
            .expect(200))
            .body
        
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', 'bearer ' + token)
            .expect(204)
        
        DBcontent = await helper.blogsInDB()

        expect(DBcontent).not.toContain(blogToDelete)
    })
    
    test("user can't delete another user's blog", async () => {
        const setupBlog = {
            author: "Andrew Healey",
            title: "not for long",
            url: "lmgtfy.com",
            likes: 0
        }

        const blogToDelete = _.pick((await api
            .post("/api/blogs")
            .set('Authorization', 'bearer ' + token)
            .send(setupBlog)
            .expect(200))
            .body,
            _.keys(helper.initialBlogs[0]))
            

            
        const tempToken = (await api.post('/api/login')
            .send(helper.initialUsers[0]))
            .body.token
        
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', 'bearer ' + tempToken)
            .expect(401)
        
        DBcontent = (await helper.blogsInDB())
            .map(el => _.pick(el, _.keys(helper.initialBlogs[0])))

        expect(DBcontent).toContainEqual(blogToDelete)
    })
})

afterAll( async () => {
    await User.deleteMany({})
    mongoose.connection.close()
})
