import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = (props) => {
	return(
		<button onClick={props.onClick}>
			{props.text}
		</button>
	)
}

const VoteCount = ({votes}) => {
	if(votes === 0){
		return(
			<div id="red">
				has {votes} votes
			</div>
		)		
	} else {
		return(
			<div id="green">
				has {votes} votes
			</div>
		)
	}
}

const BestAnecdote = ({votes}) => {
	const {max, index} = findMax(votes)

	if(max === -1 | index === -1){
		return(<></>)
	}

	return(
		<>
		<div id="anecdote">{anecdotes[index]}</div>
		<p>With {max} vote{max===1 ? "" : "s"}</p>
		</>
	)
}

const findMax = (array) => {
	let max = array[0]
	let index = 0

	if(array.reduce((a,b) => a + b) === 0){
		return({max: -1, index: -1})
	}

	for(let i = 0; i < array.length; i++){
		if(array[i] > max){
			max = array[i]
			index = i
		}
	}

	return({max, index})
}

const App = (props) => {
	const [selected, setSelected] = useState(0)
	const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))

	const randChoice = () => setSelected(Math.floor(Math.random()*props.anecdotes.length))
	const vote = () => {
			const copy = [...votes]
			copy[selected] += 1
			setVotes(copy)
		}

	console.log({selected, votes})

	return (
	<div className="container">
		<h1>Anecdote of the day</h1>
		<div id="anecdote">
			{props.anecdotes[selected]}
		</div>
		<VoteCount votes={votes[selected]}/>
		<div>
			<Button onClick={randChoice} text={"next anecdote"}/>
			<Button onClick={vote} text={"vote"}/>
		</div>
		<h1>Anecdote with most votes</h1>
		<BestAnecdote votes={votes}/>
	</div>
	)
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)