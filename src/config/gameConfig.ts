/**
 * Game configuration settings
 * Modify these values to customize the game behavior
 */

export const GAME_CONFIG = {
  // Number of rounds per game
  ROUNDS_PER_GAME: 10,
  
  // Number of high scores to store
  MAX_HIGH_SCORES: 5,
  
  // Blur intensity for blur mode (in pixels)
  BLUR_INTENSITY: '13px',
  
  // Scale factor for crop mode
  CROP_SCALE_FACTOR: 3.5,
  
  // Available crop positions for crop mode
  CROP_POSITIONS: [
    '0% 0%', '50% 0%', '100% 0%',
    '0% 50%', '50% 50%', '100% 50%',
    '0% 100%', '50% 100%', '100% 100%',
    '25% 25%', '75% 25%', '25% 75%', '75% 75%'
  ],
  
  // Score messages based on percentage
  SCORE_MESSAGES: {
    90: "Vay be! Sen bir çizgi film dehası mısın? 🧠⭐",
    80: "Süper! Gözlerin lazer gibi! 👀🔥", 
    70: "Bravo! Çok iyisin! 👏🎉",
    60: "İyi! Fena değil! 😊👍",
    50: "Eh işte... Ortalama! 🤷‍♂️",
    0: "Ooops! Gözlük lazım galiba! 👓😅"
  },
  
  // localStorage key for high scores
  HIGH_SCORES_KEY: 'cartoon-character-guesser-scores'
} as const;
