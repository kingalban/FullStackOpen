const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce( (accumulator , item ) => 
        accumulator  += item.likes, 0)
}


module.exports = {
    dummy,
    totalLikes
}