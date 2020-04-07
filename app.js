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
    }
  
    // Redefine draw
    ondraw(context) {
        context.drawImage(pozadieMainMenu, 0, 0, canvas.width, canvas.height);
    }
  
    // Redraw everything
    update() {
      this.draw(this.context);
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
      setInterval(function () {
        game.update()
      }, 1000 / 80)
    }
  }