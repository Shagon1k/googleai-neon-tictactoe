import React from 'react';
import { Player } from '../types';

interface SquareProps {
  value: Player | null;
  onClick: () => void;
  isWinningSquare: boolean;
  disabled: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, isWinningSquare, disabled }) => {
  return (
    <button
      className={`
        relative flex items-center justify-center text-4xl md:text-6xl font-display font-bold
        h-20 w-20 md:h-28 md:w-28
        border-2 border-slate-800 rounded-lg
        transition-all duration-300
        ${!value && !disabled ? 'hover:bg-slate-900 hover:border-slate-600 cursor-pointer' : ''}
        ${isWinningSquare ? 'bg-slate-900 border-white shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'bg-black/40'}
        ${disabled ? 'cursor-default' : ''}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      {value === Player.X && (
        <span className="text-cyan-400 neon-text-blue animate-[ping_0.2s_ease-out_reverse]">
          X
        </span>
      )}
      {value === Player.O && (
        <span className="text-pink-500 neon-text-pink animate-[ping_0.2s_ease-out_reverse]">
          O
        </span>
      )}
    </button>
  );
};

export default Square;