// Simple application abstraction
class Game extends Widget {
    constructor(element) {
      var canvas = window.document.getElementById(element)
      var context = canvas.getContext("2d")
      canvas.width = 1400;        // sirka canvas
      canvas.height = 690;      // vyska canvas
      super(0, 0, canvas.width, canvas.height)
      this.canvas = canvas
      this.context = context

      this.gameLoop;               // gameloop interval
      this.skore = 0;             // skore hráča
      this.mute = false;          // vypnutie / zapnutie audia 
      this.pocetZivotov = 3;     // pocet zivoto hraca
      this.pocetProjektilov = 0; // pocet projektilov vystrelenych z lode
    }

    // funkcia na prehravanie game audia
    // INDEXY: 1 - EXPLOZIA, 2 - SMRT, 3 - STRATA ZIVOTA, 4,5,6 - STRELBA
    herneZvuky(index){
      if(!this.mute) // ak nie je mutnute audio
        gameAudio[index].play();
    }
  
    // Redefine draw
    ondraw(context) {
        context.drawImage(pozadieMainMenu, 0, 0, canvas.width, canvas.height);
    }
  
    // Redraw everything
    update() {
      this.animaciaHry(this.context);
    }
  
    // Initialize application handlers
    start() {
      var game = this;
  
      // Register mouse handler
      window.onclick = function (event) {
        var point = {
          x: event.layerX,
          y: event.layerY,
        }
        // Send click message
        game.click(point)
      }
  
      // Register keyb handler
      window.onkeydown = function (event) {
        // Send key message
        game.key(event)
      }

      window.onkeyup = function (event) {
        // Send key message
        game.key(event)
      }

      // register onmousemove
      window.onmousemove = function(event){
        var pointMove = {
          x: event.layerX,
          y: event.layerY,
        }

        game.mouseMove(pointMove);
      }
  
      // HLAVNY CYKLUS
      game.gameLoop = setInterval(function () {
        game.update()
      }, 1000 / 80)
    }
  }