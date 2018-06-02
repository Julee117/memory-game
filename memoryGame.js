var clickedArray = [];

setUp();

function randomNumbers(){
  var numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5];
  numbers.sort(function(){
    return 0.5 - Math.random();
  })
  return numbers;
}

function reveal(cell){
  cell.style.backgroundColor = " #ffff66";
  cell.innerHTML = cell.value;
  cell.clicked = true;
}

function setUp(){
  var grid = document.getElementsByTagName("td");
  var randomized = randomNumbers();

  for(var i = 0; i < grid.length; i++){
    var cell = grid[i];
    // becomes true if "completed" bc it matched with its matching pair
    cell.completed = false;
    // tells whether or not a cell is currently clicked
    cell.clicked = false;
    // represents hidden value of the cell
    cell.value = randomized[i];

    cell.addEventListener("mouseenter", function(){
      if(this.completed == false && this.clicked == false)
        this.style.background = "#ff3385";
    });

    cell.addEventListener("mouseleave", function(){
      if(this.completed == false && this.clicked == false)
        this.style.background = "#66ffcc";
    });

    cell.addEventListener('click',function(){
      if(this.clicked == false && this.completed == false){
        clickedArray.push(this);
        reveal(this);
      }
    });
  }
}
