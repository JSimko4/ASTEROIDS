function vzdialenostBodov(x1, y1, x2, y2){
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1,2));
}

class Projektil extends HernyObjekt{
    constructor(x, y, velX, velY, rozmery, textura){
        super(x, y, rozmery, textura);
        this.x = x;
        this.y = y;

        this.velY = velY;
        this.velX = velX;
        this.urazenaVzdialenost = 0;
    }

    onpohyb(context){
        // po urcitej vzdialenosti vymazem projektil z hry
        if(this.urazenaVzdialenost > 0.325 * canvas.width){
            game.remove(this);
            game.pocetProjektilov--;
        }
        else{ // ak projektil este neurazil maximalnu vzdialenost tak sa hybe dalej
            this.x += this.velX;
            this.y -= this.velY;
            this.urazenaVzdialenost += Math.sqrt(Math.pow(this.velX, 2) + Math.pow(this.velY,2));
        }
    } 

    ondraw(context){
        this.kolizia(context); // vykonam koliziu
        this.pohyb(context); // vykonam pohyb objektov
    
        context.fillStyle="salmon";
        context.beginPath();
        context.arc(this.x, this.y, this.sirka/2, 0, Math.PI * 2, false);
        context.fill();
    }

    onkoliziaObjekty(context){   
        var asteroid;
        for(var i = 0; i < game.nodes.length; i++){
            asteroid = game.nodes[i];
            if(asteroid instanceof Asteroid){ // testujem ci sa jedna fakt o asteroid (v game nodes mam aj hraca, buttony a dalsie projektily)
            if(vzdialenostBodov(this.x, this.y, asteroid.x+asteroid.sirka/2, asteroid.y+asteroid.sirka/2) < this.sirka/2.75 + asteroid.sirka/2.15){
                if(asteroid.HP == 0) // skontrolujem ci sa nejedna o modry asteroid ktory ma viac zivota
                     asteroid.znicenieADuplikacia(asteroid); // znicim asteroid, ktory sa rozdvoji na dalsie mini asteroidy
                else    
                    asteroid.HP--;

                game.remove(this);                      // znicim projektil
                game.pocetProjektilov--;                // znizim pocet projektilov na hernej ploche
                break;
                }
            }
        }
    }
}

