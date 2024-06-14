import React from 'react';
import PuzzleCell from './PuzzleCell.jsx';

const PuzzleGrid = ({ grid, onCellClick }) => {
    return (
        <div id='grid'>
            {
                grid.map((row, rowIndex) => (
                    row.map((cell, colIndex) => (
                        <PuzzleCell
                            key={cell}
                            value={cell === 0 ? '' : cell}
                            onClick={() => {onCellClick(rowIndex, colIndex)}}
                        />
                    ))
                ))
            }
        </div>
    );
};

export default PuzzleGrid;