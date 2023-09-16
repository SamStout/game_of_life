# game_of_life

Conway's Game of Life
This is a JavaScript implementation of Conway's Game of Life, a cellular automaton devised by the British mathematician John Conway. The Game of Life is a zero-player game that evolves on a grid of cells based on a simple set of rules. It is an example of a cellular automaton, where each cell's state depends on the state of its neighbors.

Overview
The project consists of an HTML file (index.html), a CSS file (style.css), and a JavaScript file (script.js). It provides a visual representation of the Game of Life, allowing you to interact with the grid and watch it evolve.

How to Use
Clone or download this repository to your local machine.

Open the index.html file in a web browser.

Use the following controls to interact with the simulation:

Start: Click the "Start" button to begin the simulation.
Stop: Click the "Stop" button to pause the simulation.
Randomize: Click the "Randomize" button to randomly populate the grid with live cells.
Clear: Click the "Clear" button to clear the grid.
Glider Gun: Click the "Glider Gun" button to create a pattern known as a "Gosper Glider Gun."
You can also click on individual cells to toggle them between alive and dead states.

Rules of the Game
The Game of Life follows these simple rules:

Any live cell with fewer than two live neighbors dies (underpopulation).
Any live cell with two or three live neighbors lives on to the next generation.
Any live cell with more than three live neighbors dies (overcrowding).
Any dead cell with exactly three live neighbors becomes a live cell (reproduction).
Customize the Simulation
You can customize the simulation by adjusting the following parameters in the script.js file:

amtRow and amtCol: Control the number of rows and columns in the grid. Keep in mind the more rows and columns that are added will signficantly influence the refresh time. If you choose to change the amt col and amt row, make a corresponding change in the CSS under the grid-template-columns and grid-template-rows.
amtTimeRefresh: Sets the time interval between generations (in seconds).
chanceOfRand: Controls the likelihood of randomly populating cells when using the "Randomize" button.
Feel free to explore the code and make modifications as desired.
