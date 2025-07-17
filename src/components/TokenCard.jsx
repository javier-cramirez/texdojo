import React from 'react';

function TokenCard({ children, draggable = false, onDragStart, onClick, className=''}) {
    return (
        <div
            className={`p-3 m-2 rounded shadow text-center border border-black-100 break-words flex-auto ${className}`}
            draggable={draggable}
            onDragStart={onDragStart}
            onClick={onClick}
        >
            {children}
        </div>
    )
}

export default TokenCard;