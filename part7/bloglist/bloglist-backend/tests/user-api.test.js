const supertest = require('supertest')
const _ = require('lodash')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

const returnedKeys = ["username", "name"]   // the keys of the users returned from the api

var token       // defined in the global scope 

beforeAll(async () => {
    const admin = new User({username: "admin"})

    await admin.save()

    token = (await api.post('/api/login')
        .send({
            username: "admin"
        }))
        .body.token

    await User.deleteMany({})
})

beforeEach(async () => {

    await User.deleteMany({})
    
    const userObjects = helper.initialUsers
        .map(user => new User(user))

    const promiseArray = userObjects.map(user => user.save())

    await Promise.all(promiseArray)
})

describe('adding users', () =>{

    test('initial users are created', async () => {
        const DBcontent = await api.get('/api/users')
            .expect(200)

        const userDetails = DBcontent.body
            .map(user => 
                _.pick(user, returnedKeys)
            )

        const trimmedInitialUsers = helper.initialUsers
            .map(user => 
                _.pick(user, returnedKeys)
            )

        expect(userDetails).toEqual(trimmedInitialUsers)
    })

    test('successfully add new user', async () => {

        const newUser = {
            username: "aardvark",
            name: "aardvark",
            password: "catfish"
        }

        const response = await api.post('/api/users')
            .set('Authorization', 'bearer ' + token)
            .send(newUser)
            .expect(200)

        expect(_.pick(newUser, returnedKeys))
            .toEqual(_.pick(response.body, returnedKeys))

    })
    
    test('password rules enforced', async () => {

        await api.post('/api/users')
            .set('Authorization', 'bearer ' + token)
            .send({
                username: "aardvark",
                name: "aardvark"
            }) 
            .expect(401)

            
        await api.post('/api/users')
            .send({
                username: "aardvark",
                name: "aardvark",
                password:"0"
            }) 
            .expect(401)
            
        })
        
    test('user rules enforced', async () => {
        
        await api.post('/api/users')
        .set('Authorization', 'bearer ' + token)
        .send({
            name: "aardvark",
            password: "default"
        }) 
        .expect(400)
        
        await api.post('/api/users')
            .set('Authorization', 'bearer ' + token)
            .send(helper.initialUsers[0])
            .expect(400)
        
    })

})

afterAll( async () => {
    await User.deleteMany({})
    mongoose.connection.close()
})
