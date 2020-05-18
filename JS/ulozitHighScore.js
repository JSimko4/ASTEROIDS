// Funkcia ulozi nove vysoke skore potom co hrac zomrie
function ulozitHighScore(najnizsieSkore){
    var textField = new Textfield("Zadaj svoje meno", (canvas.width/2)-135, canvas.height/2.4, 300, 50);
  
    // pozadie po smrti hraca -> uklada sa nove high score
    game.ondraw = function(context){
      context.fillRect(0,0,canvas.width,canvas.height);
  
      context.fillStyle = "white";
      context.font = "Bold 40px Charcoal";
      context.fillText("NOVE VYSOKE SKORE!", (canvas.width/2)-225, 210);
      context.fillStyle = "white";
      context.fillText(game.skore, (canvas.width/2)-30, 260);
    }
  
    textField.action = function() {
      var rovnakeMeno = false;
      // Upozornim hraca ak zada rovnake meno ake uz je ulozene v leaderboard
      for(var i = 0; i < localStorage.length; i++)
        if(textField.text == localStorage.key(i))
          rovnakeMeno = true;
  
      if(rovnakeMeno)
        alert("Zadane meno sa uz nachadza v leaderboard. Zadaj ine/upravene meno");
      else{
        alert(textField.text + " tvoje skore je odteraz ulozene v tabulke leaderboard.");
        if(localStorage.length == 5)
          localStorage.removeItem(najnizsieSkore.keyName); // vymazem najnizsie z vysokych skore iba ak je localstorage uz plny (5 hodnot)
        localStorage.setItem(textField.text, game.skore); // ulozim nove high score
        game.remove(this);    // vymazem text field z obrazovky
        gameOverObrazovka(); // zavolam game over obrazovku
      }
    }
    game.add(textField);
  }