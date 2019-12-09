// var gamepattern = [];
// var userclickedpattern = [];
// var buttonCars = ["red", "blue", "yellow", "green"];
// var level = 0;
// var click = -1;
// var count = 1;
// $(".btn ").click(function() {
//
//   var choosencolor = $(this).attr("id");
//   userclickedpattern.push(choosencolor);
//
//   playsound($(this).attr("id"));
//   addanimation($(this).attr("id"));
//   click++;
//   console.log(click);
//   if (userclickedpattern[click] != gamepattern[click]) {
//
//     var gameover = new Audio("sounds/wrong.mp3");
//     gameover.play();
//     $("body").addClass("game-over");
//     $("#level-title").text("Game Over, Press Any Key to Restart");
//
//     setTimeout(function() {
//       $("body").removeClass("game-over");
//     }, 200);
//     click = -1;
//     level = 0;
//     sequence();
//
//
//   } else {
//     if (click + 1 == gamepattern.length) {
//       sequence();
//       click = -1;
//       userclickedpattern = [];
//     }
//
//   }
//
//
// });
// var start = 0;
// $(document).keydown(function() {
//   if (start === 0)
//     sequence();
//
// });
//
//
// function sequence() {
//
//   level++;
//   $("h1").text("Level " + level);
//   var randomnumber = Math.floor(Math.random() * 4);
//   var randomcolor = buttonCars[randomnumber];
//   gamepattern.push(randomcolor);
//
//
//   $("#" + randomcolor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
//   playsound(randomcolor);
//
//
//
//   start++;
//   //console.log(gamepattern);
// }
//
// function addanimation(animbutton) {
//   $("#" + animbutton).addClass("pressed");
//   setTimeout(function() {
//     $("#" + animbutton).removeClass("pressed");
//   }, 100);
// }
//
//
//
// function playsound(randomcolor) {
//   var audio = new Audio("sounds/" + randomcolor + ".mp3");
//   audio.play();
// }

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
$(document).on("tap",function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    $("p").text("Click the blinking blocks to advance to further levels!!");
    nextSequence();
    started = true;
  }
});

$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    $("p").text("Click the blinking blocks to advance to further levels!!");
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("p").text("");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;

}
