 addEventListener("load", (event) => {
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");



canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;


function ranNum(min, max) {
    seed = Math.random();
    seed = Math.floor(seed * (max - (min - 1))) + min;
    return seed;
  }


var keyPress = {
    w: false,
    a: false,
    s: false,
    d: false,
};


 document.addEventListener("keyup", (event) => {});
  onkeyup = (event) => {
    var key = event.key;
    switch (key) {
      case "w":
        keyPress.w = false;
        break;
      case "a":
        keyPress.a = false;
        break;
      case "s":
        keyPress.s = false;
        break;
      case "d":
        keyPress.d = false;
        break;
 }
  };

 document.addEventListener("keydown", (event) => {});
  onkeydown = (event) => {
    console.log("hi");
    var key = event.key;
    switch (key) {
      case "w":
        keyPress.w = true;
        break;
      case "a":
        keyPress.a = true;
        break;
      case "s":
        keyPress.s = true;
        break;
      case "d":
        keyPress.d = true;
        break;
    }
        grid.movePlayer();
         updateGrid();
    grid.renderGrid();
 
  };

var grid = {
  numOfGridCells: 0,
  numInRow: 0,
  numInColumn: 0,
  gridArray: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, "x", 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 1, 1, 0, "o", 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
  cellSize: 50,
  wallColor: "black",
  enemyColor: "green",

  getPlayerCord: function () {
    this.calGrid();
    let r = 0;
    let c = 0;
    for (let i = 0; i < this.numOfGridCells; i++) {
      console.log(r + " " + c);
      if (this.gridArray[c][r] == "x") {
        return [r, c];
      }
      r++;
      if (r > this.numInRow - 1) {
        r = 0;
        c++;
      }
    }
  },

  getRandomCord: function () {
    this.calGrid();
    let r = ranNum(0, this.numInRow - 1);
    let c = ranNum(0, this.numInColumn - 1);
    let lock = true;
    while (lock) {
      
      if (this.gridArray[r][c] === 0) {
        lock = false;
        return [r, c];
      } else {
     r = ranNum(0, this.numInRow - 1);
     c = ranNum(0, this.numInColumn - 1);
      }
    }
    
  },

  getEnemyCord: function () {
    this.calGrid();
    let r = 0;
    let c = 0;
    for (let i = 0; i < this.numOfGridCells; i++) {
      if (this.gridArray[c][r] == "o") {
        return [r, c];
      }
      r++;
      if (r > this.numInRow - 1) {
        r = 0;
        c++;
      }
    }
  },

  calGrid: function () {
    this.numInRow = this.gridArray[0].length;
    this.numInColumn = this.gridArray.length;
    this.numOfGridCells = this.numInRow * this.numInColumn;
  },

  movePlayer: function () {
  const playerCord = this.getPlayerCord();
  let moved = false;

  if (keyPress.w && this.gridArray[playerCord[1] - 1][playerCord[0]] !== 1) {
    this.gridArray[playerCord[1]][playerCord[0]] = 0;
    this.gridArray[playerCord[1] - 1][playerCord[0]] = "x";
    moved = true;
  }
  if (keyPress.a && !moved && this.gridArray[playerCord[1]][playerCord[0] - 1] !== 1) {
    this.gridArray[playerCord[1]][playerCord[0]] = 0;
    this.gridArray[playerCord[1]][playerCord[0] - 1] = "x";
    moved = true;
  }
  if (keyPress.s && !moved && this.gridArray[playerCord[1] + 1][playerCord[0]] !== 1) {
    this.gridArray[playerCord[1]][playerCord[0]] = 0;
    this.gridArray[playerCord[1] + 1][playerCord[0]] = "x";
    moved = true;
  }
  if (keyPress.d && !moved && this.gridArray[playerCord[1]][playerCord[0] + 1] !== 1) {
    this.gridArray[playerCord[1]][playerCord[0]] = 0;
    this.gridArray[playerCord[1]][playerCord[0] + 1] = "x";
    moved = true;
  }
},
  renderGrid: function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.calGrid();
    let r = 0;
    let c = 0;
    for (let i = 0; i < this.numOfGridCells; i++) {
      if (this.gridArray[c][r] == 1) {
        ctx.fillStyle = this.wallColor;
        ctx.fillRect(
          this.cellSize * r,
          this.cellSize * c,
          this.cellSize,
          this.cellSize
        );
      }
      if (this.gridArray[c][r] == "x") {
        ctx.beginPath();
        ctx.arc(
          this.cellSize * r + this.cellSize / 2,
          this.cellSize * c + this.cellSize / 2,
          this.cellSize / 2,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
      if (this.gridArray[c][r] == "o") {
        let oldColor = ctx.fillStyle;
        ctx.fillStyle = this.enemyColor;
        ctx.beginPath();
        ctx.arc(
          this.cellSize * r + this.cellSize / 2,
          this.cellSize * c + this.cellSize / 2,
          this.cellSize / 2,
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.fillStyle = oldColor;
      }
      r++;
      if (r >= this.numInRow) {
        r = 0;
        c++;
      }
    }
  },
};






  class Node {
    constructor(x, y, walkable = true) {
      this.x = x;
      this.y = y;
      this.walkable = walkable;
      this.g = 0;
      this.h = 0;
      this.f = 0;
      this.parent = null;
    }
  }

  function buildNodes(grid1) {
    const nodes = [];
    console.log(grid1.length);
    for (let y = 0; y < grid1.length; y++) {
      nodes[y] = [];
      for (let x = 0; x < grid1[0].length; x++) {
        nodes[y][x] = new Node(x, y, grid1[y][x] === 0 || grid1[y][x] === 'x' ||  grid1[y][x] === 'o');
      }
    }
    console.log(nodes);
    return nodes;
  }

  function heuristic(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }

  function getNeighbors(node, grid1) {
    const neighbors = [];
    const dirs = [
      [0, -1], [1, 0], [0, 1], [-1, 0],
    ];
    for (let [dx, dy] of dirs) {
      const x = node.x + dx;
      const y = node.y + dy;
      if (
        y >= 0 && y < grid1.length &&
        x >= 0 && x < grid1[0].length &&
        grid1[y][x].walkable
      ) {
        neighbors.push(grid1[y][x]);
      }
    }
    console.log(neighbors);
    return neighbors;
  }

  function aStar(start, end, nodes) {
    const openSet = [start];
    const closedSet = [];

    while (openSet.length > 0) {
      let current = openSet.reduce((a, b) => (a.f < b.f ? a : b));

      if (current === end) {
        const path = [];
        while (current) {
          path.unshift([current.x, current.y]);
          current = current.parent;
        }
        return path;
      }

      openSet.splice(openSet.indexOf(current), 1);
      closedSet.push(current);

      for (let neighbor of getNeighbors(current, nodes)) {
        if (closedSet.includes(neighbor)) continue;

        const tentativeG = current.g + 1;
        let isBetter = false;

        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
          isBetter = true;
        } else if (tentativeG < neighbor.g) {
          isBetter = true;
        }

        if (isBetter) {
          neighbor.parent = current;
          neighbor.g = tentativeG;
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
        }
      }
    }
    console.log(openSet);
    return []; // No path
  }
  let chase = 0;
     let randomCord = grid.getRandomCord();

function updateGrid() {
  const playerCord = grid.getPlayerCord();
  const enemyCord = grid.getEnemyCord();

  const nodes = buildNodes(grid.gridArray);
  const startNode = nodes[enemyCord[1]][enemyCord[0]];
  const endNode = nodes[playerCord[1]][playerCord[0]];

  let ranNode = nodes[randomCord[1]][randomCord[0]];
  let path = aStar(startNode, endNode, nodes);
  let ranPath = aStar(startNode, ranNode, nodes);

  if (ranPath.length <= 2) {
    randomCord = grid.getRandomCord();
    ranNode = nodes[randomCord[1]][randomCord[0]];
    ranPath = aStar(startNode, ranNode, nodes);
  }

  if (hasLineOfSight(grid.gridArray, startNode, endNode) && path.length > 1) {
    grid.enemyColor = "red";
    grid.gridArray[enemyCord[1]][enemyCord[0]] = 0;
    grid.gridArray[path[1][1]][path[1][0]] = 'o';
    chase = 3;
  } else {
    if (chase > 0 && path.length > 1) {
      chase--;
      grid.gridArray[enemyCord[1]][enemyCord[0]] = 0;
      grid.gridArray[path[1][1]][path[1][0]] = 'o';
    } else if (ranPath.length > 1) {
      grid.enemyColor = "green";
      grid.gridArray[enemyCord[1]][enemyCord[0]] = 0;
      grid.gridArray[ranPath[1][1]][ranPath[1][0]] = 'o';
    }
  }
}

function hasLineOfSight(grid, start, end) {
    const WALL = 1; // change to your wall cell value

    let x0 = start.x;
    let y0 = start.y;
    let x1 = end.x;
    let y1 = end.y;

    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = (x0 < x1) ? 1 : -1;
    const sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;

    while (true) {
        if (grid[y0][x0] === WALL) return false; // blocked by wall
        if (x0 === x1 && y0 === y1) return true; // reached target

        const e2 = err * 2;
        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
}

  console.log(grid.getEnemyCord());

grid.renderGrid();
console.log(grid.getRandomCord());
 main = () => {
    window.requestAnimationFrame(main);
    



 };
 main();


//For on load.
});