import { createShip } from './ships';
import {
  makeShips,
  placeShips,
  playerGameboard,
  opponentGameboard,
  receiveAttack,
  newGameboard,
  ships,
} from './gameboard';

describe('createShip', () => {
  test('creates a ship object with the correct length', () => {
    const ship = createShip(1, 'Submarine', 3);
    expect(ship.length).toBe(3);
  });

  test('ship is not sunk when hits are less than length', () => {
    const ship = createShip(1, 'Submarine', 3);
    expect(ship.sunk).toBe(false);
    ship.hit();
    expect(ship.sunk).toBe(false);
  });

  test('ship is sunk when hits are equal to length', () => {
    const ship = createShip(1, 'Submarine', 3);
    expect(ship.sunk).toBe(false);
    ship.hit();
    expect(ship.sunk).toBe(false);
    ship.hit();
    expect(ship.sunk).toBe(false);
    ship.hit();
    expect(ship.sunk).toBe(true);
  });

  test('ship is not sunk when hits are greater than length', () => {
    const ship = createShip(1, 'Submarine', 3);
    expect(ship.sunk).toBe(false);
    ship.hit();
    expect(ship.sunk).toBe(false);
    ship.hit();
    expect(ship.sunk).toBe(false);
    ship.hit();
    expect(ship.sunk).toBe(true);
    ship.hit();
    expect(ship.sunk).toBe(true);
  });
  test('ship name is accessible', () => {
    const ship = createShip(1, 'Submarine', 3);
    expect(ship.name).toBe('Submarine');
  });
});

describe('makeShips', () => {
  test('ships are made', () => {
    const ship = makeShips();
    expect(ship[2].name).toBe('Cruiser');
  });
  test('test array length', () => {
    const ship = makeShips();
    expect(ship.length).toBe(7);
  });
  test('ships are made', () => {
    const ship = makeShips();
    expect(ship[3].key).toBe(3);
  });
});

describe('placeShips', () => {
  beforeEach(() => {
    for (let i = 0; i < playerGameboard.length; i++) {
      for (let j = 0; j < playerGameboard[0].length; j++) {
        playerGameboard[i][j].hasShip = null;
        playerGameboard[i][j].isHit = false;
      }
    }
    for (let i = 0; i < opponentGameboard.length; i++) {
      for (let j = 0; j < opponentGameboard[0].length; j++) {
        opponentGameboard[i][j].hasShip = null;
        opponentGameboard[i][j].isHit = false;
      }
    }
  });

  test('ships can place horizontally', () => {
    const ship = makeShips();
    placeShips(playerGameboard, ship[2], 0, 0);
    expect(playerGameboard[0][0].hasShip).toBe(2);
  });
  test('ships can place vertically', () => {
    const ship = makeShips();
    ship[2].vertical = true;
    placeShips(playerGameboard, ship[2], 0, 0);
    expect(playerGameboard[0][0].hasShip).toBe(2);
  });

  test('ships cannot be placed out of bounds', () => {
    const ship = makeShips();
    expect(() => {
      placeShips(playerGameboard, ship[0], 8, 8);
    }).toThrow("Ship can't be placed here.");
  });
  test('ships cannot be placed out of bounds vertical', () => {
    const ship = makeShips();
    ship[0].vertical = true;
    expect(() => {
      placeShips(playerGameboard, ship[0], 8, 8);
    }).toThrow("Ship can't be placed here.");
  });

  test('ships cannot overlap', () => {
    const ship1 = makeShips()[0];
    const ship2 = makeShips()[1];
    expect(() => {
      placeShips(playerGameboard, ship1, 0, 0);
      placeShips(playerGameboard, ship2, 0, 0);
    }).toThrow("Ship can't be placed here.");
  });

  test('ships cannot overlap crossed', () => {
    const ship1 = makeShips()[0];
    const ship2 = makeShips()[1];
    ship2.vertical = true;
    expect(() => {
      placeShips(playerGameboard, ship1, 1, 1);
      placeShips(playerGameboard, ship2, 1, 0);
    }).toThrow("Ship can't be placed here.");
  });

  test('ships can place horizontally', () => {
    const ship = makeShips();
    placeShips(opponentGameboard, ship[2], 0, 0);
    expect(opponentGameboard[0][0].hasShip).toBe(2);
  });
  test('ships can place vertically', () => {
    const ship = makeShips();
    ship[2].vertical = true;
    placeShips(opponentGameboard, ship[2], 0, 0);
    expect(opponentGameboard[0][0].hasShip).toBe(2);
  });

  test('ships cannot be placed out of bounds', () => {
    const ship = makeShips();
    expect(() => {
      placeShips(opponentGameboard, ship[0], 8, 8);
    }).toThrow("Ship can't be placed here.");
  });
  test('ships cannot be placed out of bounds vertical', () => {
    const ship = makeShips();
    ship[0].vertical = true;
    expect(() => {
      placeShips(opponentGameboard, ship[0], 8, 8);
    }).toThrow("Ship can't be placed here.");
  });

  test('ships cannot overlap', () => {
    const ship1 = makeShips()[0];
    const ship2 = makeShips()[1];
    expect(() => {
      placeShips(opponentGameboard, ship1, 0, 0);
      placeShips(opponentGameboard, ship2, 0, 0);
    }).toThrow("Ship can't be placed here.");
  });

  test('ships cannot overlap crossed', () => {
    const ship1 = makeShips()[0];
    const ship2 = makeShips()[1];
    ship2.vertical = true;
    expect(() => {
      placeShips(playerGameboard, ship1, 1, 1);
      placeShips(playerGameboard, ship2, 1, 0);
    }).toThrow("Ship can't be placed here.");
  });
});

