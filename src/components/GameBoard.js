import React, { useState, useEffect } from 'react';
import gameService from '../services/gameService';

const TicTacToe = () => {
  const [game, setGame] = useState(null);
  const [playerX, setPlayerX] = useState('');
  const [playerO, setPlayerO] = useState('');
  const [message, setMessage] = useState('');

  const startNewGame = async () => {
    try {
      const response = await gameService.startNewGame(playerX, playerO);
      setGame(response.data);
      setMessage('');
    } catch (error) {
      console.error("Failed to start a new game:", error);
      setMessage('Failed to start a new game');
    }
  };

  useEffect(() => {
    if (playerX && playerO) {
      startNewGame();
    }
  }, [playerX, playerO]);

  const handleClick = async (index) => {
    if (game.board[index] || game.status !== 'IN_PROGRESS') {
      return;
    }
    try {
      const response = await gameService.makeMove(game.id, index);
      setGame(response.data);
      if (response.data.status !== 'IN_PROGRESS') {
        setMessage(`Game Over: ${response.data.status}`);
      }
    } catch (error) {
      console.error("Failed to make a move:", error);
      setMessage('Failed to make a move');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Tic Tac Toe</h1>
      <div>
        <input
          type="text"
          placeholder="Player X"
          value={playerX}
          onChange={(e) => setPlayerX(e.target.value)}
          style={{ margin: '0.5rem' }}
        />
        <input
          type="text"
          placeholder="Player O"
          value={playerO}
          onChange={(e) => setPlayerO(e.target.value)}
          style={{ margin: '0.5rem' }}
        />
        <button onClick={startNewGame} style={{ margin: '0.5rem' }}>Start New Game</button>
      </div>
      {message && <p>{message}</p>}
      {game && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 100px)', justifyContent: 'center', margin: '1rem auto' }}>
          {game.board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              style={{ width: '100px', height: '100px', fontSize: '24px', cursor: 'pointer', margin: '0.1rem', backgroundColor: cell ? '#ddd' : '#fff' }}
              disabled={!!cell || game.status !== 'IN_PROGRESS'}
            >
              {cell}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
