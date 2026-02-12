import React from 'react';
import { useGameLogic } from './hooks/useGameLogic';
import Square from './components/Square';
import GameControls from './components/GameControls';
import { Player } from './types';

const App: React.FC = () => {
  const { gameState, makeMove, resetGame } = useGameLogic();
  const { board, currentPlayer, winState } = gameState;

  // Visual status text
  const getStatusText = () => {
    if (winState.winner) return `WINNER: PLAYER ${winState.winner}`;
    if (winState.isDraw) return "SYSTEM DEADLOCK (DRAW)";
    return `PLAYER ${currentPlayer} TURN`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Grid Decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none" 
           style={{
             backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.9), rgba(0, 0, 0, 0.95)), repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(6, 182, 212, 0.05) 50px), repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(6, 182, 212, 0.05) 50px)',
             backgroundSize: '100% 100%, 50px 50px, 50px 50px'
           }} 
      />
      
      {/* Title */}
      <header className="mb-8 z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-pink-500 neon-text-blue animate-flicker">
          NEON GRID
        </h1>
        <p className="text-slate-400 tracking-[0.3em] text-xs md:text-sm mt-2 font-bold uppercase">
          Local Multiplayer System
        </p>
      </header>

      {/* Game Status Indicator */}
      <div className={`
        mb-6 px-6 py-2 rounded-full border 
        font-display font-bold text-xl tracking-wider z-10
        transition-all duration-300
        ${winState.winner === Player.X ? 'bg-cyan-900/50 border-cyan-500 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.3)]' : ''}
        ${winState.winner === Player.O ? 'bg-pink-900/50 border-pink-500 text-pink-300 shadow-[0_0_20px_rgba(236,72,153,0.3)]' : ''}
        ${!winState.winner && !winState.isDraw ? 'bg-slate-900/50 border-slate-700 text-slate-300' : ''}
        ${winState.isDraw ? 'bg-yellow-900/30 border-yellow-600 text-yellow-500' : ''}
      `}>
        {getStatusText()}
      </div>

      {/* The Board */}
      <div className="grid grid-cols-3 gap-3 p-4 bg-slate-900/50 rounded-2xl border border-slate-800 backdrop-blur-md shadow-2xl z-10">
        {board.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={() => makeMove(index)}
            isWinningSquare={!!winState.line?.includes(index)}
            disabled={!!value || !!winState.winner || winState.isDraw}
          />
        ))}
      </div>

      {/* Controls */}
      <GameControls 
        onReset={resetGame} 
      />

      {/* Footer Info */}
      <div className="mt-8 text-slate-600 text-xs text-center max-w-xs z-10">
        <p>Supports 2 simultaneous users in one session (Local Multiplayer)</p>
      </div>

    </div>
  );
};

export default App;