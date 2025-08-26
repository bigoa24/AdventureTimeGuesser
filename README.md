# 🏰 Adventure Time Guesser

A fun and interactive web game where you guess Adventure Time characters from blurred or cropped images!

## 🎮 Game Features

- **10 Rounds per Game**: Each game randomly selects 10 unique characters
- **Two Game Modes**: 
  - 🌀 **Blur Mode**: Images are blurred until you guess
  - 🔍 **Crop Mode**: Only part of the image is visible
- **Smart Guessing**: Case-insensitive with support for nicknames (e.g., "PB" for Princess Bubblegum)
- **Score Tracking**: Track your high scores locally
- **Responsive Design**: Works great on mobile and desktop
- **Accessibility**: Full keyboard support and screen reader friendly

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

3. Add character images to `public/images/` directory:
   - finn.jpg
   - jake.jpg
   - pb.jpg
   - iceking.jpg
   - marceline.jpg
   - bmo.jpg
   - lemongrab.jpg
   - flameprincess.jpg
   - lsp.jpg
   - huntresswizard.jpg
   - peppermintbutler.jpg
   - gunter.jpg
   - treetrunks.jpg
   - prismo.jpg

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier

### Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **ESLint + Prettier** - Code quality

## 🎨 Game Rules

1. Each game consists of 10 rounds
2. Each round shows one character image in either blur or crop mode
3. Wrong guesses don't end the game - you can continue to the next round
4. Correct guess = +1 point, Wrong/Skip = +0 points
5. After 10 rounds, see your final score and compare with high scores
6. Use the "Skip" button to move to the next round without guessing

## 🏆 Scoring

- **Mathematical! (90-100%)** - You're a true Adventure Time expert!
- **Algebraic! (80-89%)** - Excellent knowledge!
- **Rhombus! (70-79%)** - Pretty good!
- **Schmowzow! (60-69%)** - Not bad!
- **What the cabbage! (50-59%)** - Keep practicing!
- **Oh my glob! (<50%)** - Time to rewatch some episodes!

## 📱 Accessibility Features

- Full keyboard navigation support
- Screen reader announcements for game state
- High contrast feedback colors
- Focus management for better UX
- ARIA labels and live regions

## 🔧 Customization

### Adding New Characters

1. Add character image to `public/images/`
2. Update `src/data/characters.ts`:

```typescript
{
  id: "newcharacter",
  name: "New Character Name",
  aliases: ["Nickname1", "Nickname2"],
  image: "/images/newcharacter.jpg"
}
```

### Styling

The game uses Tailwind CSS with custom Adventure Time-themed colors:
- `adventure-blue`: #4FC3F7
- `adventure-yellow`: #FFD54F  
- `adventure-green`: #66BB6A
- `adventure-pink`: #F06292

## 📄 License

This project is for educational purposes. Adventure Time characters and imagery are property of Cartoon Network.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run lint` and `npm run format`
5. Submit a pull request

---

Made with ❤️ for Adventure Time fans!