function GenericButton({ onClick, text }) {
    return (
        <button 
        onClick={onClick}
        className='p-3 bg-white rounded text-center border border-gray-300 shadow hover:bg-gray-100 transition' 
        >
            {text}
        </button>
    )
}

export default GenericButton;