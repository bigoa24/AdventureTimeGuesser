import React, { useEffect, useRef } from 'react';
import { getHighScores } from '../utils/localStorage';

interface GameCompleteProps {
  score: number;
  totalRounds: number;
  showNewHighScore: boolean;
  onPlayAgain: () => void;
}

const GameComplete: React.FC<GameCompleteProps> = ({
  score,
  totalRounds,
  showNewHighScore,
  onPlayAgain
}) => {
  const endingAudioRef = useRef<HTMLAudioElement>(null);
  const highScores = getHighScores();
  const percentage = Math.round((score / totalRounds) * 100);

  useEffect(() => {
    // Bitiş müziği çal
    if (endingAudioRef.current) {
      endingAudioRef.current.volume = 0.6;
      endingAudioRef.current.play().catch(console.error);
    }

    // Cleanup - component unmount olduğunda müziği durdur
    return () => {
      if (endingAudioRef.current) {
        endingAudioRef.current.pause();
        endingAudioRef.current.currentTime = 0;
      }
    };
  }, []);
  


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-400 to-emerald-400 p-4">
      {/* Bitiş müziği */}
      <audio ref={endingAudioRef} preload="auto">
        <source src="/audio/03. Ending.mp3" type="audio/mpeg" />
      </audio>
      
      <div className="bg-white/95 backdrop-blur-sm rounded-lg p-8 shadow-xl max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          🎭 Oyun Bitti!
        </h1>
        
        {showNewHighScore && (
          <div className="bg-yellow-100 border-yellow-500 text-yellow-700 p-3 rounded-lg mb-4">
            <div className="text-2xl">🏆</div>
            <div className="font-bold">Yeni Rekor!</div>
          </div>
        )}
        
        <div className="bg-yellow-400 text-gray-800 rounded-lg p-4 mb-6">
          <div className="text-3xl font-bold">{score}/{totalRounds}</div>
          <div className="text-lg">%{percentage} Doğru</div>
        </div>
        
        {highScores.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-gray-800 mb-2">🏆 En Yüksek Skorlar</h3>
            <div className="space-y-1">
              {highScores.map((highScore, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>#{index + 1}</span>
                  <span>{highScore.score}/{highScore.totalRounds}</span>
                  <span>%{Math.round((highScore.score / highScore.totalRounds) * 100)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <button
          onClick={onPlayAgain}
          className="game-button text-xl px-8 py-4 w-full"
          autoFocus
          aria-label="Yeni oyun başlat"
        >
          Tekrar Oyna! 🎮
        </button>
        
        <div className="mt-4 text-sm text-gray-600">
          <p>Bilgehandan Sevgilerle 💝</p>
        </div>
      </div>
    </div>
  );
};

export default GameComplete;
