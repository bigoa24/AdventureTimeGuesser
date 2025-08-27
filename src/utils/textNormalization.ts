/**
 * Normalizes text for comparison by removing case, spaces, and Turkish accents
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '') // Remove all spaces
    .replace(/ı/g, 'i')
    .replace(/ş/g, 's')
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/İ/g, 'i')
    .replace(/Ş/g, 's')
    .replace(/Ç/g, 'c')
    .replace(/Ğ/g, 'g')
    .replace(/Ö/g, 'o')
    .replace(/Ü/g, 'u')
    .trim();
}

/**
 * Checks if a guess matches a character name or any of its aliases
 */
export function isGuessCorrect(guess: string, correctName: string, aliases?: string[]): boolean {
  const normalizedGuess = normalizeText(guess);
  const normalizedCorrectName = normalizeText(correctName);
  
  // Check main name
  if (normalizedGuess === normalizedCorrectName) {
    return true;
  }
  
  // Check aliases
  if (aliases) {
    return aliases.some(alias => normalizeText(alias) === normalizedGuess);
  }
  
  return false;
}




