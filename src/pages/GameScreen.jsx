import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fisherYatesWIKI } from '../js/arrayUtils';
import { problems } from '../js/prep2';
import { handleTimeLimit } from '../js/gameUtils';

import TokenCard from "../components/TokenCard";
import CardGrid from "../components/CardGrid";
import TitleCard from '../components/TitleCard';
import MathDisplay from '../components/MathDisplay';
import GenericLink from '../components/GenericLink';
import GenericButton from '../components/GenericButton';
import TimeCard from '../components/TimeCard';
import CorrectCard from '../components/CorrectCard';
import StreakDisplay from '../components/StreakDisplay';

const shuffle = arr => {
  const a = [...arr];
  fisherYatesWIKI(a);
  return a;
}

function GameScreen() {
  const { state } = useLocation();
  // check if all, or selected few
  const selected = state?.selectedCategories ?? ['all']
  const isTimeUp = state?.timeLimit ?? 0

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

  const [numberCorrect, setNumberCorrect] = useState(0);
  const [countCorrectTokens, setCountCorrectTokens] = useState(0);

  useEffect(() => { // board reset 
    setSlots(Array(problem.tokens.length).fill(""));
    setTokens(shuffle(problem.tokens));

    setCountCorrectTokens(0);

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
    const sourceIdx = sourceSlotTok !== "" ? Number(sourceSlotTok): null;

    if (!token) return; // prevent duplicates
    if (slots[idx]) return;

    if (sourceIdx !== null && !isNaN(sourceIdx)) {
      setSlots(slots => { // handles drag & drop for tokens already in a slot (not the token bar)
        const s = [...slots]; // 
        s[sourceIdx] = "";
        s[idx] = token;
        return s;
      });
      setPlayerSlots(playerSlots => {
        const p = [...playerSlots];
        //p[idx] = p[sourceIdx];
        p[idx] = (token === problem.tokens[idx]) // highlights the next token placement green or red
          ? 'Correct'
          : 'Incorrect'
        p[sourceIdx] = null;
        return p;
      })
    } else {
      // token placement
      setSlots(s => s.map((c, i) => i === idx ? token : c));
      // token removal after being placed
      setTokens(t => t.filter(x => x !== token));

      // check if token is correct/wrong
      setPlayerSlots(playerSlots => 
        playerSlots.map((state, i) => 
          i === idx ? (token === problem.tokens[idx] ? 'Correct' : 'Incorrect') : state
      ));
    }

    setCountCorrectTokens(prevCount => { // how many tokens are currently in their correct place
      const newCount = prevCount + (token === problem.tokens[idx] ? 1 : 0); 
      if (newCount === problem.tokens.length) {
        signalSkipProblem();
        setNumberCorrect(n => n + 1);
      }

      return newCount;
    })
  }

  const handleDragOver = e => e.preventDefault();

  const signalSkipProblem = useCallback(() => { // lets user see answer before confirming to fetch next problem
    setPrepareSkip(true);
    setShowAnswer(true);
  }, [])

  const skipProblem = () => { // handles logic for switching problems (indices, tokens, reveals)
    let next_idx;
    do { // sample random index from current problem subset
      next_idx = Math.floor(Math.random()*filteredProblems.length);
    } while (next_idx === idx && filteredProblems.length > 1);

    setIdx(next_idx);
  };

  return (
    <div className="p-3 bg-gray-100 font-mono rounded">

      <TitleCard title={problem.title} isLatex={true}/>

      {prepareSkip // contains the correctly placed tokens or the usual empty slots
        ? <CardGrid cards={problem.tokens}/>
        : <div
            className="grid gap-6 mb-1 p-3 font-mono rounded border border-gray-400"
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
      
      <div className="text-xl mb-2 align-center"> {prepareSkip ? 'Answer' : 'Tokens'} </div> 

      <div 
        className="bg-white rounded shadow p-4 grid gap-2"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))' }}
      >
        {!prepareSkip &&  // 
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

      <div className="rounded p-7 flex flex-row justify-center">
        <CorrectCard
          numberCorrect={numberCorrect}
        />

        <GenericLink to="/gameCategories" text="Restart"/>

        {prepareSkip 
          ? <GenericButton onClick={skipProblem} text="Next Problem"/>
          : (filteredProblems.length > 1) && (
            <GenericButton onClick={signalSkipProblem} text="Skip Problem"/>
            ) 
        }
        <GenericLink to="/" text="End Game"/>

        <TimeCard
          isTimeStart={!prepareSkip}
          timeLimit={handleTimeLimit(problem.tokens.length)}
          onTimeout={signalSkipProblem}
        />
      </div>

      </div>
  )
}

export default GameScreen;