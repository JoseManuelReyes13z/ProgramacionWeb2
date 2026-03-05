// Compara un numero 
var numUsuario1 = parseInt(prompt("Dame el primer numero a comparar"));
var numUsuario2 = parseInt(prompt("Dame el segundo numero a comparar"));

if(numUsuario1 < numUsuario2){
    console.log("El numero 2 es mayor");
}else if(numUsuario1 > numUsuario2){
    console.log("El numero 1 es mayor");
}else{
    console.log("Ambos numeros son iguales");
}