
// import React, { useState, useEffect } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import { BOOK_ADDED, ALL_BOOKS, ALL_AUTHORS } from "../queries/queries"
import _ from "lodash"


const SubscriptionNotification = (props) => {
    const client = useApolloClient()

    const updateCacheWith = (addedBook) => {
        const includedIn = (set, object) => 
            _.find(set, ["title", object.title])  

        const booksInStore = client.readQuery({ query: ALL_BOOKS })
        const authorsInStore = client.readQuery({ query: ALL_AUTHORS })

        const localBook = includedIn(booksInStore.allBooks, addedBook)

        console.log("new book:", addedBook)
        console.log("books in store:", booksInStore)
        console.log("authors in store:", authorsInStore)
        console.log("included?", localBook)


        
        if (!localBook) {
            client.writeQuery({
                query: ALL_BOOKS,
                data: { allBooks : booksInStore.allBooks.concat(addedBook) }
            })
            
            if (!authorsInStore.allAuthors.includes(addedBook.author)) {
                client.writeQuery({
                    query: ALL_AUTHORS,
                    data: { allAuthors : authorsInStore.allAuthors.concat(addedBook.author) }
                })
            }
        }   
      }
    
    // useSubscription(PERSON_ADDED, {
    //     onSubscriptionData: ({ subscriptionData }) => {
    //         const addedBook = subscriptionData.data.personAdded
    //         notify(`${addedBook.name} added`)
    //         updateCacheWith(addedBook)
    //     }
    // })

    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            // window.alert(`a new book was added to the database: ${subscriptionData.data.bookAdded.title} by ${subscriptionData.data.bookAdded.author.name}`)
            updateCacheWith(subscriptionData.data.bookAdded)
            props.notification("new book added...")
            setTimeout(() => props.notification(null), 3000)
        }
      })

      return null
}

export default SubscriptionNotification