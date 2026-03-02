let frutas = ["Pera", "Manzana", "fresa", "mango", "aguacate"]

for(let i = 0; i < frutas.length; i++){
    console.log(frutas[i]);
}

console.log("------------------------");
console.log(frutas.length);

console.log("-----------OF-------------");
for(let fruta of frutas){
    console.log(fruta);
}

console.log("-----------in-------------");
for(let fruta in frutas){
    console.log(fruta);
}