# WeatherInsights Setup Guide

## Getting Your OpenWeather API Key

1. **Sign up for OpenWeather API**:
   - Go to [OpenWeatherMap](https://openweathermap.org/api)
   - Click "Sign Up" and create a free account
   - Verify your email address

2. **Get Your API Key**:
   - Log in to your OpenWeather account
   - Go to the "API keys" tab in your account dashboard
   - Copy your default API key (or create a new one)

## Setting Up the Application

1. **Add Your API Key**:
   - Create a `.env.local` file in the project root
   - Add your API key (without the NEXT_PUBLIC_ prefix):
   \`\`\`
   OPENWEATHER_API_KEY=your_actual_api_key_here
   \`\`\`

2. **Install Dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

3. **Start the Development Server**:
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Test the Application**:
   - Open http://localhost:3000
   - Allow location access when prompted, or search for a city
   - You should now see real weather data!

## Troubleshooting

### "OpenWeather API key not configured" Error
- Make sure you have created the `.env.local` file
- Check that the environment variable is named `OPENWEATHER_API_KEY` (without NEXT_PUBLIC_)
- Restart your development server after adding the environment variable

### "Invalid API key configuration" Error
- Double-check your API key in the `.env.local` file
- Make sure there are no extra spaces or quotes around the key
- Wait a few minutes after creating the key (it can take time to activate)

### "City not found" Error
- Check the spelling of the city name
- Try using the format "City, Country" (e.g., "London, UK")
- Some smaller cities might not be in the database

### No Location Access
- Make sure you're using HTTPS (or localhost for development)
- Check your browser's location permissions
- The app will fall back to searching for cities manually

## API Usage Limits

The free OpenWeather plan includes:
- 1,000 API calls per day
- 60 calls per minute
- Current weather and 5-day forecast access

This should be more than enough for personal use and testing!

## Security Notes

- The API key is kept secure on the server side
- Never commit your `.env.local` file to version control
- The application uses server-side API routes to protect your credentials
