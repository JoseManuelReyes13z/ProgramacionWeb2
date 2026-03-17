var resCorrecta = 0;
var numVidas = 3;
let numeroMaquina = Math.floor(Math.random() * (10 - 1) + 1);
while(resCorrecta == 0 && numVidas != 0){ 
    var numUsuario = parseInt(prompt("Tienes que adivinar un numero entre el 1 y el 10 tienes 3 intentos\nDame el numero en el que estas pensando"))
    if(numUsuario == numeroMaquina){
        resCorrecta ++;
        console.log("Acertarste");
    } else if(numVidas != 1) {
        numVidas --;
        console.log("Fallaste intentalo de nuevo");
    }else{
        console.log("Perdiste");
        numVidas --;
    }
}