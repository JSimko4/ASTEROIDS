// FUNKCIA VYTVORI MAIN MENU OBRAZOVKU
function createMainMenu(){
    game.nodes = [];  // fix ked je kliknute main menu z game over screen
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
    var leaderBoardButton = new Button(canvas.width/2, canvas.height/1.4 + 20, 280, 80, "#2B26BF", "LEADERBOARD", 24); // leaderboard button
    
    leaderBoardButton.action = function() {
      nacitaj_Leaderboard();  // nacita hodnoty do game.leaderboardSkore arrayu
      mainMenu.visible = false;
      leaderboard.visible = true;
      // vypise LEADERBOARD
        game.ondraw = function(context){
          context.fillStyle = "black";
          context.fillRect(0,0,canvas.width,canvas.height);
  
          context.fillStyle = "#2B26BF";
          context.font = "Bold 50px Charcoal";
          context.fillText("LEADERBOARD", (canvas.width/2)-175, 70);
  
          // VYPISOVANIE VSETKYCH HIGH SCORES V LEADERBOARD
          for(var i = 0; i < game.leaderBoardSkore.length; i++){
            var poziciaX = canvas.width/2-175, poziciaY = 0;
            context.fillStyle = "white";
            context.font = "Bold 35px Charcoal";
            // Nastavim Y hodnotu aby leaderboard mal nejaky design
            switch(i){
              case 0:
                poziciaY = 150;
                break;
  
              case 1:
                poziciaY = 250;
                break;
  
              case 2:
                poziciaY = 350;
                break;
  
              case 3:
                poziciaY = 450;
                break;
  
              case 4:
                poziciaY = 550;
                break;
            }
            // Vypisem meno hraca a skore
            context.fillText(i+1 + ".", poziciaX-50, poziciaY);
            context.fillText(game.leaderBoardSkore[i].keyName, poziciaX, poziciaY);
            context.fillText(game.leaderBoardSkore[i].skore, poziciaX + 320, poziciaY);
          }
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
      // Hra v main menu vykresluje opat cierny stvoruholnik s nadpisom asteroids
      game.ondraw = function(context){
          context.drawImage(pozadieMainMenu, 0, 0, canvas.width, canvas.height);
      }
    }
    instrukcie.add(backButton);
    game.add(instrukcie); // pridam do game podmenu instrukcie
  
  
    var leaderboard = new Widget(0, 0, canvas.width, canvas.height, false);
    leaderboard.add(backButton); 
    game.add(leaderboard); // pridam do game podmenu leaderboard
  }