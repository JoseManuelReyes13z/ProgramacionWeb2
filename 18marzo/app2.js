var miCarro = new Object();
miCarro.marca='Ford';
miCarro.modelo='fiesta';
miCarro.anio='2005';

console.log(miCarro);

var miCarro = {
    marca: 'ford',
    modelo: 'fiesta',
    anio: '2034',
    verificado: false,
    emplacado: true,
    fechaMultas: ["12/23/2004, 03/10/2028"]
}

console.log(miCarro.fechaMultas);

miCarro.color="azul";
console.log(miCarro.color);
console.log(miCarro)

miCarro.modelo="ikon fiesta";
console.log(miCarro)

delete miCarro.verificado;
console.log(miCarro)