import { createShip } from './ships';

describe('createShip', () => {
  test('creates a ship object with the correct length', () => {
    const ship = createShip('Submarine', 3);
    expect(ship.length).toBe(3);
  });

  test('ship is not sunk when hits are less than length', () => {
    const ship = createShip('Submarine', 3);
    expect(ship.sunk).toBe(false);
    ship.hit();
    expect(ship.sunk).toBe(false);
  });

  test('ship is sunk when hits are equal to length', () => {
    const ship = createShip('Submarine', 3);
    expect(ship.sunk).toBe(false);
    ship.hit();
    expect(ship.sunk).toBe(false);
    ship.hit();
    expect(ship.sunk).toBe(false);
    ship.hit();
    expect(ship.sunk).toBe(true);
  });

  test('ship is not sunk when hits are greater than length', () => {
    const ship = createShip('Submarine', 3);
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
});

test('ship name is accessible', () => {
  const ship = createShip('Submarine', 3);
  expect(ship.name).toBe('Submarine');
});
