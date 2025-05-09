# Sliding Tic Tac Toe

A modern take on the classic Tic Tac Toe game with a unique sliding window mechanic and beautiful glassmorphism UI design.

![Sliding Tic Tac Toe Screenshot](/tictactoe.png)

## 🎮 Game Features

- **Sliding Window Mechanic**: When you place your 3rd mark, your oldest mark disappears - creating a dynamic and strategic gameplay experience!
- **Dual Game Modes**: Play against a friend or challenge the computer AI
- **Glassmorphism Design**: Beautiful frosted glass UI with dark and light themes
- **Responsive**: Works on desktop and mobile devices
- **Smart AI**: Computer opponent that can both attack and defend strategically

## 🕹️ How to Play

1. **Select Game Mode**: Choose between "Player vs Player" or "Player vs Computer"
2. **Start the Game**: Click "Start Game" to begin
3. **Take Turns**: Place X and O marks on the board by clicking empty cells
4. **Sliding Rule**: When you place your 3rd mark, your oldest mark disappears (unless you've won)
5. **Win Condition**: Create a line of 3 identical marks horizontally, vertically, or diagonally
6. **New Game**: Click "New Game" button to restart at any time

## 🌓 Theme Toggle

Switch between dark and light themes using the toggle switch in the bottom right corner:
- **Dark Theme**: Sleek dark glassmorphism for low-light environments
- **Light Theme**: Bright glassmorphism for daytime playing

## 💻 Technical Implementation

This game is built using pure HTML, CSS, and JavaScript without any external libraries or frameworks. Key technical features include:

- **CSS Glassmorphism**: Uses backdrop-filter and rgba colors to create the glass effect
- **CSS Animations**: Smooth transitions and effects for piece placement/removal
- **Responsive Design**: Flexbox and CSS Grid for layout
- **AI Logic**: Computer opponent with strategic decision making
- **Game State Management**: Tracks moves and applies the sliding window rule

## 🧠 Computer AI Strategy

The computer AI follows these priorities when making moves:
1. Win if possible (complete a line of 3)
2. Block the player from winning
3. Take the center if available
4. Take a corner if available
5. Take any available space

## 🛠️ Setup and Installation

1. Clone this repository or download the HTML file
2. Open the HTML file in any modern web browser
3. That's it! No dependencies or build steps required

## 🎨 Customization

You can customize the game by modifying the CSS variables at the top of the stylesheet:
- Change colors for X and O markers
- Adjust the glass transparency
- Modify animations and timings

## 📱 Browser Compatibility

The game works in all modern browsers that support CSS backdrop-filter:
- Chrome 76+
- Firefox 70+
- Safari 9+
- Edge 17+

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Credits

Developed with ❤️ as a modern twist on the classic game. The glassmorphism design is inspired by current UI trends, and the sliding window mechanic creates a fresh strategic challenge.

---

Enjoy playing Sliding Tic Tac Toe! Feel free to contribute or customize it further.