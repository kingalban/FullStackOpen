import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import Blog from "./Blog"


describe("blog component display", () => {

    let component

    let setBlogs = jest.fn()
    let updateBlog = jest.fn()

    let blogService = { update:updateBlog }

    let blog = {
        title: "test blog",
        author: "anon",
        url: "blag.xkcd.com",
        likes: 1,
        user: { username: "user" }
    }


    beforeEach(() => {

        component = render(
            <Blog
                blog={blog}
                blogService={blogService}
                blogs={[]}
                setBlogs={setBlogs}
                user={{ username: "user" }}
            />
        )
    })

    test("shows only title and author on render", () => {

        expect(component.container).toHaveTextContent(blog.title)
        expect(component.container).toHaveTextContent(blog.author)
        expect(component.container).not.toHaveTextContent(blog.url)
        expect(component.container).not.toHaveTextContent(blog.likes)
    })

    test("shows all (title, author, url likes) when show clicked", () => {

        const show-button = component.container.querySelector("#show-button")

        fireEvent.click(show-button)

        expect(component.container).toHaveTextContent(blog.title)
        expect(component.container).toHaveTextContent(blog.author)
        expect(component.container).toHaveTextContent(blog.url)
        expect(component.container).toHaveTextContent(blog.likes)
    })

    test("click 'like' calls function twice", () => {

        const showButton = component.container.querySelector("#show-button")

        fireEvent.click(showButton)

        const likeButton = component.container.querySelector("#like-button")

        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        expect(updateBlog.mock.calls).toHaveLength(2)
    })

})