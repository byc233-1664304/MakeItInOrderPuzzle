import React from 'react';

const PuzzleCell = ({ value, onClick }) => {
    return (
        <div id='cell' onClick={onClick}>{value}</div>
    );
};

export default PuzzleCell;