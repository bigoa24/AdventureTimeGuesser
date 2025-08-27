import React, { useRef, useEffect } from 'react';

interface GuessInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onSkip: () => void;
  disabled: boolean;
  isDarkMode?: boolean;
}

const GuessInput: React.FC<GuessInputProps> = ({
  value,
  onChange,
  onSubmit,
  onSkip,
  disabled,
  isDarkMode
}) => {
  // Rastgele komik ipuçları
  const funnyTips = [
    "💡 İpucu: Gözlerini kıs, belki daha iyi görürsün! 👀",
    "🤔 Düşün bakalım... Kim olabilir bu? 🧠",
    "🎭 Hangi çizgi filmden olabilir acaba? 📺",
    "⚡ Hızlı ol! Zamanın var! ⏰",
    "🔍 Detayları incele! İpuçları var! 🕵️",
    "🎯 Tahmin et bakalım! Şansını dene! 🍀",
    "🌟 Sen yapabilirsin! İnanıyorum sana! 💪",
    "🎪 Eğlenceli bir karakter bu! Kim olabilir? 😄"
  ];

  const getRandomTip = () => {
    return funnyTips[Math.floor(Math.random() * funnyTips.length)];
  };
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input when component mounts or becomes enabled
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !disabled && value.trim()) {
      onSubmit();
    }
  };

  if (isDarkMode) {
    // Korkunç tema: Sadece input kutusu, hiçbir yazı yok
    return (
      <div className="w-full max-w-md">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="..."
          className="w-full px-6 py-4 bg-gray-900 border-2 border-red-900 rounded-lg focus:border-red-500 focus:outline-none text-white text-xl text-center placeholder-gray-500"
          disabled={disabled}
          aria-label="Character name guess"
        />
        
        <div className="flex gap-4 mt-4">
          <button
            onClick={onSubmit}
            disabled={disabled || !value.trim()}
            className="flex-1 bg-red-900 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Submit guess"
          >
            ?
          </button>
          
          <button
            onClick={onSkip}
            disabled={disabled}
            className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Skip this round"
          >
            X
          </button>
        </div>
      </div>
    );
  }

  // Normal tema
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        Who is this character?
      </h2>
      
      <div className="space-y-4">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter character name..."
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-sky-400 focus:outline-none text-lg"
          disabled={disabled}
          aria-label="Character name guess"
        />
        
        <div className="flex gap-3 flex-col sm:flex-row">
          <button
            onClick={onSubmit}
            disabled={disabled || !value.trim()}
            className="game-button flex-1 text-lg py-3"
            aria-label="Submit guess"
          >
            Submit Guess 🎯
          </button>
          
          <button
            onClick={onSkip}
            disabled={disabled}
            className="game-button-secondary flex-1 text-lg py-3"
            aria-label="Skip this round"
          >
            Skip Round ⏭️
          </button>
        </div>
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-600">
        <p>{getRandomTip()}</p>
      </div>
    </div>
  );
};

export default GuessInput;
