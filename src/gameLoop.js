// create basic game loop
// game start = place ships (for player and computer)
// while gameOver = false:
// player goes first, run receive attack on opponentBoard (computer)
// update opponent board
// computer takes turn, runs receive attack on player board with random placement.
// if playerShips || computerShips are all sunk gameOver = true and return winning player (player with at least one alive ship)
// break or continue looping
// if gameOver = true return winning player name and say winner

import { openWinnnerPopup } from './dom.js';
import { opponent, player } from './index.js';

export let gameOver = false;
export let winner = null;

export function gameLoop(x, y) {
  if (gameOver === false) {
    player.takeTurn(x, y);
    opponent.takeTurn();
  }
  if (gameOver === true) {
    openWinnnerPopup();
    document.getElementById('winningName').textContent = winner;
  }
}
