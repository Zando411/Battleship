import { displayShips, populateGrids } from './dom.js';
import { createPlayer, createComputer } from './player.js';

function appLoad() {
  const player = createPlayer();
  const opponent = createComputer();
  opponent.placeShips();
  displayShips(player.ships);
  player.placeShips(); // remove later when drag and drop fully works
  populateGrids(player, opponent);
}

function startGame() {
  player.validateAllShipsPlaced(user);
  gameLoop(player, opponent);
}

appLoad();
