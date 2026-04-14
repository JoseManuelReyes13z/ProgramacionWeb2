let productos =[
    {nombre: 'camisa',   precio: 300},
    {nombre: 'pantalon', precio: 550},
    {nombre: 'zapatos',  precio: 750},
    {nombre: 'sombrero', precio: 550},
    {nombre: 'tenis',    precio: 1200}
];

let carrito=[];

/*-funcion para mostrar el menu de productos mas 2 funciones-*/
function  mostrarMenu(){
   let menu = "Seleccione un producto para agregar al carrito\n";
   for( let i = 0 ;i< productos.length ; i++ ){
        menu += (i+1)+" .- " + productos[i].nombre + "- $"+ productos[i].precio+"\n";
   } 

   menu += (productos.length+1)+".- Ver carrito y Total\n";
   menu += (productos.length+2)+".- Agregar nuevo producto a la tienda\n";
   menu += (productos.length+3)+".- Salir\n";

   return menu;
}

function agregarAlCarrito(index){  
    let productoSeleccionado = productos[index];
    carrito.push(productoSeleccionado);
    console.log(`Producto ${productoSeleccionado.nombre} se agrego al carrito`);
}

function mostrarCarritoTotaL(){
    if(carrito.length===0){
        console.log("El carrito esta vacio");
    }else{
        let mensajeCarrito ="Carrito de compras\n";
        let total = 0;
        for ( let i = 0; i<carrito.length;i++){
            mensajeCarrito+= (i+1)+" .- "+carrito[i].nombre+" - $"+carrito[i].precio+"\n";
            total+= carrito[i].precio;
        }
        mensajeCarrito+="\n Total: $"+total;
        console.log(mensajeCarrito);
    }
}

/* NUEVA FUNCION */
function agregarProductoATienda(){
    let nombre = prompt("Ingresa el nombre del nuevo producto:");
    let precio = prompt("Ingresa el precio del producto:");

    precio = Number(precio);

    if(nombre && !isNaN(precio) && precio > 0){
        productos.push({nombre: nombre, precio: precio});
        console.log(`Producto ${nombre} agregado correctamente con precio $${precio}`);
    }else{
        console.log("Datos invalidos, no se agrego el producto");
    }
}

/*--Menu de inicio--*/ 
let opcion;
do{
    opcion = prompt(mostrarMenu());
    opcion = Number(opcion);

    if(isNaN(opcion)|| opcion<1 || opcion>productos.length+3){
        console.log("Opcion no valida, por favor intenta nuevamente");
    }else if( opcion >= 1 && opcion <= productos.length){
        agregarAlCarrito(opcion-1);
    }else if( opcion === productos.length+1 ){
        mostrarCarritoTotaL();
    }else if( opcion === productos.length+2 ){
        agregarProductoATienda();
    }

}while( opcion !== productos.length+3);

console.log("Gracias por su compra :)");