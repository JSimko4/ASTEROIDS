class Explozia extends HernyObjekt{
    constructor(x,y,rozmery,textura){
        super(x,y,rozmery,textura);
        this.casVytvorenia = new Date();
    }

    onpohyb(){
        // zistim kolko casu ubehlo od vytvorenia explozie ak je explozia na obrazovke dlhsie ako urceny pocet sekund tak ju znicim
        var aktualnyCas = new Date(), dlzkaExistencie = aktualnyCas - this.casVytvorenia;
        if(dlzkaExistencie/1000 >= 0.35)
            game.remove(this);
    }
}