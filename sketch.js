var ball;
var database, positions;

function setup(){
    createCanvas(500,500);
    database = firebase.database();
    var nodeLocation = database.ref("Ball/Positions");
    nodeLocation.on("value", readop, showError);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref("Ball/Positions").set({
        x:ball.x + x,
        y:ball.y + y
    })
}

function readop(data){
    positions = data.val();
    ball.x = positions.x;
    ball.y = positions.y;
}

function showError(){
    console.log(error);
}
