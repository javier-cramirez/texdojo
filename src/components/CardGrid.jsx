import React from 'react';
import TokenCard from './TokenCard';

function CardGrid({ cards, onDrop, onDragOver }) {
    return (
        <div
            className="grid gap-3 p-3 mb-6 font-mono rounded border border-gray-300"
            style={{ gridTemplateColumns: `repeat(auto-fit, minmax(80px, 1fr))`}}
        >
            {cards.map((card, i) => (
                <div 
                    key={i}
                    onDrop={e => onDrop(e, i)}
                    onDragOver={onDragOver}
                >
                    <TokenCard>
                        {card || <span className="text-gray-400">&nbsp;</span>}
                    </TokenCard>
                </div>
            ))}
        </div>
    );
}

export default CardGrid;