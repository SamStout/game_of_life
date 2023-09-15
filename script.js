let board = document.getElementById("board")
const startButton = document.getElementById("startButton")
const stopButton = document.getElementById("stopButton")
const randButton = document.getElementById("randButton")
const clearButton = document.getElementById("clearButton")
const gggButton = document.getElementById("gggButton")

const amtRow = 40;
const amtCol = 40;
const amtTimeRefresh = 1;
const chanceOfRand = .15
let randState = false;

let gameRunning = false;
let IntervalId;

const toggle = (event) => {
    const cell = event.target;
    cell.classList.toggle("alive");
};


const findAmtNeighbors = (cell) => {
    // Extract the row and column coordinates of the current cell
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    // Initialize a variable to count the number of alive neighbors
    let neighbors = 0;

    // Iterate through a 3x3 grid centered around the current cell
    for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
            // When r and c are both 0, it's the current cell itself, so we skip it
            if (r === 0 && c === 0) {
                continue;
            }
            // Calculate the coordinates of a potential neighbor cell
            const newRow = row + r;
            const newCol = col + c;

            // Check if the potential neighbor cell is within the grid boundaries
            if ( newRow >= 0 && 
                newRow < amtRow &&
                newCol >= 0 && 
                newCol < amtCol ) {
                // Find the neighbor cell in the DOM using its data attributes
                const neighborCell = document.querySelector(
                    `[data-row="${newRow}"][data-col="${newCol}"]`
                );
                // Check if the neighbor cell is alive (contains the "alive" class)
                if (neighborCell.classList.contains("alive")) {
                    // If the neighbor cell is alive, increment the neighbors count
                    neighbors++;
                }
            }
        }
    }
    // Return the total count of alive neighbors for the current cell
    return neighbors;
};

const deadOrAlive =(cell)=>{
    const neighbors = findAmtNeighbors(cell)
    if(cell.classList.contains("alive")){
        if(neighbors < 2 || neighbors > 3){
            cell.classList.add("almostDead");
        }
    } else {
        if (neighbors == 3) {
            cell.classList.add("almostAlive");
        }
    }
}

const makeBoard = () => {
    for(let row = 0; row < amtRow; row++){
        for(let col = 0; col <amtCol; col++){
            var cell = document.createElement("div");
            cell.dataset.col = col;
            cell.dataset.row = row;
            cell.className = "cell";
            cell.addEventListener("click", toggle)
            if(randState){
                let n = Math.random()
                if(n<chanceOfRand){
                    cell.classList.add("alive");
                }
            }
            board.appendChild(cell)
        }
    }
}

const startGame = () =>{
    gameRunning = true;
    IntervalId = setInterval(updateGame, amtTimeRefresh);
    console.log("game start")
}

const stopGame = () => {
    console.log("Stopping the game");
    gameRunning = false;
    clearInterval(IntervalId);
};


const stageCellState = () =>{
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        deadOrAlive(cell);
    });

}
const makeAliveOrDead = () => {
    const cells = document.querySelectorAll(".cell");
    
    // Create two arrays to store the cells to be updated for alive and dead
    const cellsToBeAlive = [];
    const cellsToBeDead = [];

    cells.forEach(cell => {
        if (cell.classList.contains("almostAlive")) {
            cellsToBeAlive.push(cell);
        } else if (cell.classList.contains("almostDead")) {
            cellsToBeDead.push(cell);
        }
    });

    // Now, update the state of the cells
    cellsToBeAlive.forEach(cell => {
        cell.classList.add("alive");
        cell.classList.remove("almostAlive");
        cell.classList.remove("recentlyDead")
    });

    cellsToBeDead.forEach(cell => {
        cell.classList.remove("alive");
        cell.classList.remove("almostDead");
        cell.classList.add("recentlyDead")
    });

    stageCellState();
}

const randPlacement = () => {
    randState = true;

    // Clear the existing grid by removing all child elements
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }

    // Create a new randomized grid
    makeBoard();

    randState = false;
}

const spawnGosperGliderGun = () => {
    const gliderGunCoordinates = [
        [0, 24],
        [1, 22], [1, 24],
        [2, 12], [2, 13], [2, 20], [2, 21], [2, 34], [2, 35],
        [3, 11], [3, 15], [3, 20], [3, 21], [3, 34], [3, 35],
        [4, 0], [4, 1], [4, 10], [4, 16], [4, 20], [4, 21],
        [5, 0], [5, 1], [5, 10], [5, 14], [5, 16], [5, 17], [5, 22], [5, 24],
        [6, 10], [6, 16], [6, 24],
        [7, 11], [7, 15],
        [8, 12], [8, 13]
    ];
    gliderGunCoordinates.forEach(coords => {
        const [row, col] = coords;
        const cell = document.querySelector(
            `[data-row="${row}"][data-col="${col}"]`
        );
        cell.classList.add("alive");
    });
};

// You can call this function to spawn the modified Gosper glider gun.

const updateGame = () => {
    // Iterate through all cells and update their state based on neighbors and save value in almost alive
    // Then run through cells again, and enforce changes after value are all stored.
    makeAliveOrDead();
}

gggButton.addEventListener("click", spawnGosperGliderGun)
randButton.addEventListener("click", randPlacement)
startButton.addEventListener("click", startGame)
stopButton.addEventListener("click", stopGame)
clearButton.addEventListener("click", () => location.reload())

makeBoard();