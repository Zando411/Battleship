import {
  addButtonEventListeners,
  displayShips,
  hideOpponentBoard,
  initalizePlayerGrid,
  populateGrids,
  populateOpponentGrid,
  populatePlayerGrid,
  showOpponentBoard,
} from './dom.js';
import { createPlayer, createComputer } from './player.js';

export const player = createPlayer();
export const opponent = createComputer();

function appLoad() {
  hideOpponentBoard();
  displayShips(player.ships);
  initalizePlayerGrid(player);
  addButtonEventListeners();
}

export function startGame() {
  player.validateAllShipsPlaced();
  populateOpponentGrid(opponent);
  opponent.placeShips();
  showOpponentBoard();
}

appLoad();
