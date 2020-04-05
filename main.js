var app; // for easier debug

// Just start our application and add some widgets to it
window.onload = function() {
  app = new App("canvas");

  // MAIN MENU
  var mainMenu = new Widget(0, 0, canvas.width, canvas.height);
  // BUTTON PLAY GAME
  var playGameButton = new Button(canvas.width/2, canvas.height/3, 250, 80, "#2B26BF", "PLAY GAME", 35); // play game button
  playGameButton.action = function() {
    // spustim hru

    // APP odteraz vykresluje pozadie hry
    mainMenu.visible = false;
    app.ondraw = function(context){
        context.drawImage(pozadie, 0, 0, canvas.width, canvas.height);
    }
  }
  mainMenu.add(playGameButton);

  // BUTTON INSTRUKCIE
  var instrukcieButton = new Button(canvas.width/2, canvas.height/2, 250, 80, "#2B26BF", "INSTRUKCIE", 32); // instrukcie button
  instrukcieButton.action = function() {
    mainMenu.visible = false;
    instrukcie.visible = true;
    // APP na instrukciach vypisuje instrukcie
    app.ondraw = function(context){
        context.drawImage(instrukciePozadie, 0, 0, canvas.width, canvas.height);
    }
  }
  mainMenu.add(instrukcieButton);

  // BUTTON LEADERBOARD
  var leaderBoardButton = new Button(canvas.width/2, canvas.height/1.5, 280, 80, "#2B26BF", "LEADERBOARDS", 10); // leaderboards button
  leaderBoardButton.action = function() {
    mainMenu.visible = false;
    leaderboard.visible = true;
    // vypise LEADERBOARDS
        app.ondraw = function(context){
         context.drawImage(pozadie, 0, 0, canvas.width, canvas.height);
    }
  }
  mainMenu.add(leaderBoardButton);
  app.add(mainMenu); // pridam do app cele main menu s buttonami

  
  // INSTRUKCIE MENU
  var instrukcie = new Widget(0, 0, canvas.width, canvas.height, false);
  // Krizik vlavo hore
  var krizik = new Button(30, 30, 30, 30, "red", "X", 5);
  // Kliknutie vrati s5 do hlavneho menu
  krizik.action = function(){
    mainMenu.visible = true;
    instrukcie.visible = false;
    leaderboard.visible = false;
    // APP na instrukciach vykresluje opat cierny stvoruholnik
    app.ondraw = function(context){
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
  }
  instrukcie.add(krizik);
  app.add(instrukcie); // pridam do app podmenu instrukcie

  // LEADERBOARD MENU
  var leaderboard = new Widget(0, 0, canvas.width, canvas.height, false);
  leaderboard.add(krizik); 
  app.add(leaderboard); // pridam do app podmenu leaderboard

  // Start the application main loop
  app.start();
}