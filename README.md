# 🌦 Weather App

A simple weather application built with **React** and the **OpenWeather API**.  
It allows users to search for a city and view its current weather conditions in a clean and responsive interface.

---

## 🚀 Features
- 🔍 Search weather by city name  
- 🌡 Displays **temperature**, **city name**, and **weather condition**  
- 📱 Fully responsive design (works on both desktop & mobile)  
- ⚠️ Error handling (invalid city / network errors)  
- 🎨 Modern UI with a clean layout  

---

## 🌐 Live Demo
Deployed on **CodeSandbox** 👉 [Weather App Live](https://codesandbox.io/p/github/bhava1816/weather-app/main)

---

## 🛠 Tech Stack
- **React** (Frontend library)  
- **OpenWeather API** (Weather data)  
- **CodeSandbox** (Deployment/Hosting)  

---

## 📦 Installation (Run Locally)
Clone the repository and install dependencies:

```bash

git clone https://github.com/bhava1816/weather-app.git
cd weather-app
npm install
npm start

```


🔑 API Key Setup

This project uses the OpenWeather API.

Create a free account → OpenWeather

Generate an API key

Replace YOUR_API_KEY in the code with your actual key:

const res = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`
);

---

🧪 Testing

✅ Enter a valid city → shows weather details

❌ Enter an invalid city → shows "City not found"

🌐 Disconnect internet → shows "Network error"

📖 Notes

This project was built with guidance from ChatGPT (AI) to learn deployment and best practices.

The development process, debugging, and improvements were documented in ChatGPT conversations.

👨‍💻 Author

Bhava Narayana Chukka

📧 Email: bhavanarayanachukka@gmail.com

🌐 GitHub: bhava1816


---

✅ Next Steps for You:  
1. Copy this content into a new file: `README.md`.  
2. Push it to GitHub:
   ```bash
   git add README.md
   git commit -m "Added README with project details"
   git push origin main
