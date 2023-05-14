import { createComputer, createPlayer } from './player.js';
import { placeShip, placeShipsRandom } from './gameboard.js';
import {
  addGameboardEventListeners,
  displayShips,
  populateGrids,
} from './dom.js';

const player = createPlayer();
const opponent = createComputer();
placeShipsRandom(opponent);
placeShip(player.gameboard, player.ships[1], 3, 3);
populateGrids(player, opponent);
displayShips(player.ships);

// document.addEventListener('keydown', () => {
//   console.log('success');
// });
