import React from 'react';

interface GameControlsProps {
  onReset: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({ onReset }) => {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md mt-6 z-10">
      <button
        onClick={onReset}
        className="
          w-full py-3 rounded-lg font-display font-bold tracking-widest text-lg
          bg-transparent border border-cyan-500/50 text-cyan-400
          hover:bg-cyan-500/10 hover:border-cyan-400 hover:text-cyan-200 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]
          transition-all duration-300 active:scale-95
        "
      >
        RESET SYSTEM
      </button>
    </div>
  );
};

export default GameControls;