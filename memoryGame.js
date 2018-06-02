setUp();

function randomNumbers(){
    var numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5];
    numbers.sort(function(){
        return 0.5 - Math.random();
    })
    return numbers;
}

function setUp(){
    var grid = document.getElementsByTagName("td");
    var randomized = randomNumbers();

    for(var i = 0; i < grid.length; i++){
        var cell = grid[i];
        cell.completed = false;
        cell.clicked = false;
        cell.value = randomized[i];
    }
}
