// src/services/gameService.js

import axios from 'axios';

const API_URL = 'http://localhost:8080/api/game';

const startNewGame = (playerXId, playerOId) => {
  return axios.post(`${API_URL}/start`, null, {
    params: {
      playerXId,
      playerOId,
    },
  });
};

const makeMove = (gameId, index) => {
  return axios.post(`${API_URL}/move`, null, {
    params: {
      gameId,
      index,
    },
  });
};

const gameService = {
  startNewGame,
  makeMove,
};

export default gameService;
