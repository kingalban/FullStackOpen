import _ from "lodash"

Cypress.Commands.add("addUser", (user) => {
    cy.request("POST", "http://localhost:3003/api/users", user)
})

Cypress.Commands.add("clearDB", () => {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
})

Cypress.Commands.add("httpLogin", (user) => {
    cy.request("POST", "http://localhost:3003/api/login", {
        username: user.username, password: user.password
    })
        .then( ({ body }) => {
            localStorage.setItem("loggedBlogappUser", JSON.stringify(body))
        })
})

Cypress.Commands.add("addBlog", (blog) => {
    cy.request({
        method: "POST",
        url: "http://localhost:3003/api/blogs",
        auth: {
            bearer: JSON.parse(localStorage.getItem("loggedBlogappUser")).token
        },
        body: blog
    })
})

// Cypress.Commands.add("likeBlog", (blogTitle) => {
//     cy.contains(blogTitle)
// })


describe("Blog app", function() {

    let user = {
        username: "tester", name: "herra tester", password: "qwerty"
    }

    it("Login form is shown", function() {
        cy.visit("http://localhost:3000")
        cy.get("#login-form")
    })

    describe("Login", function() {

        beforeEach(function() {
            cy.request("POST", "http://localhost:3003/api/testing/reset")

            cy.request("POST", "http://localhost:3003/api/users", user)

            cy.visit("http://localhost:3000")
        })

        it("succeeds with correct credentials", function() {
            cy.get("#username-input").type(user.username)
            cy.get("#password-input").type(user.password)
            cy.get("#login-button").click()

            cy.contains(`${user.name} logged in`)
        })

        it("fails with wrong credentials", function() {
            cy.get("#username-input").type("bad username")
            cy.get("#password-input").type("bad password")
            cy.get("#login-button").click()

            cy.get("html").should("not.contain", `${user.username} logged in`)

            cy.get(".error")
                .should("contain", "credentials not accepted")
                .and("have.css", "color", "rgb(255, 0, 0)")
                .and("have.css", "border-style", "solid")
        })
    })

    describe("When logged in", function() {

        const blog = {
            title: "test blog",
            author: "Joe Blogs",
            url: "https://www.example.com/"
        }

        beforeEach(function() {
            cy.clearDB()
            cy.addUser(user)
            cy.httpLogin(user)
                .then(() => {
                    cy.visit("http://localhost:3000")
                })

        })

        describe("creating a blog", function() {

            beforeEach(function() {
                cy.contains("new entry").click()

                cy.get("#title").type(blog.title)
                cy.get("#author").type(blog.author)
                cy.get("#url").type(blog.url)

                cy.get("#submit-button").click()

                cy.get("#show-button").click()
            })



            it("A blog can be created", function() {

                cy.get("html")
                    .should("contain", blog.title)
                    .and("contain", blog.author)
                    .and("contain", blog.url)

                cy.get("#hide-button").click()

                cy.get("html")
                    .should("contain", blog.title)
                    .and("contain", blog.author)
                    .and("not.contain", blog.url)
            })

            it("a blog can be liked", function() {

                cy.get("html")
                    .get("#blog-likes")
                    .should("contain", "0")

                cy.get("#like-button").click()

                cy.get("html")
                    .get("#blog-likes")
                    .should("contain", "1")

            })

            it("a blog can be deleted by its owner", function() {
                cy.get("#remove-button").click()

                cy.get("#blog-title").should("not.exist")
                cy.get("#blog-author").should("not.exist")
                cy.get("#blog-likes").should("not.exist")
                cy.get("#blog-url").should("not.exist")
            })

            it("a blog cannot be deleted by another user", function() {
                cy.get("#logout-button").click()

                cy.get("#remove-button").should("not.exist")

                const newUser = {
                    username: "temp",
                    name: "Temp",
                    password: "changeme"
                }
                cy.addUser(newUser)
                cy.httpLogin(newUser)

                cy.visit("http://localhost:3000")

                cy.contains(`${newUser.name} logged in`)

                cy.get("#show-button").click()

                cy.get("#remove-button").should("not.exist")
                cy.get("#blog-title").should("exist")
                cy.get("#blog-author").should("exist")
                cy.get("#blog-likes").should("exist")
                cy.get("#blog-url").should("exist")
            })
        })
    })

    let blogList = [
        {
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 0
        },
        {
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 1
        },
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 3
        },
        {
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 4
        },
        {
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 5
        },
        {
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2
        }
    ]

    describe("Behaviour with multiple blogs", function() {
        beforeEach(function(){
            cy.clearDB()
            cy.addUser(user)
            cy.httpLogin(user)

            blogList.forEach(blog => {
                cy.addBlog(blog)
            })

            cy.visit("http://localhost:3000")

        })

        it("blogs listed in order of likes", function() {
            const sortedBlogs = _.orderBy(blogList, ["likes"], ["desc"])

            sortedBlogs.forEach( (blog, i) => {
                cy.get(".blog-entry").eq(i)
                    .should("contain", blog.title)
                    .and("contain", blog.author)
            })
        })

        it.only("liking a blog changes its position", function() {
            const addedLikes = 10
            const modifiedBlogs = [...blogList]
            modifiedBlogs[0].likes += addedLikes

            console.log("updated", modifiedBlogs[0])

            cy.contains(modifiedBlogs[0].title).parent().as("blog0")
            cy.get("@blog0").find("#show-button").click()

            for(let i = 0; i < addedLikes; i++) {
                cy.get("@blog0").find("#blog-likes").should("contain", i )
                cy.get("@blog0").find("#like-button").click()

            }

            _.orderBy(modifiedBlogs, ["likes"], ["desc"])
                .forEach( (blog, i) => {
                    cy.get(".blog-entry").eq(i)
                        .should("contain", blog.title)
                        .and("contain", blog.author)
                })
        })
    })
})