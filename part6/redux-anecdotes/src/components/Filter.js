import React from 'react'
import { connect } from 'react-redux'
import { filter } from "../reducers/filterReducer"

const Filter = (props) => {
    const handleChange = (event) => {
        props.filter(event.target.value)
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
        filter <input onChange={handleChange} />
        </div>
    )
}

const ConnectedFilter = connect(
    null,
    { filter }
)(Filter)

export default ConnectedFilter