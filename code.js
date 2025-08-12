 addEventListener("load", (event) => {
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");



canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;




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
   numInRow:0,
   numInColumn: 0,
   gridArray: [
      [1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,1,1,1,1,1,1,1],
      [1,0,'x',0,0,0,0,0,0,0,1],
      [1,0,0,0,1,1,1,1,1,0,1],
      [1,1,0,1,1,1,1,1,1,0,1],
      [1,1,0,1,1,1,1,1,1,0,1],
      [1,1,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,0,1,1,0,1,1,1],
      [1,1,1,1,0,1,1,0,1,1,1],
      [1,1,1,0,0,0,1,0,1,1,1],
      [1,1,1,0,'o',0,1,0,1,1,1],
      [1,1,1,0,0,0,0,0,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1],
   ],
   cellSize: 50,
   wallColor: "black",

   getPlayerCord: function(){
      this.calGrid();
      let r = 0;
      let c = 0;
      for (let i = 0; i < this.numOfGridCells; i++) {
               console.log(r + " " + c);
         if (this.gridArray[c][r] == 'x') {
            return [r,c];
         }
         r++;
         if (r > this.numInRow) {
            r = 0;
            c++;
         }
      }

   },
   getEnemyCord: function(){
      this.calGrid();
      let r = 0;
      let c = 0;
      for (let i = 0; i < this.numOfGridCells; i++) {
         if (this.gridArray[c][r] == 'o') {
            return [r,c];
         }
         r++;
         if (r > this.numInRow) {
            r = 0;
            c++;
         }
      }
   },

   calGrid: function() {
      this.numInRow = this.gridArray[0].length;
      this.numInColumn = this.gridArray.length;
      this.numOfGridCells = this.numInRow * this.numInColumn;
   },

   movePlayer: function() {
    playerCord = this.getPlayerCord();
    console.log(playerCord);
    let timer = 0;
    lock = false;
      if (keyPress.w && timer <= 0) {
         if (!this.gridArray[playerCord[1] - 1][playerCord[0]] == 1) {
            this.gridArray[playerCord[1]][playerCord[0]] = 0;
            this.gridArray[playerCord[1] - 1][playerCord[0]] = 'x';
            lock = true;
         }
      }
      if (keyPress.a &&!lock && timer <= 0) {
         if (!this.gridArray[playerCord[1]][playerCord[0] - 1] == 1) {
            this.gridArray[playerCord[1]][playerCord[0]] = 0;
            this.gridArray[playerCord[1]][playerCord[0] - 1] = 'x';
             lock = true;
         }
      }
      if (keyPress.s &&!lock && timer <= 0) {
         if (!this.gridArray[playerCord[1] + 1][playerCord[0]] == 1) {
            this.gridArray[playerCord[1]][playerCord[0]] = 0;
            this.gridArray[playerCord[1] + 1][playerCord[0]] = 'x';
             lock = true;
         }
      }
      if (keyPress.d &&!lock && timer <= 0) {
         if (!this.gridArray[playerCord[1]][playerCord[0] + 1] == 1) {
            this.gridArray[playerCord[1]][playerCord[0]] = 0;
            this.gridArray[playerCord[1]][playerCord[0] + 1] = 'x';
             lock = true;
         }
      }
      if (timer <= 0) {
        timer = 30;
      }
      else {
        timer++;
      }
      console.log(this.gridArray);
   },

   renderGrid: function() {
      ctx.clearRect(0,0,canvas.width,canvas.height)
      this.calGrid();
      let r = 0;
      let c = 0;
      for (let i = 0; i < this.numOfGridCells; i++) {
         if (this.gridArray[c][r] == 1) {
            ctx.fillStyle = this.wallColor;
            ctx.fillRect(this.cellSize * r, this.cellSize * c,this.cellSize,this.cellSize);
         }
         if (this.gridArray[c][r] == 'x') {
            ctx.beginPath();
            ctx.arc((this.cellSize * r) + this.cellSize/2, (this.cellSize * c) + this.cellSize/2, this.cellSize/2, 0, Math.PI * 2); 
            ctx.fill();
         }
         if (this.gridArray[c][r] == 'o') {
            let oldColor = ctx.fillStyle;
            ctx.fillStyle = 'red';
            ctx.beginPath();
            ctx.arc((this.cellSize * r) + this.cellSize/2, (this.cellSize * c) + this.cellSize/2, this.cellSize/2, 0, Math.PI * 2); 
            ctx.fill();
            ctx.fillStyle = oldColor;
         }
         r++;
         if (r >= this.numInRow) {
            r = 0;
            c++;
         }
      }
   }
}






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

  function updateGrid() {
   let playerCord = grid.getPlayerCord();
   let enemyCord = grid.getEnemyCord();
     let nodes = buildNodes(grid.gridArray);
   let startNode = nodes[enemyCord[1]][enemyCord[0]];
  let endNode = nodes[playerCord[1]][playerCord[0]];
  let path = aStar(startNode, endNode, nodes);
  grid.gridArray[enemyCord[1]][enemyCord[0]] = 0;
   grid.gridArray[path[1][1]][path[1][0]] = 'o';

  console.log(path);
  }


  console.log(grid.getEnemyCord());

  updateGrid();

grid.renderGrid();

 main = () => {
    window.requestAnimationFrame(main);
    



 };
 main();


//For on load.
});