describe('receiveAttack', () => {
  beforeEach(() => {
    ships.forEach((ship) => {
      ship.hits = 0;
    });
    for (let i = 0; i < playerGameboard.length; i++) {
      for (let j = 0; j < playerGameboard[0].length; j++) {
        playerGameboard[i][j].hasShip = null;
        playerGameboard[i][j].isHit = false;
      }
    }
    for (let i = 0; i < opponentGameboard.length; i++) {
      for (let j = 0; j < opponentGameboard[0].length; j++) {
        opponentGameboard[i][j].hasShip = null;
        opponentGameboard[i][j].isHit = false;
      }
    }
  });

  test('it should mark the square as hit', () => {
    receiveAttack(playerGameboard, 3, 4);
    expect(playerGameboard[4][3].isHit).toBe(true);
  });

  test('it should throw an error if the square has already been hit', () => {
    playerGameboard[4][3].isHit = true;
    expect(() => receiveAttack(playerGameboard, 3, 4)).toThrow(
      'This square has already been hit!'
    );
  });

  test('it should call the hit method on the ship if there is one', () => {
    placeShips(playerGameboard, ships[0], 3, 4);
    receiveAttack(playerGameboard, 3, 4);
    expect(ships[0].hits).toBe(1);
  });

  test('it should not call the hit method on the ship if there is not one', () => {
    receiveAttack(playerGameboard, 3, 4);
    expect(ships[0].hits).toBe(0);
  });

  test('it should mark the ship as sunk if all of its squares have been hit', () => {
    placeShips(playerGameboard, ships[0], 3, 4);
    receiveAttack(playerGameboard, 3, 4);
    receiveAttack(playerGameboard, 4, 4);
    receiveAttack(playerGameboard, 5, 4);
    receiveAttack(playerGameboard, 6, 4);
    receiveAttack(playerGameboard, 7, 4);
    expect(ships[0].sunk).toBe(true);
  });

  test('it should mark the ship as not sunk if not all of its squares have been hit', () => {
    placeShips(playerGameboard, ships[0], 3, 4);
    receiveAttack(playerGameboard, 3, 4);
    receiveAttack(playerGameboard, 4, 4);
    receiveAttack(playerGameboard, 5, 4);
    receiveAttack(playerGameboard, 6, 4);
    expect(ships[0].sunk).toBe(false);
  });
});
