import React, { useState, useRef, useEffect } from 'react'

function TimeCard({ isTimeStart, timeLimit, onTimeout }) {
    const [timeLeft, setTimeLeft] = useState(timeLimit);
    const intervalId = useRef(null);

    useEffect(() => {
        clearInterval(intervalId.current);

        if (isTimeStart) {
            setTimeLeft(timeLimit);
            intervalId.current = setInterval(() => {
                setTimeLeft(prev_time => {
                    if (prev_time <= 1) {
                        clearInterval(intervalId.current);
                        if (onTimeout) onTimeout();
                        return 0;
                    }
                    return prev_time - 1;
                })
            }, 1000);
        } else {
            setTimeLeft(0);
        }

        return () => clearInterval(intervalId.current);
    }, [isTimeStart, timeLimit]);

    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const seconds = String(timeLeft % 60).padStart(2, '0');

    return (
        <div
            className={`p-3 bg-white rounded text-center border border-gray-300 shadow hover:bg-gray-100 transition ${(timeLeft <= 10) ? 'text-red-500' : ''}`} 
            state={{timeLeft}}
        >
            {minutes}:{seconds}
        </div>
        
    )
}

export default TimeCard;