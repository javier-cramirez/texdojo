function CorrectCard({ numberCorrect, className }) {

    return (
        <div
            className={`p-3 bg-white rounded text-center border border-gray-300 shadow hover:bg-gray-100 transition ${className}`} 
        >
            Correct: {numberCorrect}
        </div>
    )
}

export default CorrectCard;