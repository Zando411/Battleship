import { addButtonEventListeners, displayShips, populateGrids } from './dom.js';
import { createPlayer, createComputer } from './player.js';

export const player = createPlayer();
const opponent = createComputer();

function appLoad() {
  opponent.placeShips();
  player.placeShips(); // remove later when drag and drop fully works
  displayShips(player.ships);
  populateGrids(player, opponent);
  addButtonEventListeners();
}

export function startGame() {
  player.validateAllShipsPlaced();
  console.log(player.name);
}

appLoad();
