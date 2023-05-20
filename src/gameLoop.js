// create basic game loop
// game start = place ships (for player and computer)
// while gameOver = false:
// player goes first, run receive attack on opponentBoard (computer)
// update opponent board
// computer takes turn, runs receive attack on player board with random placement.
// if playerShips || computerShips are all sunk gameOver = true and return winning player (player with at least one alive ship)
// break or continue looping
// if gameOver = true return winning player name and say winner

import { opponent, player } from './index.js';
import { populateOpponentGrid, populatePlayerGrid } from './dom.js';

export function gameLoop(x, y) {
  player.takeTurn(x, y);
  opponent.takeTurn();
  console.log(opponent.gameboard);
  console.log(player.gameboard);
}
