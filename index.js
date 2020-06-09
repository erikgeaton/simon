//globel arrays and variables
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

//generates random number between 0 and 3
function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  level++
  if (level > 0){
    $("h1").text("Level "+level);
  } 

}

//user clicks button and id is passed into the users chosen array
$(".btn").on("click", function (e) {
  var userChosenColor = e.target.id;
  userClickedPattern.push(userChosenColor)

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1)
});

//audio function for both click and sequence
function playSound(name){
  var colorAudio = new Audio ("sounds/"+name+".mp3");
  colorAudio.play();
} 

//user click animation
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed").delay(100).queue(function(){
    $(this).removeClass("pressed");
    $(this).dequeue();
});
}

//starts games
$("body").keydown(function (e) { 
  if(level === 0){
    nextSequence() 
    started = true;
  } 
  
});


// checks users answers and input view comupter array 
function checkAnswer(currentLevel){
  console.log(currentLevel)
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if(gamePattern.length === userClickedPattern.length){
      setTimeout(() => {  nextSequence(); }, 1000);
    }

  } else {
    $('body').addClass("game-over").delay(200).queue(function(){
      $(this).removeClass("game-over");
      $(this).dequeue();
      var wrongAudio = new Audio ("sounds/wrong.mp3");
      wrongAudio.play();
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
  })
}
}

// If user is wrong :( 

function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;

}