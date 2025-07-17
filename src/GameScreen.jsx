import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fisherYatesWIKI } from './js/arrayUtils';
import { problems } from './js/prep2';

import TokenCard from "./components/TokenCard";
import CardGrid from "./components/CardGrid";
import TitleCard from './components/TitleCard';
import MathDisplay from './components/MathDisplay';
import GenericLink from './components/GenericLink';
import GenericButton from './components/GenericButton';

const shuffle = arr => {
  const a = [...arr];
  fisherYatesWIKI(a);
  return a;
}

function GameScreen() {
  const { state } = useLocation();
  // check if all, or selected few
  const selected = state?.selectedCategories ?? ['all']
  const isAllMode = selected.length === 1 && selected[0] === "all";

  const filteredProblems = isAllMode
    ? problems
    : problems.filter(p => p.categories.some(c => selected.includes(c)))

  // everything is filtered from here on out
  const [idx, setIdx] = useState( Math.floor(Math.random()*filteredProblems.length) );
  const problem = filteredProblems[idx];

  // slots + tokens states
  const [slots, setSlots] = useState([]);
  // what tokens the player has placed in the slots
  const [playerSlots, setPlayerSlots] = useState([]);

  const [tokens, setTokens] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [prepareSkip, setPrepareSkip] = useState(false);


  useEffect(() => { // board reset 
    setSlots(Array(problem.tokens.length).fill(""));
    setTokens(shuffle(problem.tokens));

    setPlayerSlots(Array(problem.tokens.length).fill(null));

    setPrepareSkip(false);
    setShowAnswer(false);
  }, [idx, problem.tokens]);

  // skip problem -> next problem states
  const [revealed, setRevealed] = useState(false);

  const handleDrop = (e, idx) => { 
    e.preventDefault();

    const token = e.dataTransfer.getData('text/plain');
    const sourceSlotTok = e.dataTransfer.getData('source-slot');
    const sourceIdx = sourceSlotTok === "" ? null : Number(sourceSlotStr);

    if (!token) return; // prevent duplicates
    if (slots[idx]) return;

    


    // token placement
    setSlots(s => s.map((c, i) => i === idx ? token : c));
    // token removal after being placed
    setTokens(t => t.filter(x => x !== token));
    // check if token is correct/wrong
    setPlayerSlots(playerSlots => 
      playerSlots.map((state, i) => {
        if (i != idx) return state;
        return token === problem.tokens[idx] ? 'Correct' : 'Incorrect';
      })
    )
  }

  const handleDragOver = e => e.preventDefault();

  const signalSkipProblem = () => { // lets user see answer before confirming to fetch next problem
    setPrepareSkip(true);
    setShowAnswer(true);
  }

  const skipProblem = () => { // handles logic for switching problems (indices, tokens, reveals)
    let next_idx;
    do {
      next_idx = Math.floor(Math.random()*filteredProblems.length);
    } while (next_idx === idx && filteredProblems.length > 1);

    setIdx(next_idx);
    //loadProblem(filteredProblems[next_idx]);
    //setSlots(Array(filteredProblems[next_idx].tokens.length).fill(""));
    //setTokens([...filteredProblems[next_idx].tokens]);
    //setPrepareSkip(false);
    //setShowAnswer(false);
    //setRevealed(false);
  };

  return (
    <div className="p-3 bg-gray-100 font-mono rounded">
      <TitleCard title={problem.title} isLatex={true}/>
      {prepareSkip 
        ? <CardGrid cards={problem.tokens}/>
        : <div
            className="grid gap-6 mb-1 p-8 font-mono rounded border border-gray-400"
            style={{ gridTemplateColumns: `repeat(auto-fit, minmax(80px, 1fr))`}}
          >
            {
              slots.map((token, i) => (
                <div 
                    key={i}
                    onDrop={e => handleDrop(e, i)}
                    onDragOver={handleDragOver}
                    className=
                    {`grid content-center gap-2 p-6 rounded mb-1
                      ${playerSlots[i] === 'Correct' ? 'border-2 border-green-400' : ''}
                      ${playerSlots[i] === 'Incorrect' ? 'border-2 border-red-400' : ''}
                      ${!playerSlots[i] ? 'border border-gray-500' : ''}
                    `}
                >
                  {token && (
                    <TokenCard
                      draggable
                      onDragStart={
                        e => {
                          e.dataTransfer.setData('text/plain', token);
                          e.dataTransfer.setData('source-slot', String(i));
                        }
                      }
                    >
                      {token}
                    </TokenCard>
                    )
                  }
                </div>
              ))
            }
          </div>
      }

      <div className="rounded p-3 flex flex-row justify-center">
        <GenericLink to="/gameCategories" text="Restart"/>

        {prepareSkip 
          ? <GenericButton onClick={skipProblem} text="Next Problem"/>
          : (filteredProblems.length > 1) && (
            <GenericButton onClick={signalSkipProblem} text="Skip Problem"/>
            ) 
        }
        <GenericLink to="/" text="End Game"/>
      </div>
      <div className="text-xl mb-2 align-center"> {prepareSkip ? 'Answer' : 'Tokens'} </div>

      <div 
        className="bg-white rounded shadow p-4 grid gap-2"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))' }}
      >
        {!prepareSkip && 
          (
              <div 
                className="bg-white rounded shadow p-4 grid gap-2"
                style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))' }}
              >
                {tokens.map((token, i) => (
                  token && (
                    <TokenCard
                      key={i}
                      draggable
                      onDragStart={e => {e.dataTransfer.setData('text/plain', token)}}
                      className='cursor-move font-mono'
                    >
                      {token}
                    </TokenCard>
                  )
                ))}
              </div>
          )}
      </div>

      {!prepareSkip && (
        <div className={`p-3 w-3xs text-3l bg-white shadow hover:bg-gray-100 transition ${showAnswer ? 'border border-green-500' : ''}`}>
          <button className={'w-3xs'} onClick={() => setShowAnswer(s => !s)}> {showAnswer ? 'Hide' : 'Show'} Answer </button>
        </div>
      )}
      {showAnswer && <MathDisplay latex={problem.latex}/>} 
      </div>
  )
}

export default GameScreen;