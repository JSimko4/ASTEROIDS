// Simple application abstraction
class App extends Widget {
    constructor(element) {
      var canvas = window.document.getElementById(element)
      var context = canvas.getContext("2d")
      canvas.width = window.innerWidth * 0.90;        // sirka canvas
      canvas.height = window.innerHeight * 0.95;      // vyska canvas
      super(0, 0, canvas.width, canvas.height)
      this.canvas = canvas
      this.context = context
    }
  
    // Redefine draw
    ondraw(context) {
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
  
    // Redraw everything
    update() {
      this.draw(this.context)
    }
  
    // Initialize application handlers
    start() {
      var app = this;
  
      // Register mouse handler
      window.onclick = function (event) {
        var point = {
          x: event.layerX,
          y: event.layerY,
        }
        // Send click message
        app.click(point)
      }
  
      // Register keyb handler
      window.onkeydown = function (event) {
        this.console.log(event.key);

        // Send key message
        app.key(event)
      }
  
      // Update 30time per second
      setInterval(function () {
        app.update()
      }, 1000 / 30)
    }
  }