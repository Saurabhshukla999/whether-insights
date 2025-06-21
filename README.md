# WeatherInsights 🌤️

A modern, interactive weather dashboard built with React, Next.js, and Chart.js. Get real-time weather data and beautiful 5-day forecasts with dynamic theming based on current conditions.
## ✨ Features

- **🌍 Geolocation Support**: Automatically detects your location for instant weather data
- **🌡️ Real-time Weather**: Current temperature, feels-like, humidity, wind speed, and pressure
- **📊 Interactive Charts**: Beautiful 5-day forecast visualization with Chart.js
- **🎨 Dynamic Theming**: Background adapts to current weather conditions
- **🔍 City Search**: Search for weather in any city worldwide
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **⚡ Fast Loading**: Optimized performance with loading states and error handling

## 🛠️ Technologies Used

- **Frontend**: React 18, Next.js 14, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Charts**: Chart.js, react-chartjs-2
- **Icons**: Lucide React
- **API**: OpenWeather API
  
**Live** - https://whether-insights.vercel.app/

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenWeather API key (get one free at [OpenWeatherMap](https://openweathermap.org/api))

### Installation

1. **Clone or download the project**
   \`\`\`bash
   # If using git
   git clone <your-repo-url>
   cd weather-insights
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Configure API Key**
   
   Create a `.env.local` file in the project root and add your OpenWeather API key:
   \`\`\`bash
   OPENWEATHER_API_KEY=your_actual_api_key_here
   \`\`\`
   
   **Important**: Do NOT use `NEXT_PUBLIC_` prefix as this would expose the key to the client.

4. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🌟 Usage

1. **Automatic Location**: Allow location access for instant local weather
2. **Search Cities**: Use the search bar to find weather for any city
3. **Interactive Charts**: Hover over the forecast chart for detailed information
4. **Responsive Design**: Resize your browser or use mobile devices

## 🎨 Features in Detail

### Dynamic Theming
The background gradient changes based on weather conditions:
- ☀️ **Clear/Sunny**: Blue to cyan gradient
- ☁️ **Cloudy**: Gray gradients
- 🌧️ **Rainy**: Slate gradients
- ❄️ **Snowy**: Blue gradients
- 🌙 **Night**: Darker, more subdued colors

### Weather Data
- Current temperature and "feels like"
- Weather condition with descriptive icons
- Humidity percentage
- Wind speed in m/s
- Atmospheric pressure in hPa
- Sunrise and sunset times

### 5-Day Forecast
- Interactive line chart showing temperature trends
- Daily high and low temperatures
- Weather icons for each day
- Condition descriptions

## 🔧 Architecture

The application uses a secure server-side architecture:

- **Client Components**: Handle UI interactions and display
- **API Routes**: Server-side endpoints that securely call OpenWeather API
- **Environment Variables**: API keys are kept server-side only

### API Endpoints

- `GET /api/weather` - Current weather data
- `GET /api/forecast` - 5-day forecast data

Both endpoints accept either:
- `city` parameter for city-based searches
- `lat` and `lon` parameters for coordinate-based searches

## 🚀 Deployment

The app is ready for deployment on platforms like:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- **Heroku**

Remember to set your API key as an environment variable in production:
\`\`\`bash
OPENWEATHER_API_KEY=your_api_key_here
\`\`\`

## 🔒 Security

- API keys are never exposed to the client
- All external API calls are made from server-side routes
- Environment variables are properly secured

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

## 📄 License

This project is open source and available under the MIT License.

---
