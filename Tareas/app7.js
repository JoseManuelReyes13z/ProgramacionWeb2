// Declaracion de arreglo vacio
const peliculas=[];
const pelicula = prompt("Catalogo de peliculas - ¿Que pelicula le gusta?");
// El push es pa agregar en un arreglo 
peliculas.push(pelicula);

while(confirm("¿Quieres agregar otra peli?")){
    const pelicula = prompt("Catalogo de peliculas - ¿Que pelicula le gusta?");
    peliculas.push(pelicula);
}

console.log('esta es su lista de peliculas');
for (const pelicula of peliculas) {
    console.log(pelicula);
    
}