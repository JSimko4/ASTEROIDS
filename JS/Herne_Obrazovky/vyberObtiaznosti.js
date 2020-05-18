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