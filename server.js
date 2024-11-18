const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, 'public')));

// Array of love letters
const loveLetters = [
  "Hamza, every day with you feels like a dream come true. I cherish every moment we spend together.",
  "To my love, Hamza, you are the reason my heart beats faster. I love you more than words can express.",
  "Hamza, your smile is my sunshine, your laughter my joy. I am so grateful to have you by my side.",
  "Every moment with you, Hamza, is a treasure I hold close to my heart. I love you endlessly.",
  "Hamza, your love makes my world a better place. I'm so lucky to call you mine.",
  "Hamza, your kindness and warmth fill my heart. I am forever grateful for your love.",
  "To the love of my life, Hamza, you make everything feel more beautiful. I'm so thankful for you.",
  "Hamza, my heart beats for you. You are my today and all of my tomorrows.",
  "Every time I think of you, Hamza, my heart skips a beat. You are my forever love.",
  "Hamza, you're the reason I smile even on the toughest days. I love you beyond words."
];

// Array of nicknames
const nicknames = [
  "meri jan", "mera baby", "my hubby", "my monkey", "my bandar", "mana ki janu"
];

// Function to get a random love letter
function getRandomLoveLetter() {
  const randomIndex = Math.floor(Math.random() * loveLetters.length);
  return loveLetters[randomIndex]; // Return a random love letter
}

// Function to get a random nickname
function getRandomNickname() {
  const randomIndex = Math.floor(Math.random() * nicknames.length);
  return nicknames[randomIndex]; // Return a random nickname
}

// Serve the love letter page
app.get('/', (req, res) => {
  const loveLetter = getRandomLoveLetter();  // Get a random love letter
  const nickname = getRandomNickname(); // Get a random nickname

  // Send the HTML content with dynamic love letter
  res.send(`
    <html>
      <head>
        <link rel="stylesheet" href="/style.css">
        <script>
          function showNickname() {
            // Generate a random nickname when the button is clicked
            const nickname = '${getRandomNickname()}';
            const nicknameElement = document.createElement('div');
            nicknameElement.className = 'nickname';
            nicknameElement.textContent = nickname;
            document.body.appendChild(nicknameElement);
            setTimeout(() => nicknameElement.remove(), 3000); // Remove after 3 seconds
          }

          function loadNewLetter() {
            // Load a new love letter and nickname
            fetch('/new-letter')
              .then(response => response.json())
              .then(data => {
                document.querySelector('.love-letter').textContent = data.loveLetter;
                showNickname(); // Show a nickname after loading the new letter
              });
          }
        </script>
      </head>
      <body>
        <div class="container">
          <h1>Love Letter</h1>
          <p class="love-letter">${loveLetter}</p>
          <button onclick="loadNewLetter()">Get New Love Letter</button>
        </div>
        <div id="love-heart">❤️</div>
      </body>
    </html>
  `);
});

// API route to get a new love letter and nickname (for AJAX)
app.get('/new-letter', (req, res) => {
  const loveLetter = getRandomLoveLetter();  // Get a random love letter
  const nickname = getRandomNickname(); // Get a random nickname
  res.json({ loveLetter, nickname }); // Send both in the response
});

// Start the server
app.listen(port, () => {
  console.log(`Love letter app is running on http://localhost:${port}`);
});
