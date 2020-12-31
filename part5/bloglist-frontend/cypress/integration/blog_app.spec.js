describe("Blog app", function() {
    let user = {
        username: "tester", name: "tester", password: "qwerty"
    }

    beforeEach(function() {
        cy.request("POST", "http://localhost:3003/api/testing/reset")

        cy.request("POST", "http://localhost:3003/api/users", user)

        cy.visit("http://localhost:3000")
    })

    it("Login form is shown", function() {
        cy.get("#login-form")
    })

    describe("Login", function() {
        it("succeeds with correct credentials", function() {
            cy.get("#username-input").type(user.username)
            cy.get("#password-input").type(user.password)
            cy.get("#login-button").click()

            cy.contains(`${user.username} logged in`)
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
})