const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Array of love letters
const loveLetters = [
  "Hamza, every day with you feels like a dream come true...",
  "To my love, Hamza, you are the reason my heart beats faster...",
  "Hamza, your smile is my sunshine...",
  "Every moment with you, Hamza, is a treasure...",
  "Hamza, your love makes my world a better place...",
];

const nicknames = ["meri jan", "mera baby", "my hubby", "my monkey", "my bandar"];

function getRandomLoveLetter() {
  const randomIndex = Math.floor(Math.random() * loveLetters.length);
  return loveLetters[randomIndex];
}

function getRandomNickname() {
  const randomIndex = Math.floor(Math.random() * nicknames.length);
  return nicknames[randomIndex];
}

// Serve the love letter page
app.get('/', (req, res) => {
  const loveLetter = getRandomLoveLetter();
  res.send(`
    <html>
      <head>
        <link rel="stylesheet" href="/style.css">
      </head>
      <body>
        <div class="container">
          <h1>Love Letter</h1>
          <p>${loveLetter}</p>
          <button onclick="location.reload()">Get New Love Letter</button>
        </div>
        <div id="love-heart">❤️</div>
      </body>
    </html>
  `);
});

// API route for new love letter
app.get('/api/new-letter', (req, res) => {
  res.json({ loveLetter: getRandomLoveLetter(), nickname: getRandomNickname() });
});

module.exports = app;
