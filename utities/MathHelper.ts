export class MathHelper{
    static genId(){
        return Math.floor(Math.random()*1000000)+''+Math.floor(Math.random()*1000000);
    }
}