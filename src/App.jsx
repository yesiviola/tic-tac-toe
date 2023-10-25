import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Square } from './components/Square.jsx';
import { TURNS, WINNER_COMBOS } from './components/constants.js';
import './index.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null);

  const checkWinner = (boardToCheck) => {
    for (let combo of WINNER_COMBOS) {
      let [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    return null;
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(''));
    setTurn(TURNS.X);
    setWinner(null);
  };

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== '');
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    setTurn(newTurn);
   window.localStorage.setItem('board', JSON.stringify(newBoard))
   window.localStorage.setItem('turn',newTurn)
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button className="button-reset" onClick={resetBoard}>
        Empezar de nuevo
      </button>
      <section className="game">
        {board.map((value, index) => (
          <Square
            key={index}
            index={index}
            isSelected={value === TURNS.X || value === TURNS.O}
            updateBoard={() => updateBoard(index)}
          >
            {value}
          </Square>
        ))}
      </section>
      <div className="status">
        {winner ? (
          winner === 'draw' ? (
            <p>Empate!</p>
          ) : (
            <p>{`Ganador: ${winner}`}</p>
          )
        ) : (
          <p>{`Turno de ${turn}`}</p>
        )}
      </div>
    </main>
  );
}

export default App;

    


