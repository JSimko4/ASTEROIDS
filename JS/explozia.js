class Explozia extends HernyObjekt{
    constructor(x,y,rozmery,textura){
        super(x,y,rozmery,textura);
        this.casVytvorenia = new Date();
    }

    onpohyb(){
        // zistim kolko casu ubehlo od vytvorenia explozie ak je explozia na obrazovke dlhsie ako urceny pocet sekund tak ju znicim
        var aktualnyCas = new Date(), dlzkaExistencie = aktualnyCas - this.casVytvorenia;
        if(dlzkaExistencie/1000 >= 0.15){
            this.sirka -= 6;
            this.vyska -= 6;
            this.x += 3;
            this.y += 3;
            if(this.sirka <= 0.3 || this.vyska <= 0.3)
                game.remove(this);
        }
        else{
            this.x -= 2;
            this.y -= 2;
            this.sirka += 4;
            this.vyska += 4;
        }
    }
}