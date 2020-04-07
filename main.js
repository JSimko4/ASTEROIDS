var game; // for easier debug

// Just start our application and add some widgets to it
window.onload = function() {
  game = new Game("canvas");

  createMainMenu();  // vytvorim hlavne menu

  // zapnem appku -> zobrazi sa hlavne menu
  game.start();
}

  // funkcia na vytvorenie objektov hry
function startGame(){
  var hrac, asteroidy = [];
  // vymazem hlavne menu a ostatne podmenu z GAME
  game.nodes = [];

  // VYTVORIM ASTEROIDY
  vytvorAsteroidy(asteroidy, 1, 1);
  // VYTVORIM HRACA
  hrac = new Lod(canvas.width/2 - rozmeryLode/2, canvas.height/2+rozmeryLode, rozmeryLode, lodN);
  game.add(hrac);
}

 // VYTVORI ASTEROIDY PRE DANE LEVELY
function vytvorAsteroidy(asteroidy, level, obtiaznost){
  var x, y, rychlostX, rychlostY;
  for(var i = 0; i < 3*obtiaznost*level; i++){
    x = Math.random()*canvas.width;
    y = Math.random()*canvas.height;
    rychlostX = Math.random()*2;
    rychlostY = Math.random()*2;

    asteroidy[i] = new Asteroid(x, y, rychlostX,rychlostY, rozmeryVelkyAsteroid/(i+1), asteroidS);
    game.add(asteroidy[i]);
  }
}

function gameOver(){
  var gameOverScreen = new Widget(0,0,canvas.width,canvas.height);
  var playGameButton = new Button(canvas.width/2, canvas.height/2.5 + 20, 250, 80, "#2B26BF", "PLAY AGAIN", 32); // play game button

  // pozadie game over screen
  game.ondraw = function(context){
    context.fillRect(0,0,canvas.width,canvas.height);

    context.fillStyle = "red";
    context.font = "Bold 40px Charcoal";
    context.fillText("GAME OVER", (canvas.width/2)-125, 210);
    //context.drawImage(pozadieMainMenu, 0, 0, canvas.width, canvas.height);
  }

  playGameButton.action = function() {
    // vytvorim objekty a hra moze zacat.
    startGame();
    game.ondraw = function(context){
        context.drawImage(pozadie, 0, 0, canvas.width, canvas.height);
        // VYPISE NAZOV HRY
        context.font = "Bold 35px Charcoal";
        context.fillText("Asteroids", (canvas.width/2)-85, 40);
    }
  }
  gameOverScreen.add(playGameButton);
  game.nodes = gameOverScreen.nodes;
}

function createMainMenu(){
  // MAIN MENU
  var mainMenu = new Widget(0, 0, canvas.width, canvas.height);
  // BUTTON PLAY GAME
  var playGameButton = new Button(canvas.width/2, canvas.height/2.5 + 20, 250, 80, "#2B26BF", "PLAY GAME", 32); // play game button
  playGameButton.action = function() {
    // vytvorim objekty a hra moze zacat.
    startGame();

    game.ondraw = function(context){
        context.drawImage(pozadie, 0, 0, canvas.width, canvas.height);
        // VYPISE NAZOV HRY
        context.font = "Bold 35px Charcoal";
        context.fillText("Asteroids", (canvas.width/2)-85, 40);
    }
  }
  mainMenu.add(playGameButton);

  // BUTTON INSTRUKCIE
  var instrukcieButton = new Button(canvas.width/2, canvas.height/1.8 + 20, 250, 80, "#2B26BF", "INSTRUKCIE", 30); // instrukcie button
  instrukcieButton.action = function() {
    mainMenu.visible = false;
    instrukcie.visible = true;
    // Hra na instrukciach vypisuje instrukcie
    game.ondraw = function(context){
        context.drawImage(instrukciePozadie, 0, 0, canvas.width, canvas.height);
    }
  }
  mainMenu.add(instrukcieButton);

  // BUTTON LEADERBOARD
  var leaderBoardButton = new Button(canvas.width/2, canvas.height/1.4 + 20, 280, 80, "#2B26BF", "LEADERBOARDS", 10); // leaderboard button
  leaderBoardButton.action = function() {
    mainMenu.visible = false;
    leaderboard.visible = true;
    // vypise LEADERBOARDS
      game.ondraw = function(context){
          // spravit LEADERBOARD
            // TODO....
         context.drawImage(vymazat, 0, 0, canvas.width, canvas.height);
    }
  }
  mainMenu.add(leaderBoardButton);
  game.add(mainMenu); // pridam do app cele main menu s buttonami

  
  // INSTRUKCIE MENU
  var instrukcie = new Widget(0, 0, canvas.width, canvas.height, false);
  
  // BACK vlavo hore
  var backButton = new Button(60, 43, 60, 45);
  backButton.ondraw = function(context){
    if (this.hover)
      context.drawImage(backWhite, 30, 25, 60, 45);
    else
      context.drawImage(back, 30, 25, 60, 45);
  }
  // Kliknutie vrati s5 do hlavneho menu
  backButton.action = function(){
    mainMenu.visible = true;
    instrukcie.visible = false;
    leaderboard.visible = false;
    // APP na instrukciach vykresluje opat cierny stvoruholnik s nadpisom asteroids
    game.ondraw = function(context){
        context.drawImage(pozadieMainMenu, 0, 0, canvas.width, canvas.height);
    }
  }
  instrukcie.add(backButton);
  game.add(instrukcie); // pridam do app podmenu instrukcie

  // LEADERBOARD MENU
  var leaderboard = new Widget(0, 0, canvas.width, canvas.height, false);
  leaderboard.add(backButton); 
  game.add(leaderboard); // pridam do app podmenu leaderboard
}
