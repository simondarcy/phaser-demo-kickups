//Work out screen W&H
var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
//Defaults
var score = 0;
var scoreText;
var speed = 200;

//On load init Phaser game
window.onload = function(){
    //Create new game with 3 main callback functions
    game = new Phaser.Game(w, h, Phaser.AUTO, 'game', {preload: preload, create: create, update: update});
};

function preload() {
    game.stage.backgroundColor = '#3498db';
    //Preload Game assets
    game.load.image('ball', 'img/ball.png');
    game.load.audio('kick', ['audio/kick.mp3']);
}

function create(){
    //Setup physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.checkCollision.down = false;
    //add assets to the game
    kickAudio = game.add.audio('kick');
    scoreText = game.add.text(10, 10, "Score: " + score, { font: '32px Arial', fill: '#ffffff' });
    //Add ball to screen
    addBall();
}

function update(){
    //nothing in here for now
}


function addBall(){
    //Create ball
    var ball = game.add.sprite(game.world.width*0.5, game.world.height*0.5, 'ball');
    //ball attributes
    ball.width = 100;
    ball.height = 100;
    ball.anchor.set(0.5);

    //make ball clickable
    ball.inputEnabled = true;

    //Handle click event
    ball.events.onInputDown.add(function(e){
        //Play sound
        kickAudio.play();
        //update score
        score++;
        scoreText.setText("Score: " + score);
    }, this);

}


