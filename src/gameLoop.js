import { setElementDisplay } from './dom.js';
import { opponent, player } from './index.js';

export let gameOver = false;
export let winner = null;

export function gameLoop(x, y) {
  if (gameOver === false) {
    player.takeTurn(x, y);
    opponent.takeTurn();
  }
  if (gameOver === true) {
    setElementDisplay('winner-popup', 'block');
    document.getElementById('winningName').textContent = winner;
  }
}
