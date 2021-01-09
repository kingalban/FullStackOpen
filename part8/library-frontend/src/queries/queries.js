import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
    allAuthors  {
        name
        born
        bookCount
    }
}
`

export const ALL_BOOKS = gql`
query ALL_BOOKS ($author: String, $genre: String) {
    allBooks (
        author: $author
        genre: $genre
    )  {
        title
        author {
            name
        }
        published
        genres
    }
}
`

export const ADD_BOOK = gql`
mutation New_Book($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
        title: $title
        author: $author
        published: $published
        genres: $genres
    ) {
        title
        author {
            name
        }
    }
}
`

export const SET_BIRTHYEAR = gql`
mutation Set_Birthyear($name: String!, $setBornTo: Int!) {
    editAuthor(
        name: $name
        setBornTo: $setBornTo
    ) {
        name
        born
    }
}
`

export const LOGIN = gql`
mutation Login($username: String!, $password: String!) {
    login(
        username: $username
        password: $password
    ) {
        value
    }
}
`

export const ME = gql`
query Login {
    me {
        username
        favoriteGenre
    }
}
`