var game; // globalna premenna hry

// Pri nacitani okna sa mi vytvori objekt hra
window.onload = function() {
  game = new Game("canvas");

  createMainMenu();  // vytvorim hlavne menu
  // zapnem hru cez metodu objektu game -> zobrazi sa hlavne menu
  game.start();
}

// funkcia zobrazi hracovi obrazovku na vyber obtiaznosti a zavola funkciu StartGame ktora zacne hru
function vyberObtiaznosti(){
  var easyButton, mediumButton, hardButton, playGameButton;
  game.nodes = []; // vymazem hlavne menu

  // Cierne pozadie a text vyber obtiaznosti
  game.ondraw = function(context){
    var obtiaznost;
    context.fillRect(0,0,canvas.width,canvas.height);

    context.fillStyle = "white";
    context.font = "Bold 40px Charcoal";
    context.fillText("VYBER SI OBTIAZNOST", (canvas.width/2)-240, 225);
    context.font = "18px Verdana";
    switch(game.zvolenaObtiaznost){
      case 1: obtiaznost = "LAHKA";
              break;
      case 2: obtiaznost = "STREDNA";
              break;
      case 3: obtiaznost = "TAZKA";
              break;
    }
    context.fillText("Zvolena obtiaznost: " + obtiaznost, 20, 40);
  }

  // Button pre lahku obtiaznost
  easyButton = new Button(canvas.width/2 - 250, (canvas.height/2)-25, 200, 80, "green", "LAHKA", 45);
    easyButton.action = function() {
      game.zvolenaObtiaznost = 1;
  }
  easyButton.specialnyHOVER = function (){}

  // Button pre strednu obtiaznost 1.5
  mediumButton = new Button(canvas.width/2, (canvas.height/2)-25, 200, 80, "orange", "STREDNA", 25);
  mediumButton.action = function() {
    game.zvolenaObtiaznost = 2;
  }
  mediumButton.specialnyHOVER = function (){}

  // Button pre tazku obtiaznost  1.2
  hardButton = new Button(canvas.width/2 + 250, (canvas.height/2)-25, 200, 80, "red", "TAZKA", 50);
  hardButton.action = function() {
    game.zvolenaObtiaznost = 3;
  }
  hardButton.specialnyHOVER = function (){}

  playGameButton = new Button(canvas.width/2, (canvas.height/1.5), 200, 80, "#2B26BF", "PLAY", 58); // play game button
  playGameButton.action = function() {
    // vytvorim objekty so zvolenou obtiaznostou a hra moze zacat.
    startGame();
  }

  game.add(easyButton);
  game.add(mediumButton);
  game.add(hardButton);
  game.add(playGameButton);
}


// FUNKCIA na vytvorenie objektov hry
function startGame(){
  var hrac;
  var musicButton, audioButton;
  
  game.nodes = []; // vymazem buttony z menu vyberu obtiaznosti
  game.skore = 0; // vynulujem skore
  game.pocetZivotov = 3; // nastavim pocet zivotov na 4
  game.level = 1;       // nastavim level na 1
  game.pocetAsteroidov = 0; // vynulujem pocet Asteroidov
  gameAudio[0].play(); // zapnem hudbu pri zapnuti hry

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

  // PAUSE BUTTON
  pauseButton = new Button(1335,35,60,55);
  // vykreslovanie ikonky
  pauseButton.ondraw = function(context){
    if (this.odKliknute)
      context.drawImage(UNpause, 1320,20,50,50);
    else
      context.drawImage(pause,1320,20,50,50);
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
      game.animaciaHry(game.context);
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

 // FUNKCIA VYTVORI ASTEROIDY PRE DANY LEVEL
function vytvorAsteroidy(level, obtiaznost){
  var asteroidy = [];
  var x, y, rychlostX, rychlostY, nahodnaFarba, pocetAsteroidovNaVytvorenie = 2+level;
  for(var i = 0; i < pocetAsteroidovNaVytvorenie*obtiaznost; i++){
    nahodnaFarba = Math.floor(Math.random() * 5); // vygenerujem nahodne cislo od 0 do 4 aby som vybral farbu asteroidu
    // TO DO.. -> spravit aby asteroidy na zaklade farby mali ine vlastnosti / vyssia rychlost

    x = Math.random()*canvas.width;
    y = Math.random()*canvas.height;
    rychlostX = Math.random()*2.25;
    rychlostY = Math.random()*2.25;
    // Osetrenie predtym aby sa asteroidy spawnovali nad zaciatocnou poziciou hraca
    if(x - rozmeryVelkyAsteroid*2 <= canvas.width/2 + rozmeryLode && x + rozmeryVelkyAsteroid*2 >= canvas.width/2 - rozmeryLode &&
       y - rozmeryVelkyAsteroid*2 <= canvas.height/2 - rozmeryLode && y +rozmeryVelkyAsteroid*2 >= canvas.height/2 + rozmeryLode){
      i--;
      continue;
    }

    asteroidy[i] = new Asteroid(x, y, rychlostX,rychlostY, rozmeryVelkyAsteroid, texturyAsteroidov[nahodnaFarba], false);
    game.pocetAsteroidov++;
    game.add(asteroidy[i]);
  }
}

function nextLevel(level, obtiaznost){
  vytvorAsteroidy(level, obtiaznost);

  var HRAC;
  for(var i = 0; i < game.nodes.length; i++){
    HRAC = game.nodes[i];
    if(HRAC instanceof Lod){ // Najdem hraca a resetujem jeho poziciu (Hladam ho pretoze v game nodes mam aj projektily)
      // restartujem poziciu hraca na X, Y, uhol a jeho aktualnu rychlost
      HRAC.x = canvas.width/2 - rozmeryLode/2;
      HRAC.y = canvas.height/2 + rozmeryLode;
      HRAC.velX = 0;
      HRAC.velY = 0;
      HRAC.a = 0;
    }
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
    // hrac si vybere obtiaznost a hra sa zacne
    vyberObtiaznosti();
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

function vykresliPauzu(context){
    var vyska = 200*0.7;
    var sirka = 605*0.75;
    let napovedy = [
    'Červené asteroidy sú nebezpečné kvôli ich vysokej rýchlosti',
    'Modré asteroidy sú z takmer nezničiteľného materiálu',
    'Zlaté asteroidy pridávajú po ich zničení dvojnásobné skóre',
    'Zelený asteroid sa po zničení rozbije na 4 menšie asteroidy',
    '        Sivé asteroidy nemajú žiadne špeciálne vlastnosti',];
    let nahodnaNapoveda = Math.floor(Math.random() * 5); // nahodna napoveda od 0 do 4


    context.fillStyle = 'rgba(7, 2, 2, 0.3)'; // zatmavenie okolia
    context.fillRect(0,0,canvas.width, canvas.height,); // zatmavenie okolia
    context.drawImage(zapauzovanaHra, 444, 245, sirka, vyska); // presypacie hodiny v strede
    context.drawImage(UNpause, 1320,20,50,50); // prekreslim ikonku pauzy aby bola lepsie viditelna
    context.fillStyle = "black";
    context.font = "Bold 30px Charcoal";
    context.fillText("SKORE: " + game.skore, canvas.width/2.375, 40); // prekreslim skore aby ho bolo jasne vidiet aj pocas pauzy
    context.fillStyle = "white";
    context.font = "13.7px Charcoal";
    context.fillText(napovedy[nahodnaNapoveda], 560, 320);


    for(var i = 0; i < napovedy.length; i++)
      console.log(napovedy[i])
}