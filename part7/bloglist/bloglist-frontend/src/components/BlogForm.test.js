import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import BlogForm from "./BlogForm"

describe("blog form function", () => {

    let component

    let blogs = []
    let setBlogs = jest.fn()
    let createBlog = jest.fn()
    let postMessage = jest.fn()
    let blogFormRef = { current: { toggleVisibility: jest.fn() } }
    blogFormRef.current.toggleVisibility
    let user = {}

    beforeEach(() => {
        component = render(
            <BlogForm
                blogs={blogs}
                setBlogs={setBlogs}
                createBlog={createBlog}
                postMessage={postMessage}
                blogFormRef={blogFormRef}
                user={user}
            />
        )
    })

    test.only("submitting blog sends the data to the handler function", () => {
        const titleField = component.container.querySelector("#title")
        const authorField = component.container.querySelector("#author")
        const urlField = component.container.querySelector("#url")

        const submitButton = component.container.querySelector("#submitButton")

        const blog = {
            title: "simple blog",
            author: "Joe Blogs",
            url: "blag.xkcd.com"
        }

        fireEvent.change(titleField, {
            target: { value: blog.title }
        })

        fireEvent.change(authorField, {
            target: { value: blog.author }
        })

        fireEvent.change(urlField, {
            target: { value: blog.url }
        })

        fireEvent.click(submitButton)

        console.log("content:", createBlog.mock.calls[0][0])

        expect(createBlog.mock.calls[0][0]).toEqual(blog)

    })

})