const frutas = ['manzana', 'pera', 'platano', 'jicama']
//for in para imprimir el identificador de cada elemento y for of para el contenido de la cadena+
console.log("este es el for in")
for (fruta in frutas){
    console.log(fruta);
}
console.log("este es el for of")
for (fruta of frutas){
    console.log(fruta);
}
console.log("este es el for each")
// ahora se va a hacer con el for.each
frutas.forEach((fruta, index, Array)=>{
    console.log(fruta);
    console.log(index);
    console.log(Array);
});
console.log("-------------------------");
frutas.forEach((index)=>{
  //esta forma te va a dar el index (investigar despues) del elemento
    console.log(index);
});
console.log("--------------------------")
frutas.forEach((Array)=>{
    console.log(Array);
});