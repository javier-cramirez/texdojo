import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { problems } from '../js/prep2';
import { fisherYatesWIKI } from '../js/arrayUtils';

import TokenCard from '../components/TokenCard';
import TitleCard from '../components/TitleCard';
import GenericLink from '../components/GenericLink';
import GenericButton from '../components/GenericButton';

function getDistinctCategories(problemsArray) {
        const flattened = problemsArray.flatMap(p => p.categories);
        const unique_categories = [...new Set(flattened)];
        unique_categories.push("all");
        return unique_categories;
}

function GameCategories () {
    const [categories, setCategories] = useState(() => getDistinctCategories(problems));
    const [selectedItems, setSelectedItems] = useState([]);
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);

    // const distinct_categories = getDistinctCategories(problems).filter(c => c !== 'all');

    // const mapCategoryToDifficulty = useMemo(() => {
    //     const mp = {};
    //     distinct_categories.forEach(category => {
    //         const timeLimits = problems.filter(problem => problem.categories.includes(category))
    //     })
    // })

    
    const handleDropdown = () => {
        setIsOpenDropdown(!isOpenDropdown);
    }

    const scramCategories = () => {
        setCategories(prev => {
        const copy = [...prev];
        fisherYatesWIKI(copy);
        return copy;
        });
    };


    const handleItemSelect = (itemKey) => {
        if (selectedItems.includes(itemKey)) {
            setSelectedItems(selectedItems.filter(key => key !== itemKey));
        }  else {
            setSelectedItems([...selectedItems, itemKey]);
        }
        if (selectedItems.includes("all")) {
            setSelectedItems(["all"]);
        }
    };

    const applyFilter = (filterType) => {
        switch(filterType) {
            case "A-Z":
                setCategories(prev => 
                    [...prev].sort((a,b) => a.localeCompare(b))
                );
                break;
            case "Z-A":
                setCategories(prev => 
                    [...prev].sort().reverse((a,b) => a.localeCompare(b))
                );
                break;
            case "scramble":
                scramCategories();
                break;
            case "hardest first":
                
                break;
                
            case "easiest first":
                break;
            default:
                break;
        }
    }

    const applySearchFilter = (letter) => { // given a letter, returns all categories that start with that letter
        categories.filter((c) => c.startswith(letter));
    }

    return (
        <div className='font-mono'>
            <TitleCard title={"Choose Your Categories"} isLatex={true}/>
            <div className="rounded p-3 flex flex-row justify-center">
                        <div className='relative inline-block text-left'>
                            <button 
                                onClick={handleDropdown}
                                className="inline-flex justify-center w-full px-6 py-3 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                Sort By 
                            </button>
                            {isOpenDropdown ? (
                                <div className='origin-top-left absolute left-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20'>
                                    <div className='py-1'>
                                        <GenericButton onClick={() => applyFilter("A-Z")} text="A-Z"/>
                                        <GenericButton onClick={() => applyFilter("scramble")} text="scramble"/>
                                        <GenericButton onClick={() => applyFilter("Z-A")} text="Z-A"/>
                                        
                                    </div>
                                </div>
                            ) :  null}
                        </div>
                        <GenericLink to="/" text="Main Screen"/>
                    {(selectedItems.length >= 1) &&  
                        <GenericLink 
                            to="/game" 
                            state={{ selectedCategories: selectedItems.map(i => categories[i])}}
                            text="Start Game!"
                        />
                    }
            </div>
            <div className="rounded p-3 flex flex-row">
                {(selectedItems.length >= 1)
                    ? <h1>{(selectedItems.length == 1) 
                        ? `You have selected ${selectedItems.length} category`
                        : `You have selected ${selectedItems.length} categories`
                        } </h1>
                    : <h1 className='font-bold text-red-600'>You must select at least one category!</h1>
                }
            </div>
            <div 
                className="bg-white rounded shadow p-6 m-5 grid gap-5"
                style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}
                >
                    {categories.map((category, i) => (
                        (category && !selectedItems.includes(categories.length-1)) 
                        ? (
                            <TokenCard
                                key={i}
                                onClick={() => handleItemSelect(i)}
                                className={(selectedItems.includes(i)) ? 'bg-gray-300' : 'hover:bg-gray-200 transition' }
                            >
                            {category}
                            </TokenCard>
                        ) : (
                            <TokenCard
                                key={i}
                                onClick={() => handleItemSelect(i)}
                                className={'bg-gray-300'}
                            >
                            {category}
                            </TokenCard>
                        )
                    ))}
            </div>
        </div>
    )
}

export default GameCategories;