function createShip(key, name, length) {
  return {
    isPlaced: false,
    key,
    name,
    length,
    vertical: false,
    hits: 0,
    sunk: false,
    hit: function () {
      this.hits++;
      this.sinkCheck();
    },
    sinkCheck: function () {
      if (this.hits >= this.length) {
        this.sunk = true;
        console.log('The ship is sunk!');
      } else {
        this.sunk = false;
        console.log('You hit a ship!');
      }
    },
  };
}

export { createShip };
