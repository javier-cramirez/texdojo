import React from 'react'
import { BlockMath } from 'react-katex'

function MathDisplay({ latex }) {
    return (
        <div className='bg-white p-4 rounded shadow text-green-600 border border-black-300'>
            <BlockMath math={latex} errorColor='red'></BlockMath>
        </div>
    )
}

export default MathDisplay;