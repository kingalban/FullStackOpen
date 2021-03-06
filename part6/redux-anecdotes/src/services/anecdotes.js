import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const response = await axios
        .post(baseUrl, {
            content: content,
            id: (100000 * Math.random()).toFixed(0),
            votes: 0
        })
    return response.data
}

const modify = async (object) => {
    const response = await axios.put(`${baseUrl}/${object.id}`, object)
    return response.data
}

export default { getAll, createNew, modify }