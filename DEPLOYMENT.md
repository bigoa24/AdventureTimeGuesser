# 🚀 Deployment Guide

## Quick Start

The Adventure Time Guesser game is ready to run! Here's how to get started:

### 1. Install Dependencies
```bash
npm install
```

### 2. Add Character Images (Important!)

The game expects character images in the `public/images/` directory. You need to add 14 images with these exact names:

- `finn.jpg` - Finn the Human
- `jake.jpg` - Jake the Dog  
- `pb.jpg` - Princess Bubblegum
- `iceking.jpg` - Ice King
- `marceline.jpg` - Marceline the Vampire Queen
- `bmo.jpg` - BMO
- `lemongrab.jpg` - Earl of Lemongrab
- `flameprincess.jpg` - Flame Princess
- `lsp.jpg` - Lumpy Space Princess
- `huntresswizard.jpg` - Huntress Wizard
- `peppermintbutler.jpg` - Peppermint Butler
- `gunter.jpg` - Gunter
- `treetrunks.jpg` - Tree Trunks
- `prismo.jpg` - Prismo

**Note:** The game includes fallback placeholder images, so it will work even without real images, but adding actual Adventure Time character images will make it much more engaging!

### 3. Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` to play the game!

### 4. Production Build
```bash
npm run build
npm run preview
```

## Deployment Options

### Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy!

### Vercel
1. Connect your GitHub repository to Vercel
2. Framework preset: Vite
3. Deploy!

### GitHub Pages
1. Install gh-pages: `npm install -D gh-pages`
2. Add to package.json scripts: `"deploy": "gh-pages -d dist"`
3. Update vite.config.ts with base path
4. Run: `npm run build && npm run deploy`

### Static Hosting (Any Provider)
1. Run `npm run build`
2. Upload the `dist/` folder contents to your hosting provider
3. Ensure the server serves `index.html` for all routes

## Environment Setup

### Required Node.js Version
- Node.js 18+ recommended
- npm 9+ or yarn 1.22+

### Browser Support
- Modern browsers (Chrome 90+, Firefox 88+, Safari 14+)
- Mobile browsers supported
- Internet Explorer not supported

## Performance Tips

1. **Image Optimization**: Compress character images to 400x225px or similar 16:9 aspect ratio
2. **CDN**: Use a CDN for faster image loading
3. **Caching**: Enable browser caching for static assets

## Troubleshooting

### Build Fails
- Ensure Node.js version is 18+
- Clear node_modules: `rm -rf node_modules package-lock.json && npm install`
- Check for TypeScript errors: `npm run lint`

### Images Not Loading
- Verify images are in `public/images/` directory
- Check file names match exactly (case-sensitive)
- Ensure images are web-compatible formats (jpg, png, webp)

### Game Not Working
- Check browser console for errors
- Ensure JavaScript is enabled
- Try in incognito/private mode

## Customization

### Adding New Characters
1. Add image to `public/images/`
2. Update `src/data/characters.ts`
3. Rebuild and deploy

### Changing Game Rules
- Modify `src/utils/gameUtils.ts` for game logic
- Update `src/components/Game.tsx` for UI behavior

### Styling Changes
- Edit `src/index.css` for global styles
- Modify component files for specific styling
- Use Tailwind CSS classes

## Security Notes

- All game data is stored locally (localStorage)
- No backend required
- No user data transmitted
- Safe for all ages

---

Need help? Check the main README.md for more detailed information!
