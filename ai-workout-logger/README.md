# AI Workout Logger

A modern, mobile-first fitness app that helps you track daily workouts with AI-powered exercise generation.

## Features

- **Daily Workout Tracking**: View and complete daily exercise routines
- **Exercise Timer**: Built-in timer for timed exercises with audio feedback
- **Rep Counter**: Track repetitions for strength exercises
- **AI-Powered Workouts**: Generate custom workouts using OpenAI or Google AI
- **Workout Discovery**: Browse workouts by body focus (Abs, Arms, Chest, Legs, etc.)
- **Progress Reports**: Track weekly stats and daily breakdown
- **Export to PNG**: Download your workout reports and exercise lists as images
- **Demo Data**: Works immediately with pre-programmed exercises
- **Mobile Optimized**: Responsive design perfect for phones and tablets

## Getting Started

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Configuration

#### Using AI Features

To enable AI-powered workout generation:

1. Go to **Settings** page
2. Add your API keys:
   - **OpenAI API Key**: Get from [platform.openai.com](https://platform.openai.com)
   - **Google AI API Key**: Get from [makersuite.google.com](https://makersuite.google.com)
3. Enable "Use AI to generate workouts"
4. Click "Save Settings"

The app will automatically fall back to demo data if:
- No API key is configured
- AI is disabled
- API calls fail

## Pages

### Training
- View today's workout
- See exercise list with duration/reps
- Start exercises with timer or rep counter
- Audio feedback during exercises

### Discover
- Browse workouts by body focus
- Search for specific workouts
- Create custom workouts with AI
- View featured workouts

### Report
- Weekly goal progress
- Daily breakdown of exercises
- Total duration and calories burned
- Export reports as PNG images

### Settings
- Configure OpenAI API key
- Configure Google AI API key
- Enable/disable AI features
- General app settings

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. No environment variables needed (API keys are stored locally)
5. Deploy!

The app works entirely on the client-side, so no backend configuration is needed.

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **UI**: React with Tailwind CSS
- **Components**: shadcn/ui
- **AI**: OpenAI API & Google AI API
- **Export**: HTML5 Canvas for PNG generation
- **Storage**: Browser localStorage for settings

## Features in Detail

### Exercise Timer
- Countdown timer for timed exercises
- Progress circle visualization
- Audio beep at 10 seconds remaining
- Completion sound when finished
- Toggle sound on/off

### Rep Counter
- Increment/decrement reps
- Visual progress circle
- Target rep display

### Export Functionality
- Export weekly reports as PNG
- Export daily exercises as PNG
- High-quality image generation
- Automatic download

### Demo Data
- 3 pre-programmed daily workouts
- 6 body focus categories
- 20+ workout variations
- Works without internet

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Tips for Best Results

1. **Consistency**: Complete workouts regularly for best results
2. **Form**: Focus on proper exercise form over speed
3. **Progression**: Gradually increase difficulty as you get stronger
4. **Tracking**: Export reports weekly to monitor progress
5. **Rest**: Allow adequate rest between intense workouts

## Troubleshooting

### API Not Working
- Check your API key is correct
- Verify you have API credits available
- Check browser console for error messages
- The app will automatically use demo data as fallback

### Export Not Working
- Ensure you have enough disk space
- Try a different browser
- Check browser permissions for downloads
- Clear browser cache and try again

### Timer Not Working
- Ensure browser tab is active
- Check if sound is enabled
- Try refreshing the page
- Check browser console for errors

## Future Enhancements

- User authentication and cloud sync
- Workout history and statistics
- Social sharing features
- Custom workout creation UI
- Video demonstrations for exercises
- Wearable device integration
- Offline mode with service workers

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or feature requests, please open an issue on GitHub.

---

Built with Next.js and powered by AI
