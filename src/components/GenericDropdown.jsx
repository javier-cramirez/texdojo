import { Link } from 'react-router-dom';

function GenericDropdown({ isOpenDropdown, handleDropdown, items}) {
    return (
        <div className='relative inline-block text-left'>
                <button 
                    onClick={handleDropdown}
                    className="inline-flex justify-center w-full px-6 py-3 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    New Game
                </button>
                {isOpenDropdown && (
                    <div className='origin-top-left absolute left-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20'>
                        <div className='py-1'>
                            {items.map(({ to, text }, i) => (
                                <Link
                                    key={i}
                                    to={to}
                                    className='block px-4 py-2 text-gray-700 text-sm hover:bg-gray-100'
                                >
                                    {text}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
        </div>
    )
    
}

export default GenericDropdown;