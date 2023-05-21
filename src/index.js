import {
  addButtonEventListeners,
  displayShips,
  initalizePlayerGrid,
  populateOpponentGrid,
  setElementDisplay,
  setPlayerTitleName,
} from './dom.js';
import { createPlayer, createComputer } from './player.js';

export const player = createPlayer();
export const opponent = createComputer();

export function appLoad() {
  setPlayerTitleName();
  setElementDisplay('ships', 'flex');
  setElementDisplay('opponent-board', 'none');
  displayShips(player.ships);
  initalizePlayerGrid(player);
  addButtonEventListeners();
}

export function startGame() {
  player.validateAllShipsPlaced();
  setPlayerTitleName();
  setElementDisplay('ships', 'none');
  populateOpponentGrid(opponent);
  opponent.placeShips();
  setElementDisplay('opponent-board', 'flex');
}

function resetGame() {}

appLoad();
