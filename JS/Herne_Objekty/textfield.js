class Textfield extends Widget {
    constructor(text, x, y, w, h) {
      super(x, y, w, h);

      this.text = text;
      this.focus = false;
    }
  
    ondraw(context) {
      if (this.focus)
        context.fillStyle = "#2B26BF";
      else
        context.fillStyle = "white";
      context.fillRect(this.x, this.y, this.sirka, this.vyska);
  

      context.font = "30px Arial";
      if (this.focus) {
        context.fillStyle = "white"
        context.fillText(this.text + "_", this.x+10, this.y+42);
      }
      else{
        context.fillStyle = "black";
        context.fillText(this.text, this.x+10, this.y+42);
      }
    }

    key(key) {
        if(key.type === "keydown" && this.focus)
             this.onkey(key);
  
        this.notify("key", key);
    }

    // Handle keyboard
    onkey(event) {
      var key = event.which;
      switch (key) {
        // Backspace
        case 8:
          this.text = this.text.substring(0, this.text.length - 1);
          break;
        // ENTER
        case 13:
          this.action();
          break;
        // Ostatne
        default:
          if(this.text.length < 12)
            this.text += String.fromCharCode((96 <= key && key <= 105) ? key-48 : key);
      }
    }

  click(point) {
    if (!this.visible) return

    if(point.x > this.x && point.x < this.x + this.sirka &&
      point.y > this.y && point.y < this.y + this.vyska){
        this.onclick(point)
      }
    else
      this.focus = false;

    this.notify("click", point)
  }
  
    onclick(point) {
        this.focus = true;
        this.text = "";
    }

    // By default do nothing
    action() {}
  }