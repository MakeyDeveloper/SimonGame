alert("apretá alguna tecla para comenzar, luego segui el patron de botones haciendo click sobre cada uno, repitiendo la secuencia en cada nivel")

var buttonColours = ["red", "blue", "green", "yellow"];//nextSequence
var gamePattern = [];//----------------------------------nextSequence

var userClickedPattern = [];//Which Button is Pressed

//Start and Level Set
var level = 0;
var gameStarted = false;
$(document).keydown(function(){
    if (!gameStarted){
        nextSequence();
        gameStarted = true;

    }
})

function startOver(){
    gamePattern = [];
    level = 0;
    gameStarted = false;
}

//Engine
function nextSequence(){
    userClickedPattern = [];

    $('#level-title').text("Level " + level);
    level++;

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    //console.log(gamePattern);

    $("#" + randomChosenColour).fadeOut(150).fadeIn(150);
    playSound(randomChosenColour);
    //console.log(randomChosenColour);
}

//Clicks
$(".btn").click(function (){ //Which Button is Pressed
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    //console.log(userClickedPattern);

    //$(this).fadeOut(150).fadeIn(150);
    animatePress(this);
    playSound(userChosenColour);

    var userLastClickedIndex = userClickedPattern.length - 1;
    checkAnswer(userLastClickedIndex);
});
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    $(audio).get(0).volume = 0.1;
    audio.play();
}
function animatePress(currentColour){
    $(currentColour).addClass("pressed");
    setTimeout(function (){
        $(currentColour).removeClass("pressed");
    }, 100);
}

// Check the User's Answer Against the Game Sequence
function checkAnswer(currentLevel){

        if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
            console.log('succes');
            if(userClickedPattern.length === gamePattern.length){
                setTimeout(function(){
                    nextSequence();
                }, 1000);
            }
            else{
            }
        }
        else{
            //console.log('wrong');
            playSound("wrong");
            $('body').addClass('game-over');
            setTimeout(function(){
                $('body').removeClass('game-over');
            },200);
            $('h1').text('Game Over, Press Any Key to Restart');
            startOver();

        }
}
















