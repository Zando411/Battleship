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

function appLoad() {
  setElementDisplay('opponent-board', 'none');
  displayShips(player.ships);
  initalizePlayerGrid(player);
  addButtonEventListeners();
}

export function startGame() {
  player.validateAllShipsPlaced();
  populateOpponentGrid(opponent);
  opponent.placeShips();
  setElementDisplay('opponent-board', 'flex');
}

appLoad();
