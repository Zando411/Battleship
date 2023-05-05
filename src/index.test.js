import { createShip } from './ships';
import { makeShips, placeShips, playerGameboard } from './gameboard';

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
        playerGameboard[i][j].hasShip = 10;
      }
    }
  });

  test('ships can place horizontally', () => {
    const ship = makeShips();
    placeShips(ship[2], 0, 0);
    expect(playerGameboard[0][0].hasShip).toBe(2);
  });
  test('ships can place vertically', () => {
    const ship = makeShips();
    ship[2].vertical = true;
    placeShips(ship[2], 0, 0);
    expect(playerGameboard[0][0].hasShip).toBe(2);
  });

  test('ships cannot be placed out of bounds', () => {
    const ship = makeShips();
    expect(() => {
      placeShips(ship[0], 8, 8);
    }).toThrow("Ship can't be placed here.");
  });
  test('ships cannot be placed out of bounds vertical', () => {
    const ship = makeShips();
    ship[0].vertical = true;
    expect(() => {
      placeShips(ship[0], 8, 8);
    }).toThrow("Ship can't be placed here.");
  });

  test('ships cannot overlap', () => {
    const ship1 = makeShips()[0];
    const ship2 = makeShips()[1];
    expect(() => {
      placeShips(ship1, 0, 0);
      placeShips(ship2, 0, 0);
    }).toThrow("Ship can't be placed here.");
  });

  test('ships cannot overlap crossed', () => {
    const ship1 = makeShips()[0];
    const ship2 = makeShips()[1];
    ship2.vertical = true;
    expect(() => {
      placeShips(ship1, 1, 1);
      placeShips(ship2, 0, 0);
    }).toThrow("Ship can't be placed here.");
  });
});
