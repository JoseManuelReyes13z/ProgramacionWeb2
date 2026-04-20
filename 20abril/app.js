// variables y refrencias al DOM
const form = document.getElementById('formulario');
const salida = document.getElementById('salidaJSON');
const descargarBTN = document.getElementById('descargarJSON');

//inicializar el array de usuarios desde localStorage o crear uno nuevo si no existe
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

//funcion para mostrar los usuarios en la salida
mostrarUsuarios();

//evento datos del formulario
form.addEventListener('submit', (e) => {
    e.preventDefault(); // evita recargar la pagina al enviar el formulario
    // obtener los valores del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const email = document.getElementById('email').value.trim();

// crear un objeto con los datos del usuario
    const nuevoUsuario = { 
        nombre: nombre,
        apellido: apellido,
        email: email 
    };
    //agregar al array de usuarios
    usuarios.push(nuevoUsuario);
    //guardar el array actualizado en localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    //mostrar los usuarios actualizados
    mostrarUsuarios();
    //limpiar el formulario
    form.reset();
});

function mostrarUsuarios() {
    salida.textContent = JSON.stringify(usuarios, null, 2); // formatea el JSON con indentación

}

//evento para descargar el JSON
descargarBTN.addEventListener('click', function() {
    const contenidoJSON = JSON.stringify(usuarios, null, 2); // formatea el JSON con indentación
    //crear un blob con el contenido JSON
    //blob es un objeto que representa un archivo de datos en binario
    const blob = new Blob([contenidoJSON], { type: 'application/json' });
    //crear un enlace temporal para descargar el blob
    const url = URL.createObjectURL(blob);
    //crear un enlace de descarga
    const a = document.createElement('a');
    a.href = url;
    a.download = 'usuarios.json';
    a.click(); // simula un clic para iniciar la descarga
    //liberar el objeto URL después de la descarga
    URL.revokeObjectURL(url);

});