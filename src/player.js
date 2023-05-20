import {
  areAllShipsPlaced,
  areAllShipsSunk,
  makeShips,
  newGameboard,
  receiveAttack,
  placeShipsRandom,
} from './gameboard.js';

function createPlayer() {
  let name = 'Player';
  const prevMoves = new Set();
  const gameboard = newGameboard();
  const ships = makeShips();
  let allShipsPlaced = false;

  //rewrite
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
  //
  // NEED TO ADD FUNCTION TO SET ALL ARRAY POSITIONS TO NULL
  function clearBoard() {
    for (let i = 0; i < gameboard.length; i++) {
      for (let j = 0; j < gameboard[i].length; j++) {
        gameboard[i][j].hasShip = null;
      }
    }
  }

  function placeShips() {
    placeShipsRandom(this);
  }

  function validateAllShipsPlaced() {
    const placed = areAllShipsPlaced(ships);
    if (placed === true) {
      allShipsPlaced = true;
    } else {
      throw new Error('Please place all ships on the board');
    }
  }

  return {
    name,
    gameboard,
    ships,
    takeTurn,
    allShipsPlaced,
    placeShips,
    validateAllShipsPlaced,
    clearBoard,
  };
}

function createComputer() {
  const isComputer = true;
  const name = 'Computer';
  const prevMoves = new Set();
  const gameboard = newGameboard();
  const ships = makeShips();
  let allShipsPlaced = false;

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

  function clearBoard() {
    for (let i = 0; i < gameboard.length; i++) {
      for (let j = 0; j < gameboard[i].length; j++) {
        gameboard[i][j].hasShip = null;
      }
    }
  }

  function placeShips() {
    placeShipsRandom(this);
  }

  return {
    name,
    gameboard,
    ships,
    takeTurn,
    isComputer,
    placeShips,
    allShipsPlaced,
    clearBoard,
  };
}

export { createPlayer, createComputer };
