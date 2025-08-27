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
  
  // localStorage key for high scores
  HIGH_SCORES_KEY: 'cartoon-character-guesser-scores'
} as const;
