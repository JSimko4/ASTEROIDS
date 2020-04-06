var game; // for easier debug

// Just start our application and add some widgets to it
window.onload = function() {
  game = new Game("canvas");

  createMainMenu();  // vytvorim hlavne menu
  
  // zapnem appku -> ukazem hlavne menu
  game.start();
}

function createMainMenu(){
  // MAIN MENU
  var mainMenu = new Widget(0, 0, canvas.width, canvas.height);
  // BUTTON PLAY GAME
  var playGameButton = new Button(canvas.width/2, canvas.height/3, 250, 80, "#2B26BF", "PLAY GAME", 32); // play game button
  playGameButton.action = function() {
    // vytvorim objekty



    // spustim hru


    // APP odteraz vykresluje pozadie hry
    mainMenu.visible = false;
    game.ondraw = function(context){
        context.drawImage(pozadie, 0, 0, canvas.width, canvas.height);
    }
  }
  mainMenu.add(playGameButton);

  // BUTTON INSTRUKCIE
  var instrukcieButton = new Button(canvas.width/2, canvas.height/2, 250, 80, "#2B26BF", "INSTRUKCIE", 32); // instrukcie button
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
  var leaderBoardButton = new Button(canvas.width/2, canvas.height/1.5, 280, 80, "#2B26BF", "LEADERBOARDS", 10); // leaderboard button
  leaderBoardButton.action = function() {
    mainMenu.visible = false;
    leaderboard.visible = true;
    // vypise LEADERBOARDS
      game.ondraw = function(context){
          // spravit LEADERBOARD
            // TODO....
         context.drawImage(pozadie, 0, 0, canvas.width, canvas.height);
    }
  }
  mainMenu.add(leaderBoardButton);
  game.add(mainMenu); // pridam do app cele main menu s buttonami

  
  // INSTRUKCIE MENU
  var instrukcie = new Widget(0, 0, canvas.width, canvas.height, false);
  // BACK vlavo hore
  var backButton = new Button(60, 43, 60, 45, "red", "X", 5);

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
    // APP na instrukciach vykresluje opat cierny stvoruholnik
    game.ondraw = function(context){
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
  }
  instrukcie.add(backButton);
  game.add(instrukcie); // pridam do app podmenu instrukcie

  // LEADERBOARD MENU
  var leaderboard = new Widget(0, 0, canvas.width, canvas.height, false);
  leaderboard.add(backButton); 
  game.add(leaderboard); // pridam do app podmenu leaderboard
}
