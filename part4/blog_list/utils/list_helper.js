var _ = require('lodash');

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce( (accumulator , item ) => 
        accumulator  += item.likes, 0)
}

const favoriteBlog = (blogs) => {
    const maxLikes = blogs.reduce( (acc, curr) => {
        if(curr.likes > acc){
            acc = curr.likes
        }
        return acc
    }, 0)
    
    const select = ({author, title, likes}) => ({ author, title, likes })
    
    result = select(blogs.find(blog => blog.likes === maxLikes))

    return result
}

const mostBlogs = (blogs) => {
    return _.chain(blogs)
    .countBy(_.property("author"))
    .reduce((acc, curr, author) => {
        // console.log("acc:", acc, "curr:", curr, "author:", author)
        if(acc.blogs === undefined | acc.blogs < curr){
            return {author: author, blogs: curr}
        } else {
            return acc
        }
    }, {})
    .value()
}

const mostLikes = (blogs) => {
    return _.chain(blogs)
    .groupBy(_.property("author"))
    .map((blogs, author) => {
        return {
            author: author,
            likes: _.reduce(blogs, (sum, n) => sum + Number(n.likes), 0)
        }
    })
    // .tap((result) => console.log("result", result))
    .reduce((acc, curr) => {
        return acc.likes === undefined | acc.likes < curr.likes     // if acc.likes is undefined, it's the first pass.
        ? curr
        : acc
    }, {})
    .value()
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}