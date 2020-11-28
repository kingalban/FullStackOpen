import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = (props) => {
	return(
		<button onClick={props.onClick}>
			{props.text}
		</button>
	)
}

const Statistic = (props) =>{
	return(
		<tr>
			<td>{props.text}:</td> 
			<td>{props.counter}</td>
		</tr>
	)
}

const Statistics = (props) => {
	const [good, neutral, bad] = props.data
	// console.log(props.data)

	if(good === 0 && neutral === 0 && bad === 0){
		return(
			<div>
				No feedback given
			</div>
			)
	}

	return(
		<table>
			<tbody>
		    	<Statistic counter={good} text={"good"}/>
		    	<Statistic counter={neutral} text={"neutral"}/>
		    	<Statistic counter={bad} text={"bad"}/>
		    	<Statistic counter={good + neutral + bad} text={"all"}/>
		    	<Statistic counter={(good - bad)/(good + neutral + bad)} text={"average"}/>
		    	<Statistic counter={good/(good + neutral + bad)*100 + "%"} text={"positive"}/>
			</tbody>
		</table>
	)

}


const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	const countGood = () => setGood(good+1)
	const countNeutral = () => setNeutral(neutral+1)
	const countBad = () => setBad(bad+1)

	return (
	<div>
		<h1>give feedback</h1>
		<Button onClick = {countGood} text={"good"}/>
		<Button onClick = {countNeutral} text={"neutral"}/>
		<Button onClick = {countBad} text={"bad"}/>
		<Statistics data={[good, neutral, bad]}/>
	</div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)