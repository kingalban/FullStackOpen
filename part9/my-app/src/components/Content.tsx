import React from "react"
import { CoursePart } from "../types"
import Part from "./Part"

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
    return (
        <div>
            <Part courseParts={courseParts}/>
        </div>
    );
}

export default Content