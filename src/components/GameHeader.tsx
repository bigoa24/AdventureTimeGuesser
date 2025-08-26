import React from 'react';

interface GameHeaderProps {
  score: number;
  currentRound: number;
  totalRounds: number;
  isDarkMode?: boolean;
}

const GameHeader: React.FC<GameHeaderProps> = ({ score, currentRound, totalRounds, isDarkMode }) => {
  return (
    <header className={`backdrop-blur-sm rounded-lg p-4 mb-6 shadow-lg transition-all duration-1000 ${
      isDarkMode 
        ? 'bg-red-900/80 border-2 border-red-600' 
        : 'bg-white/90'
    }`}>
      <h1 className={`text-2xl md:text-3xl font-bold text-center mb-2 transition-all duration-1000 ${
        isDarkMode 
          ? 'text-red-100 drop-shadow-lg' 
          : 'text-gray-800'
      }`}>
        {isDarkMode ? '💀 Korkunç Karakter Tahmin Oyunu' : '🎭 Cartoon Character Guesser'}
      </h1>
      <div className="flex justify-between items-center text-sm md:text-base">
        <div className={`px-3 py-1 rounded-full font-semibold transition-all duration-1000 ${
          isDarkMode 
            ? 'bg-red-700 text-red-100 border border-red-500' 
            : 'bg-yellow-400 text-gray-800'
        }`}>
          {isDarkMode ? '🩸' : ''} Score: {score}/{totalRounds}
        </div>
        <div className={`px-3 py-1 rounded-full font-semibold transition-all duration-1000 ${
          isDarkMode 
            ? 'bg-gray-800 text-red-200 border border-red-600' 
            : 'bg-pink-400 text-white'
        }`}>
          {isDarkMode ? '💀' : ''} Round {currentRound}/{totalRounds}
        </div>
      </div>
    </header>
  );
};

export default GameHeader;
