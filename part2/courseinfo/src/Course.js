import React from 'react';

const Header = ({ course }) => {
	return (
		<h1>{course.name}</h1>
	)
}

const Total = ({ course }) => {
	const sum = course.parts.map(part => part.exercises).reduce((a,b) => a + b)
	console.log(sum)

	return(
	  <strong>Total of {sum} exercises</strong>
	) 
}

const Part = ({part}) => {
	console.log(part)
	return (
		<p>
			{part.name} {part.exercises}
		</p>    
	)
}

const Content = ({ course }) => {
	return ( 
	<div>
		{course.parts.map(part => <Part key={part.id} part={part}/>)}
	</div>
	)
}

const Course = ({course}) =>{
	console.log(course)
	return(
		<>
			<Header course={course}/>
			<Content course={course}/>
			<Total course={course}/>
		</>
	)
}


export default Course