import { useState, useCallback } from 'react';
import { BoardState, GameState, Player, WinState } from '../types';

const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

const INITIAL_BOARD: BoardState = Array(9).fill(null);

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: INITIAL_BOARD,
    currentPlayer: Player.X,
    winState: { winner: null, line: null, isDraw: false },
    history: [INITIAL_BOARD],
    currentStep: 0,
  });

  const checkWin = useCallback((board: BoardState): WinState => {
    for (const line of WINNING_LINES) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], line, isDraw: false };
      }
    }
    if (!board.includes(null)) {
      return { winner: null, line: null, isDraw: true };
    }
    return { winner: null, line: null, isDraw: false };
  }, []);

  const makeMove = useCallback((index: number) => {
    setGameState(prev => {
      // Validate move
      if (prev.board[index] || prev.winState.winner || prev.winState.isDraw) return prev;

      const newBoard = [...prev.board];
      newBoard[index] = prev.currentPlayer;

      const newWinState = checkWin(newBoard);
      const newHistory = prev.history.slice(0, prev.currentStep + 1);
      
      return {
        board: newBoard,
        currentPlayer: prev.currentPlayer === Player.X ? Player.O : Player.X,
        winState: newWinState,
        history: [...newHistory, newBoard],
        currentStep: newHistory.length,
      };
    });
  }, [checkWin]);

  const resetGame = useCallback(() => {
    setGameState({
      board: INITIAL_BOARD,
      currentPlayer: Player.X,
      winState: { winner: null, line: null, isDraw: false },
      history: [INITIAL_BOARD],
      currentStep: 0,
    });
  }, []);

  return {
    gameState,
    makeMove,
    resetGame,
  };
};