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
      [1,1,1,0,0,0,1,0,1,1,1],
      [1,1,1,0,0,0,0,0,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1],
   ],
   cellSize: 50,
   wallColor: "black",

   getPlayerCord: function(){
      let r = 0;
      let c = 0;
      for (let i = 0; i < this.numOfGridCells; i++) {
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
         r++;
         if (r >= this.numInRow) {
            r = 0;
            c++;
         }
      }
   }
}


grid.renderGrid();



 main = () => {
    window.requestAnimationFrame(main);
    



 };
 main();


//For on load.
});