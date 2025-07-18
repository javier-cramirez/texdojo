import { useState, useEffect } from 'react'
import { infModeProblemStreaks, generalProblemStreaks } from "../js/arrayUtils";

function StreakDisplay({ mode, winStreak, lossStreak, numQuestions, className }) {
    let arr = []
    if (mode == 'Inf') {
        arr = infModeProblemStreaks(winStreak, lossStreak);
    } else {
        arr = generalProblemStreaks(winStreak, lossStreak, numQuestions);
    }

    const [idx, setIdx] = useState(Math.floor(Math.random()*arr.length));


    return (
        <div
            className={`p-2 m-2 bg white text-center text-2xl font-mono ${className}`}
        >
            {arr[idx]}
        </div>
    )
}
export default StreakDisplay;