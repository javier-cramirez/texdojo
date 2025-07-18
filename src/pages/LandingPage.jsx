import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import GenericDropdown from '../components/GenericDropdown';

function LandingPage () {
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);

    const gameItems = [
        { to: '/gameCategories', text: '\\normal Mode' },
        { to: '/game?mode=random',   text: '\\random Mode' },
        { to: '/game?mode=inf',      text: '\\inf Mode' },
    ] 

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 font-mono p-4">
            <div className="text-4xl mb-2 p-3">
                    TeXDojo
            </div>
            <div className="italic text-lg mb-8">We are not here to test your typing speed..</div>

            <GenericDropdown 
                isOpenDropdown={isOpenDropdown} 
                handleDropdown={() => setIsOpenDropdown(s => !s)}
                items={gameItems}
                
            />
            <div className='relative inline-block text-left'>
                <button 
                    className="inline-flex justify-center w-full px-6 py-3 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Leaderboard
                </button>
            </div>

            <h1 className="font-bold underline text-md p-4">About The Game</h1>
            <div className="text-sm text-center">
                <p>
                For whenever you're studying, bored, or just testing your knowledge,
                hopefully this is the game for you! </p>
                <br/>
                <p>
                You don't need to be a math-wiz to understand every question. 
                The main purpose is to invoke curiousity, which will hopefully blossom into discovery. 
                Expect to see an uptick in browser tabs!
                </p>
            </div>

        </div>
    )
}

export default LandingPage;