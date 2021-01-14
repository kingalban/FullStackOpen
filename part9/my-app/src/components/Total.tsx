import React from "react";
import { CoursePart } from "../types"


const Total: React.FC<{ courseParts: CoursePart[] }> = (props) => {
    return ( 
        <div>
            Number of exercises{" "}
            {props.courseParts.reduce((carry: number, part: CoursePart) => carry + part.exerciseCount, 0)}
        </div>
    )
}

export default Total