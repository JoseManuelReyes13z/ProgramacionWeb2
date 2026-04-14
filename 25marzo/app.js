// definir el arreglo 
let tareas=[];

//funcion para mostrar el meno
function mostrarMenu(){
    return parseInt(prompt(`
        opciones disponibles
        1.-agregar una tarea 
        2.-ver todas las tareas 
        3.-marcar tareas como completadas
        4.-salir
        "Elige una opcion"`));
}

//funcion para agregar las tareas
function agregarTarea(){
    let nombre = prompt("introduce un nombre para la tarea: \n")
    if(nombre){
        let tarea={
            nombre: nombre,
            completado: false
        }
        tareas.push(tarea);
    }else{
        alert("El nombre de la tarea no puede estar vacio")
    }
}

//funcion para ver las tareas
function verTarea(){
    if(tareas.length === 0){ 
        alert("lista de tareas vacia")
    }else{
        let mensaje = "lista de tareas \n";
        tareas.forEach((tarea, index) => {
            mensaje+=`${index + 1} .- ${tarea.nombre} [${tarea.completada ? "completada":"pendiente"}]\n`; 
        })
        alert(mensaje);
    }
}

//funcion para marcar las tareas como completadas
function marcarTareaCompletada(){
    let numero = parseInt(prompt("ingresa el numero de tarea para marcarla como completada "))
    if(numero > 0 && numero <= tareas.length){
        tareas[numero-1].completada = false;
        alert(`
        La tarea: ${tareas[numero-1].nombre} se marco como completada
            `)

    }else{
        alert("numero de tarea invalido")
    }
}

//funcion de inicio para el flujo de nuestro programa
function iniciarPrograma(){
    let Bandera = true;
    while(Bandera){
        let opcion = mostrarMenu();
        switch(opcion){
            case 1:
                agregarTarea();
                break;
            case 2:
                verTarea();
                break;
            case 3:
                marcarTareaCompletada();
                break;
            case 4:
                alert("Saliendo del programa");
                Bandera = false;
                break;
            default:
                alert("Opcion no valida");
        }
    }
}

iniciarPrograma();