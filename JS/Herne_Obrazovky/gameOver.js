// Game over obrazovka ktora je zavolana bud po ulozeni vysokeho skore alebo ak hrac nedosiahol nove vysoke skore
function gameOverObrazovka(){
    var gameOverScreen = new Widget(0,0,canvas.width,canvas.height);
    var playGameButton = new Button(canvas.width/2, canvas.height/2.5 + 20, 250, 80, "#2B26BF", "PLAY AGAIN", 32); // play game button
    var mainMenuButton = new Button(canvas.width/2, canvas.height/1.8 + 20, 250, 80, "#2B26BF", "MAIN MENU", 32); // play game button
  
    // pozadie game over screen
    game.ondraw = function(context){
      context.fillRect(0,0,canvas.width,canvas.height);
  
      context.fillStyle = "red";
      context.font = "Bold 40px Charcoal";
      context.fillText("GAME OVER", (canvas.width/2)-125, 210);
      game.context.font = "Bold 30px Charcoal";
      game.context.fillText("Doba prezita vo vesmire: " + game.celkovaDlzkaHry.toFixed(2) + "s", 15, canvas.height-25);
    }
  
    playGameButton.action = function() {
      // vytvorim objekty a hra moze zacat odznova
      startGame();
    }
  
    mainMenuButton.action = function() {
      game.ondraw = function(context){
          context.drawImage(pozadieMainMenu, 0, 0, canvas.width, canvas.height);
      }
      createMainMenu(); 
    }
  
    gameOverScreen.add(playGameButton);
    gameOverScreen.add(mainMenuButton);
    game.nodes = gameOverScreen.nodes;
  }
  
  // FUNKCIA VYTVORI GAME OVER OBRAZOVKU
  function gameOver(){
    game.herneZvuky(2); // prehram zvuk smrti
    gameAudio[0].pause(); // vypnem hudbu pretoze hrac zomrel
    gameAudio[0].currentTime = 0;
    game.nodes = [];
  
    // ulozim si informaciu pre hraca kolko casu stravil pri hre (v sec)
    var predchadzajuciCas = game.dalsiLevelCas, sekundyDoSmrti;
    game.dalsiLevelCas = new Date();
    sekundyDoSmrti = (game.dalsiLevelCas-predchadzajuciCas)/1000;
    game.celkovaDlzkaHry += sekundyDoSmrti;
  
    var noveHighScore = false, ulozeneSkore, keyName;
    // na ulozenie najnizsieho skore ktore nahradim
    var najnizsieSkore = {
      skore: 0,
      keyName: ""
    };
  
    // Zistim ci bolo prekonane nejake najvyssie skore ak ano tak zmenim hodnotu bool..
    for(var i = 0; i < localStorage.length; i++){
      keyName = localStorage.key(i);
      ulozeneSkore = parseInt(localStorage.getItem(keyName), 10);
      // Najdem najnizsie skore z vysokych skor ktore bude nahradene
      if(najnizsieSkore.skore > ulozeneSkore || i == 0){
        najnizsieSkore.skore = ulozeneSkore; 
        najnizsieSkore.keyName = keyName;
      }
      if(game.skore > ulozeneSkore)
        noveHighScore = true;
    }
    // prekonane high score alebo je ulozenych menej ako 5 high scores
    if(noveHighScore || localStorage.length < 5)
      ulozitHighScore(najnizsieSkore);
    else
      gameOverObrazovka();
  }