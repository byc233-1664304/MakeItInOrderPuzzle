import React, { useState, useEffect } from 'react';
import PuzzleGrid from './PuzzleGrid.jsx';

import './App.css';

const getInitialGrid = () => {
  const cells = Array.from({ length: 16 }, (_, i) => i );
  
  // shuffle array with Fisher-Yates shuffle
  for(let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }

  return Array.from({ length: 4 }, (_, i) => cells.slice(i * 4, i * 4 + 4));
}

function App() {
  const [grid, setGrid] = useState(getInitialGrid());

  const won = (currentGrid) => {
    const cells = currentGrid.flat().filter(val => val !== 0 );
    for(let i = 0; i < 15; i++) {
      if(cells[i] !== i + 1) {
        return false;
      }
    }

    return true;
  }

  const findEmpty = (currentGrid) => {
    if(currentGrid === null || currentGrid.length == 0) {
      return [];
    }

    for(let row = 0; row < currentGrid.length; row++) {
      for (let col = 0; col < currentGrid[0].length; col++) {
        if(currentGrid[row][col] == 0) {
          return [row, col];
        }
      }
    }

    return [];
  }

  const isAdjacent = (emptyCell, row, col) => {
    return (Math.abs(emptyCell[0] - row) + Math.abs(emptyCell[1] - col) === 1);
  }

  const handleCellClick = (row, col) => {
    const currentGrid = grid.map(row => [...row]);
    const emptyCell = findEmpty(currentGrid);
    if(isAdjacent(emptyCell, row, col)) {
      // swap
      [currentGrid[emptyCell[0]][emptyCell[1]], currentGrid[row][col]] = [currentGrid[row][col], currentGrid[emptyCell[0]][emptyCell[1]]];
      setGrid(currentGrid);
    }
  }

  useEffect(() => {
    if(won(grid)){
      alert('Congrats!!');
    }
  }, [grid]);

  return (
    <div>
      <div id='app'>
        <h1>Make It In Order Puzzle</h1>
        <PuzzleGrid grid={grid} onCellClick={handleCellClick}/>
      </div>

      <div id="rules">
        <h2>Rules: </h2>
        <p>
          There is a 4*4 grid that has the numbers 1-15 and one empty cell. 
          Clicking any cell adjacent to the empty cell will swap them. 
          If you click on the empty cell, nothing happens. 
          The game is won when all the values in the grid are in order 
          (the empty cell can be anywhere).
        </p>
      </div>
    </div>
  )
}

export default App;
