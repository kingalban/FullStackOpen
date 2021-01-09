
// import React, { useState, useEffect } from 'react'
import { useSubscription } from '@apollo/client'
import { BOOK_ADDED } from "../queries/queries"


const SubscriptionNotification = (props) => {
    
    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            window.alert(`a new book was added to the database: ${subscriptionData.data.bookAdded.title} by ${subscriptionData.data.bookAdded.author.name}`)
        //   console.log("subscription:", subscriptionData)
        }
      })

      return null
}

export default SubscriptionNotification