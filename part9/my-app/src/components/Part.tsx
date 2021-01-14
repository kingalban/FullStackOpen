import React from "react"
import { CoursePart } from "../types"
import { assertNever } from "../utils/typeHelpers"

const Part: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
    return (
        <div>
            {courseParts.map((part: CoursePart) => {
                switch (part.name) {
                    case "Fundamentals":
                        return (
                            <p key={part.name}>
                                {part.name}, {part.description}
                            </p>
                        )
                        break;
                        
                    case "Using props to pass data":
                        return (
                            <p key={part.name}>
                                {part.name}, exercises: {part.exerciseCount}, group projects: {part.groupProjectCount}
                            </p>
                        )
                        break;
                    
                    case "Deeper type usage":
                        return (
                            <p key={part.name}>
                                {part.name}, exercises: {part.exerciseCount}, <a href={part.exerciseSubmissionLink}>{part.exerciseSubmissionLink}</a>
                            </p>
                        )
                        break;
            
                    case "Defence against the dark arts":
                        return (
                            <p key={part.name}>
                                {part.name}, {part.description}, exercise: {part.exerciseCount}
                            </p>
                        )
                        break;
                    
                    default:
                        assertNever(part)
                        break;
                }
            })}
        </div> 
    );
}

export default Part