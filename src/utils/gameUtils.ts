import type { Character } from '../data/characters';
import { CHARACTERS } from '../data/characters';
import { GAME_CONFIG } from '../config/gameConfig';

export interface GameRound {
  character: Character;
}

export interface GameState {
  rounds: GameRound[];
  currentRoundIndex: number;
  score: number;
  isGameComplete: boolean;
  hasAnswered: boolean;
  lastGuessCorrect: boolean | null;
}

/**
 * Shuffles an array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Creates a new game with ordered characters (normal first, then scary)
 */
export function createNewGame(): GameState {
  // Normal karakterleri ayır (ilk 6)
  const normalCharacters = CHARACTERS.filter(char => 
    !char.id.includes('cursed') && 
    !char.id.includes('scary') && 
    !char.id.includes('dark') &&
    !char.name.toLowerCase().includes('cursed')
  );
  
  // Korkunç karakterleri ayır (7. rounddan itibaren)
  const scaryCharacters = CHARACTERS.filter(char => 
    char.id.includes('cursed') || 
    char.id.includes('scary') || 
    char.id.includes('dark') ||
    char.name.toLowerCase().includes('cursed')
  );
  
  // İlk 6 round için normal karakterlerden rastgele seç
  const shuffledNormal = shuffleArray(normalCharacters);
  const selectedNormal = shuffledNormal.slice(0, 6);
  
  // 7. rounddan itibaren korkunç karakterlerden rastgele seç
  const shuffledScary = shuffleArray(scaryCharacters);
  const scaryRoundsNeeded = GAME_CONFIG.ROUNDS_PER_GAME - 6;
  const selectedScary = shuffledScary.slice(0, scaryRoundsNeeded);
  
  // Tüm karakterleri birleştir (normal + korkunç)
  const allSelectedCharacters = [...selectedNormal, ...selectedScary];
  
  const rounds: GameRound[] = allSelectedCharacters.map(character => {
    return {
      character
    };
  });
  
  return {
    rounds,
    currentRoundIndex: 0,
    score: 0,
    isGameComplete: false,
    hasAnswered: false,
    lastGuessCorrect: null
  };
}

/**
 * Processes a guess and updates game state
 */
export function processGuess(gameState: GameState, isCorrect: boolean, isDarkMode: boolean = false): GameState {
  // Korkunç temada doğru cevap verince blur açılsın, yanlışsa direkt geç
  if (isDarkMode) {
    if (isCorrect) {
      // Doğru cevap: blur açılsın, 2-3 saniye bekle
      return {
        ...gameState,
        score: gameState.score + 1,
        hasAnswered: true,
        lastGuessCorrect: true
      };
    } else {
      // Yanlış cevap: direkt sonraki karaktere geç
      const nextRoundIndex = gameState.currentRoundIndex + 1;
      const isGameComplete = nextRoundIndex >= gameState.rounds.length;
      
      return {
        ...gameState,
        currentRoundIndex: nextRoundIndex,
        isGameComplete,
        hasAnswered: false,
        lastGuessCorrect: null
      };
    }
  }
  
  // Normal temada feedback göster
  return {
    ...gameState,
    score: isCorrect ? gameState.score + 1 : gameState.score,
    hasAnswered: true,
    lastGuessCorrect: isCorrect
  };
}

/**
 * Moves to the next round or completes the game
 */
export function nextRound(gameState: GameState): GameState {
  const nextRoundIndex = gameState.currentRoundIndex + 1;
  const isGameComplete = nextRoundIndex >= gameState.rounds.length;
  
  return {
    ...gameState,
    currentRoundIndex: nextRoundIndex,
    isGameComplete,
    hasAnswered: false,
    lastGuessCorrect: null
  };
}

/**
 * Skips the current round without affecting score
 */
export function skipRound(gameState: GameState, isDarkMode: boolean = false): GameState {
  if (isDarkMode) {
    // Korkunç temada skip yaparken resmi aç ve bekle
    return {
      ...gameState,
      hasAnswered: true,
      lastGuessCorrect: false
    };
  }
  
  // Normal temada direkt sonraki round'a geç
  return nextRound({
    ...gameState,
    hasAnswered: true,
    lastGuessCorrect: false
  });
}
