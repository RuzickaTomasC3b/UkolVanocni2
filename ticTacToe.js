const ticTacToeGame = {
    currentPlayer: "X",
    board: Array.from({ length: 20 }, () => Array(20).fill("")),
    cells: [],
    messageDisplay: document.getElementById("message"),

    init: function () {
        this.setupBoard();
        this.setupCells();
        this.reset();
    },

    setupBoard: function () {
        const boardContainer = document.getElementById("board-container");
        boardContainer.innerHTML = "";

        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.row = i;
                cell.dataset.col = j;
                boardContainer.appendChild(cell);
            }
        }
    },

    setupCells: function () {
        this.cells = document.querySelectorAll(".cell");
        this.cells.forEach(cell => {
            cell.addEventListener("click", () => this.makeMove(cell));
        });
    },

    reset: function () {
        this.currentPlayer = "X";
        this.board = Array.from({ length: 20 }, () => Array(20).fill(""));
        this.messageDisplay.textContent = "";
        this.cells.forEach(cell => {
            cell.textContent = "";
        });
    },

    makeMove: function (cell) {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        if (this.board[row][col] === "") {
            this.board[row][col] = this.currentPlayer;
            cell.textContent = this.currentPlayer;

            if (this.checkWinner()) {
                this.messageDisplay.textContent = `${this.currentPlayer} wins!`;
            } else if (this.board.every(row => row.every(cell => cell !== ""))) {
                this.messageDisplay.textContent = "It's a draw!";
            } else {
                this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
            }
        }
    },

    checkWinner: function () { // vertical, horizontal, diagonals wins
        for (let i = 0; i < 17; i++) {
            for (let j = 0; j < 20; j++) {
                if (
                    this.board[i][j] !== "" &&
                    this.board[i][j] === this.board[i + 1][j] &&
                    this.board[i][j] === this.board[i + 2][j] &&
                    this.board[i][j] === this.board[i + 3][j] &&
                    this.board[i][j] === this.board[i + 4][j]
                ) {
                    return true;
                }
            }
        }

        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 17; j++) {
                if (
                    this.board[i][j] !== "" &&
                    this.board[i][j] === this.board[i][j + 1] &&
                    this.board[i][j] === this.board[i][j + 2] &&
                    this.board[i][j] === this.board[i][j + 3] &&
                    this.board[i][j] === this.board[i][j + 4]
                ) {
                    return true;
                }
            }
        }

        for (let i = 4; i < 20; i++) {
            for (let j = 0; j < 17; j++) {
                if (
                    this.board[i][j] !== "" &&
                    this.board[i][j] === this.board[i - 1][j + 1] &&
                    this.board[i][j] === this.board[i - 2][j + 2] &&
                    this.board[i][j] === this.board[i - 3][j + 3] &&
                    this.board[i][j] === this.board[i - 4][j + 4]
                ) {
                    return true;
                }
            }
        }

        for (let i = 0; i < 17; i++) {
            for (let j = 0; j < 17; j++) {
                if (
                    this.board[i][j] !== "" &&
                    this.board[i][j] === this.board[i + 1][j + 1] &&
                    this.board[i][j] === this.board[i + 2][j + 2] &&
                    this.board[i][j] === this.board[i + 3][j + 3] &&
                    this.board[i][j] === this.board[i + 4][j + 4]
                ) {
                    return true;
                }
            }
        }

        return false;
    },

};

document.addEventListener("DOMContentLoaded", function () {
    ticTacToeGame.init();
    document.getElementById("reset").addEventListener("click", function () {
        ticTacToeGame.reset();
    });
});
