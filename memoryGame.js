var clickedArray = [];
// created interval global variable to stop timer using clearInterval()
var interval;
var started = false;
// keep track of the elapsed time
var time = 0;
var ready = true;
var numCompleted = 0;

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

function hide(cell){
  cell.style.backgroundColor = "#66ffcc";
  cell.innerHTML = "";
  cell.clicked = false;
}

function complete(cell){
  numCompleted++;
  cell.completed = true;
  cell.style.backgroundColor = "#ff3385";
}

function startTimer(){
  if (started == false){
    interval = setInterval(function(){
      time++;
      document.getElementById("timer").innerHTML = "Time Elapsed: " + time;
    }, 1000)
    started = true;
  }
}

function setUp(){
  document.addEventListener('keydown', function(event){
    if(event.key > 0 && event.key < 10 ){
        grid[event.key - 1].click();
    }
  });

  document.getElementById('restart').addEventListener('click', function(){
    location.reload();
  });

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
        this.style.background = "#00e699";
    });

    cell.addEventListener("mouseleave", function(){
      if(this.completed == false && this.clicked == false)
        this.style.background = "#66ffcc";
    });

    cell.addEventListener('click',function(){
      if(ready == false)
        return;
      startTimer();
      if(this.clicked == false && this.completed == false){
        clickedArray.push(this);
        reveal(this);
      }

      if(clickedArray.length == 2){
        if(clickedArray[0].value == clickedArray[1].value){
          //if a matching pair is found
          complete(clickedArray[0]);
          complete(clickedArray[1]);

          clickedArray = [];

          if(numCompleted == 8){
            alert(`You won in ${time} seconds!`);
            clearInterval(interval);
          }
        } else {
          //if a matching pair is not found
          ready = false;
          document.getElementById("gridTable").style.border = "5px solid red";

          setTimeout(function(){
            hide(clickedArray[0]);
            hide(clickedArray[1]);

            clickedArray = [];

            ready = true;
            document.getElementById("gridTable").style.border = "5px solid black";
          }, 500);
        }
      }
    });
  }
}
