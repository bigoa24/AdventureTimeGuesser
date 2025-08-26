import React from 'react';
import type { Character } from '../data/characters';
import { GAME_CONFIG } from '../config/gameConfig';

interface ImageDisplayProps {
  character: Character;
  revealed: boolean;
  isDarkMode?: boolean;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({
  character,
  revealed,
  isDarkMode
}) => {
  const getImageStyle = () => {
    if (revealed) {
      return {};
    }

    // Sadece blur modu
    return {
      filter: `blur(${GAME_CONFIG.BLUR_INTENSITY})`
    };
  };

  if (isDarkMode) {
    // Korkunç tema: Sadece resim, hiçbir yazı yok
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden border-2 border-red-900">
          <img
            src={character.image}
            alt={revealed ? character.name : "Mystery character"}
            className={`w-full h-full object-cover ${revealed ? 'transition-all duration-500' : ''}`}
            style={getImageStyle()}
            onError={(e) => {
              // Fallback for missing images
              const target = e.target as HTMLImageElement;
              target.src = `https://via.placeholder.com/400x225/000000/FF0000?text=${encodeURIComponent(character.name)}`;
            }}
          />
        </div>
      </div>
    );
  }

  // Normal tema
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="px-3 py-1 rounded-full text-sm font-semibold bg-purple-200 text-purple-800">
          🌀 BLUR
        </div>
        {revealed && (
          <div className="text-green-600 font-semibold text-sm">
            ✨ Açıldı!
          </div>
        )}
      </div>
      
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={character.image}
          alt={revealed ? character.name : "Mystery character"}
          className={`w-full h-full object-cover ${revealed ? 'transition-all duration-500' : ''}`}
          style={getImageStyle()}
          onError={(e) => {
            // Fallback for missing images
            const target = e.target as HTMLImageElement;
            target.src = `https://via.placeholder.com/400x225/4FC3F7/FFFFFF?text=${encodeURIComponent(character.name)}`;
          }}
        />
      </div>
    </div>
  );
};

export default ImageDisplay;
