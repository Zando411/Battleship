import {
  areAllShipsPlaced,
  areAllShipsSunk,
  makeShips,
  newGameboard,
  receiveAttack,
} from './gameboard.js';

function createPlayer(userName) {
  const name = userName;
  const prevMoves = new Set();
  const gameboard = newGameboard();
  const ships = makeShips();
  const allShipsPlaced = false;

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
      console.log(`You win!`);
    }
  }

  return { name, gameboard, ships, takeTurn, allShipsPlaced };
}

function createComputer() {
  const isComputer = true;
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

  return { name, gameboard, ships, takeTurn, isComputer };
}

export { createPlayer, createComputer };
