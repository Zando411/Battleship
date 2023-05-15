// create basic game loop
// game start = place ships (for player and computer)
// while gameOver = false:
// player goes first, run receive attack on opponentBoard (computer)
// update opponent board
// computer takes turn, runs receive attack on player board with random placement.
// if playerShips || computerShips are all sunk gameOver = true and return winning player (player with at least one alive ship)
// break or continue looping
// if gameOver = true return winning player name and say winner

import { displayShips, populateGrids } from './dom.js';
import { areAllShipsPlaced, makeShips, placeShipsRandom } from './gameboard.js';
import { createComputer, createPlayer } from './player.js';

function appLoad() {
  const player = createPlayer();
  const opponent = createComputer();
  player.setName();
  opponent.placeShips();
  displayShips(player.ships);
  player.placeShips();
  populateGrids(player, opponent);
}

function startGame() {
  validateAllShipsPlaced(user);
  gameLoop(player, opponent);
}

function initalizeShips(user1, user2) {
  userInitializeShips(user1);
  userInitializeShips(user2);
}

function validateAllShipsPlaced(user) {
  const ships = user.ships;
  const placed = areAllShipsPlaced(ships);
  if (placed === true) {
    user.allShipsPlaced = true;
  } else {
    throw new Error('Please place all ships on the board');
  }
}

export { appLoad };
