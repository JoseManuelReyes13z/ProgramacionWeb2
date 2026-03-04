let nombreUsuario = "chema";
let estado = true;

if(estado){
    console.log(`Ganaste: ${nombreUsuario}`)
}else{
    console.log(`Perdiste: ${nombreUsuario}`)
}
console.log("______________________________________")
console.log(`
    ${estado ? 'ganaste' : ' perdiste'} ${nombreUsuario}
    `);