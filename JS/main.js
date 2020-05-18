var game; // globalna premenna hry

// Pri nacitani okna sa mi vytvori objekt hra
window.onload = function() {
  game = new Game("canvas"); // globalna premenna game
  createMainMenu();          // vytvorim hlavne menu
  game.start();              // zapnem hru cez metodu objektu game -> zobrazi sa hlavne menu
}

// FUNKCIA na vytvorenie objektov hry -> spustenie po vybere obtiaznosti
function startGame(){
  var hrac;
  var musicButton, audioButton;
  
  game.nodes = [];            // vymazem buttony z menu vyberu obtiaznosti
  gameAudio[0].play();        // zapnem hudbu pri zapnuti hry
  game.skore = 0;             // vynulujem skore
  game.celkovaDlzkaHry = 0;   // vynulujem predchadzajucu dlzku hry
  game.pocetAsteroidov = 0;   // vynulujem pocet Asteroidov
  game.pocetProjektilov = 0;  // vynulujem pocet Projektilov
  game.pocetZivotov = 3;      // nastavim pocet zivotov na 4
  game.level = 1;             // nastavim level na 1

  // zacnem vykreslovat pozadie hry a skore v hornej casti obrazovky
  game.ondraw = function(context){
    context.drawImage(pozadie, 0, 0, canvas.width, canvas.height);
    // VYPISE SKORE
    context.fillStyle = "black";
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
    if(!game.dalsiLevel){ // buttony nevykreslujem ked nastava zmena levelu
      if (this.odKliknute)
        context.drawImage(musicOFF, 15, 15, 55, 50);
      else
        context.drawImage(musicON, 15, 15, 55, 50);
    }
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
    if(!game.dalsiLevel){ // buttony nevykreslujem ked nastava zmena levelu
      if (this.odKliknute)
        context.drawImage(audioOFF, 80, 20, 40, 40);
      else
        context.drawImage(audioON, 80, 20, 40, 40);
    }
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

  // PAUSE BUTTON
  pauseButton = new Button(1335,35,60,55);
  // vykreslovanie ikonky
  pauseButton.ondraw = function(context){
    if(!game.dalsiLevel){ // buttony nevykreslujem ked nastava zmena levelu
      if (this.odKliknute)
        context.drawImage(UNpause, 1320,20,50,50);
      else
        context.drawImage(pause,1320,20,50,50);
    }
  }

  // zapauzovanie
  pauseButton.action = function() {
    if(this.odKliknute){
      this.odKliknute = false;
      game.pause = false;
    }
    else{
      this.odKliknute = true;
      // predtym nez zapauzujem hru musim este vvykreslit zmenu ikonky pauzy a taktiez zavolam funkciu na vykreslenie pause menu
      game.update();
      vykresliPauzu(game.context);
      // zapauzujem hru
      game.pause = true;
    }
  }

  // VYTVORIM ASTEROIDY
  vytvorAsteroidy(game.level, game.zvolenaObtiaznost); // level 1, zvolena obtiaznost
  // VYTVORIM HRACA
  hrac = new Lod(canvas.width/2 - rozmeryLode/2, canvas.height/2+rozmeryLode, rozmeryLode, lodN);
  game.add(hrac); // pridam hraca
  game.add(musicButton); // pridam music button
  game.add(audioButton); // pridam audio button
  game.add(pauseButton); // pridam pause buton
}