let colors = [];
let correctColor;
let difficulty = "easy";

document.addEventListener("DOMContentLoaded", function () {
    initGame();
    resetGame();
});

function initGame() {
    generateColorButtons();
}

function generateColorButtons() {
    const colorButtonsContainer = document.getElementById("color-buttons");
    colorButtonsContainer.innerHTML = "";

    for (let i = 0; i < colors.length; i++) {
        const button = document.createElement("button");
        button.style.backgroundColor = colors[i];
        button.addEventListener("click", function () {
            checkAnswer(this.style.backgroundColor);
        });
        colorButtonsContainer.appendChild(button);
    }
}

function setDifficulty(level) {
    difficulty = level;
    resetGame();
}

function resetGame() {
    colors = generateRandomColors(difficulty === "easy" ? 3 : difficulty === "medium" ? 6 : 9);
    correctColor = pickColor();
    document.getElementById("color-display").textContent = correctColor;
    document.getElementById("message").textContent = "";
    document.getElementById("reset").textContent = "New Colors";
    generateColorButtons();
}

function checkAnswer(color) {
    if (color === correctColor) {
        document.getElementById("message").textContent = "Correct!";
        changeColors(correctColor);
        document.getElementById("reset").textContent = "Play Again?";
    } else {
        document.getElementById("message").textContent = "Try Again";
    }
}

function changeColors(color) {
    const colorButtons = document.querySelectorAll("#color-buttons button");
    colorButtons.forEach(button => {
        button.style.backgroundColor = color;
    });
}

function pickColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

function generateRandomColors(num) {
    const generatedColors = [];
    for (let i = 0; i < num; i++) {
        generatedColors.push(randomColor());
    }
    return generatedColors;
}

function randomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `#${componentToHex(red)}${componentToHex(green)}${componentToHex(blue)}`;
}

function componentToHex(c) {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}
