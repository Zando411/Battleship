import {
  addButtonEventListeners,
  displayShips,
  initalizePlayerGrid,
  populateOpponentGrid,
  setElementDisplay,
} from './dom.js';
import { createPlayer, createComputer } from './player.js';

export const player = createPlayer();
export const opponent = createComputer();

export function appLoad() {
  console.log(player);
  setElementDisplay('ships', 'flex');
  setElementDisplay('opponent-board', 'none');
  displayShips(player.ships);
  initalizePlayerGrid(player);
  addButtonEventListeners();
}

export function startGame() {
  player.validateAllShipsPlaced();
  setElementDisplay('ships', 'none');
  populateOpponentGrid(opponent);
  opponent.placeShips();
  setElementDisplay('opponent-board', 'flex');
}

function resetGame() {}

appLoad();
