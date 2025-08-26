import { GAME_CONFIG } from '../config/gameConfig';

export interface HighScore {
  score: number;
  date: string;
  totalRounds: number;
}

const HIGH_SCORES_KEY = GAME_CONFIG.HIGH_SCORES_KEY;
const MAX_SCORES = GAME_CONFIG.MAX_HIGH_SCORES;

/**
 * Gets high scores from localStorage
 */
export function getHighScores(): HighScore[] {
  try {
    const scores = localStorage.getItem(HIGH_SCORES_KEY);
    return scores ? JSON.parse(scores) : [];
  } catch (error) {
    console.error('Error reading high scores:', error);
    return [];
  }
}

/**
 * Saves a new score to localStorage
 */
export function saveScore(score: number, totalRounds: number): HighScore[] {
  try {
    const existingScores = getHighScores();
    const newScore: HighScore = {
      score,
      date: new Date().toISOString(),
      totalRounds
    };
    
    const updatedScores = [...existingScores, newScore]
      .sort((a, b) => b.score - a.score) // Sort by score descending
      .slice(0, MAX_SCORES); // Keep only top 5
    
    localStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(updatedScores));
    return updatedScores;
  } catch (error) {
    console.error('Error saving score:', error);
    return getHighScores();
  }
}

/**
 * Checks if a score qualifies as a high score
 */
export function isHighScore(score: number): boolean {
  const scores = getHighScores();
  return scores.length < MAX_SCORES || score > Math.min(...scores.map(s => s.score));
}
