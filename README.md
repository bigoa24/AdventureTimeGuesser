# 🎭 Cartoon Character Guesser

A fun and interactive web game where you guess cartoon characters from various animated shows including Adventure Time, Regular Show, Gumball, and SpongeBob! Features a unique dual-theme experience that transitions from cheerful to spooky as you progress.

## 🎮 Game Features

- **10 Rounds per Game**: Each game has 6 normal rounds + 4 scary rounds
- **Dual Theme Experience**: 
  - 🌈 **Normal Theme** (Rounds 1-6): Bright, colorful cartoon experience with characters from various shows
  - 🌙 **Scary Theme** (Rounds 7-10): Dark, atmospheric horror experience with cursed versions of beloved characters
- **Blur Mode**: Images are blurred until you guess correctly
- **Smart Guessing**: Case-insensitive with support for nicknames and aliases
- **Score Tracking**: Track your high scores locally with localStorage
- **Responsive Design**: Works great on mobile and desktop
- **Accessibility**: Full keyboard support and screen reader friendly
- **Audio Experience**: Dynamic soundtrack that changes with the theme
- **Special Endings**: Multiple ending screens including jumpscare and pink heart finale

## 🎵 Audio Features

- **Atmospheric Audio**: Background music changes based on game phase
- **Sound Effects**: Various audio cues including:
  - Transition beeps when entering scary mode
  - Diabolic laughter during cursed rounds
  - Clock ticking for tension
  - Jumpscare sounds
  - Sparkle effects for positive endings

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd AdventureTimeGuesser
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier

### Tech Stack

- **React 19** - UI library with latest features
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint + Prettier** - Code quality and formatting

## 🎨 Game Flow

### Normal Theme (Rounds 1-6)
1. Bright, colorful cartoon aesthetic
2. Feedback cards show after each guess
3. Relaxed gameplay with helpful tips
4. Characters from Adventure Time, Regular Show, Gumball, etc.

### Scary Theme (Rounds 7-10)
1. Dark background with red accents
2. Atmospheric horror audio
3. No feedback cards - immediate progression
4. Cursed/dark versions of characters
5. 2.5 second delays for tension building

### Special Endings
1. **Final Scary Screen**: Dark screen with mysterious question mark
2. **Sinister Message**: "Attığım link sence güvenli miydi?" 
3. **Pink Heart Screen**: Deceptively cute finale
4. **Jumpscare**: Brief horror moment
5. **Normal Completion**: Regular score screen

## 🏆 Scoring

Your final score is displayed as a fraction (e.g., 7/10) and percentage. High scores are saved locally.

## 📱 Accessibility Features

- Full keyboard navigation support
- Screen reader announcements for game state
- High contrast feedback colors
- Focus management for better UX
- ARIA labels and live regions
- Audio controls and volume management

## 🔧 Configuration

### Game Settings (`src/config/gameConfig.ts`)

```typescript
export const GAME_CONFIG = {
  ROUNDS_PER_GAME: 10,           // Total rounds per game
  BLUR_INTENSITY: '13px',        // Blur effect strength
  MAX_HIGH_SCORES: 5,            // High scores to store
  // ... more settings
};
```

### Adding New Characters

1. Add character image to `public/images/`
2. Add audio files to `public/audio/` (if needed)
3. Update `src/data/characters.ts`:

```typescript
{
  id: "newcharacter",
  name: "New Character Name", 
  aliases: ["Nickname1", "Nickname2"],
  image: "/images/newcharacter.jpg"
}
```

For cursed characters, include "cursed", "scary", or "dark" in the ID.

## 🎨 Styling

The game uses Tailwind CSS with dynamic theming:

### Normal Theme Colors
- Sky blue gradients (`from-sky-400 to-emerald-400`)
- White/transparent cards
- Bright, cheerful colors

### Scary Theme Colors  
- Pure black backgrounds (`bg-black`)
- Red accents (`border-red-900`, `text-red-500`)
- Dark gray elements (`bg-gray-900`)

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Game.tsx        # Main game logic
│   ├── GameHeader.tsx  # Score and round display
│   ├── ImageDisplay.tsx # Character image handling
│   ├── GuessInput.tsx  # Input and buttons
│   ├── FeedbackCard.tsx # Result feedback
│   ├── GameComplete.tsx # Final score screen
│   ├── PinkEndingScreen.tsx # Special ending
│   └── JumpscareScreen.tsx # Horror ending
├── config/             # Game configuration
├── data/              # Character data
├── utils/             # Helper functions
└── assets/            # Static assets
```

## 🐛 Recent Fixes

- ✅ Fixed cursed rounds completion flow
- ✅ Prevented skipping final scary screen
- ✅ Improved audio management and cleanup
- ✅ Enhanced error handling for audio playback
- ✅ Optimized blur intensity (13px)

## 📄 License

This project is for educational purposes. All cartoon characters and imagery are property of their respective creators and studios.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run `npm run lint` and `npm run format`
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Submit a pull request

---