var valores = [true, false];


console.log("TABLA AND");
console.log("A         B         Resultado");
console.log("------------------------------");

for (var i = 0; i < valores.length; i++) {
    for (var j = 0; j < valores.length; j++) {
        var a = valores[i];
        var b = valores[j];
        var resultado = a && b;
        console.log(a + "    " + b + "    " + resultado);
    }
}

console.log("\n \n \n"); 

console.log("TABLA OR (||)");
console.log("A         B         Resultado");
console.log("------------------------------");

for (var i = 0; i < valores.length; i++) {
    for (var j = 0; j < valores.length; j++) {
        var a = valores[i];
        var b = valores[j];
        var resultado = a || b;
        console.log(a + "    " + b + "    " + resultado);
    }
}