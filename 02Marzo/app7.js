function saludar(){
    console.log("Hola como estas");
}
saludar();

function saludar2(nombre){
    console.log("hola como estas " + nombre);

}

saludar2(" chema");

function saludar3(nombre){
    return "Hola como estas " + nombre;
}

console.log(saludar3("Chema"));