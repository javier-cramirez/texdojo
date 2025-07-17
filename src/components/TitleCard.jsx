import React from 'react'
import { InlineMath } from 'react-katex';

function TitleCard({ title, isLatex = false }) {
    return (
        <div
            className={`p-2 m-2 bg white text-center text-2xl font-mono`}
        >
            {isLatex
                ? <InlineMath math={"\\text{" + title + "}"} errorColor='red'/>
                : <span>{title}</span>
            }
        </div>
    )
}

export default TitleCard;