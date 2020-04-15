var game; // for easier debug

// Pri nacitani okna sa mi vytvori objekt hra
window.onload = function() {
  game = new Game("canvas");

  createMainMenu();  // vytvorim hlavne menu

  // zapnem hru cez metodu objektu game -> zobrazi sa hlavne menu
  game.start();
}

// FUNKCIA na vytvorenie objektov hry
function startGame(){
  var hrac, asteroidy = [];
  var musicButton, audioButton;
  
  game.nodes = []; // vymazem hlavne menu
  game.skore = 0; // vynulujem skore
  game.pocetZivotov = 3; // nastavim pocet zivotov na 4
  gameAudio[0].play(); // zapnem hudbu pri zapnuti hry

  // zacnem vykreslovat pozadie hry a skore v hornej casti obrazovky
  game.ondraw = function(context){
    context.drawImage(pozadie, 0, 0, canvas.width, canvas.height);
    // VYPISE NAZOV HRY
    context.font = "Bold 30px Charcoal";
    context.fillText("SKORE: " + game.skore, canvas.width/2.375, 40);
    //VYPISE DOLE VPRAVO ZIVOTY
    context.font = "Bold 37px Helvetica";
    context.fillStyle = "white"; // biely text
    context.fillText(game.pocetZivotov, canvas.width-87, canvas.height-19);
    context.drawImage(zivoty, canvas.width-60, canvas.height-55, 40, 40);
  }

  // MUSIC BUTTON
  musicButton = new Button(32, 35, 45, 45);
  // vykreslovanie ikonky
  musicButton.ondraw = function(context){
    if (this.odKliknute)
      context.drawImage(musicOFF, 15, 15, 55, 50);
    else
      context.drawImage(musicON, 15, 15, 55, 50);
  }

  // vypina/zapina hudbu
  musicButton.action = function() {
    if(this.odKliknute){
      gameAudio[0].play();
      this.odKliknute = false;
    }
    else{
      this.odKliknute = true;
      gameAudio[0].pause();
      gameAudio[0].currentTime = 0;
    }
  }

  // AUDIO BUTTON
  audioButton = new Button(95, 35, 50, 45);
  // vykreslovanie ikonky
  audioButton.ondraw = function(context){
    if (this.odKliknute)
      context.drawImage(audioOFF, 80, 20, 40, 40);
    else
      context.drawImage(audioON, 80, 20, 40, 40);
  }

  // vypina/zapina audio zvuky
  audioButton.action = function() {
    if(this.odKliknute){
      game.mute = false;
      this.odKliknute = false;
    }
    else{
      game.mute = true;
      this.odKliknute = true;
    }
  }
  game.mute = false; // pri play again zapnem automaticky s5 audio

  // VYTVORIM ASTEROIDY
  vytvorAsteroidy(asteroidy, 1, 1); // level 1 obtiaznost 1
  // VYTVORIM HRACA
  hrac = new Lod(canvas.width/2 - rozmeryLode/2, canvas.height/2+rozmeryLode, rozmeryLode, lodN);
  game.add(hrac); // pridam hraca
  game.add(musicButton); // pridam music button
  game.add(audioButton); // pridam audio button
}

 // FUNKCIA VYTVORI ASTEROIDY PRE DANY LEVEL
function vytvorAsteroidy(asteroidy, level, obtiaznost){
  var x, y, rychlostX, rychlostY, nahodnaFarba;
  for(var i = 0; i < 4*obtiaznost*level; i++){
    nahodnaFarba = (Math.random()*5) << 0; // vygenerujem nahodne cislo od 0 do 4 aby som vybral farbu asteroidu

    // TO DO.. -> spravit fix aby sa asteroidy nespawnovali nad start. poziciou hraca
    // TO DO.. -> spravit aby asteroidy na zaklade farby mali ine vlastnosti / vyssia rychlost
    x = Math.random()*canvas.width;
    y = Math.random()*canvas.height;
    rychlostX = Math.random()*2.25;
    rychlostY = Math.random()*2.25;

    asteroidy[i] = new Asteroid(x, y, rychlostX,rychlostY, rozmeryVelkyAsteroid, texturyAsteroidov[nahodnaFarba], false);
    game.add(asteroidy[i]);
  }
}


// FUNKCIA VYTVORI GAME OVER OBRAZOVKU
function gameOver(){
  game.herneZvuky(2); // prehram zvuk smrti
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
  }
  gameAudio[0].pause(); // vypnem hudbu pretoze hrac zomrel
  gameAudio[0].currentTime = 0;
  gameOverScreen.add(playGameButton);
  game.nodes = gameOverScreen.nodes;
}

// FUNKCIA VYTVORI MAIN MENU OBRAZOVKU
function createMainMenu(){
  var mainMenu = new Widget(0, 0, canvas.width, canvas.height);
  // BUTTON PLAY GAME
  var playGameButton = new Button(canvas.width/2, canvas.height/2.5 + 20, 250, 80, "#2B26BF", "PLAY GAME", 32); // play game button
  playGameButton.action = function() {
    // vytvorim objekty a hra moze zacat.
    startGame();
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
  game.add(mainMenu); // pridam do game cele main menu s buttonami

  
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
    // Hra na instrukciach vykresluje opat cierny stvoruholnik s nadpisom asteroids
    game.ondraw = function(context){
        context.drawImage(pozadieMainMenu, 0, 0, canvas.width, canvas.height);
    }
  }
  instrukcie.add(backButton);
  game.add(instrukcie); // pridam do game podmenu instrukcie

  // LEADERBOARD MENU
  var leaderboard = new Widget(0, 0, canvas.width, canvas.height, false);
  leaderboard.add(backButton); 
  game.add(leaderboard); // pridam do game podmenu leaderboard
}
