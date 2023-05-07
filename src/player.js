// define player

import {
  areAllShipsSunk,
  makeShips,
  newGameboard,
  receiveAttack,
} from './gameboard';

// define computer
function createPlayer() {
  const name = 'John';
  const prevMoves = new Set();
  const gameboard = newGameboard();
  const ships = makeShips();

  function getCoordinates() {
    x = prompt('enter X coordinate');
    y = prompt('enter Y coordinate');
    if (prevMoves.has(`${x},${y}`)) {
      console.log('Please enter a square you have not hit already!');
      return getCoordinates();
    }
    prevMoves.add(`${x},${y}`);
    return [x, y];
  }

  function takeTurn() {
    const [x, y] = getCoordinates();
    receiveAttack(opponent.gameboard, x, y);
    if (areAllShipsSunk(opponent.ships)) {
      console.log(`${name} wins!`);
    }
  }

  return { name, gameboard, ships, takeTurn };
}

function createComputer() {
  const name = 'Computer';
  const prevMoves = new Set();
  const gameboard = newGameboard();
  const ships = makeShips();

  function getRandomCoordinates() {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    if (prevMoves.has(`${x},${y}`)) {
      return getRandomCoordinates();
    }
    prevMoves.add(`${x},${y}`);
    return [x, y];
  }

  function takeTurn() {
    const [x, y] = getRandomCoordinates();
    receiveAttack(player.gameboard, x, y);
    if (areAllShipsSunk(player.ships)) {
      console.log(`${name} wins!`);
    }
  }

  return { name, gameboard, ships, takeTurn };
}

export const player = createPlayer();
export const opponent = createComputer();
