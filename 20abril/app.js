// variables globales

// arreglo donde se almacenan los usuarios registrados
// ahora también carga los usuarios guardados en la memoria del navegador
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

// obtener referencia del DOM a los elementos principales del HTML
const form = document.getElementById('formUsuario');
const tabla = document.getElementById('tablaUsuarios');
const inputArchivo = document.getElementById('importarJSON');
const BtnDescargar = document.getElementById('descargarBtn');

// obtener referencia al botón del formulario
// se usa para cambiar el texto cuando se modifica un usuario
const btnGuardar = form.querySelector('button[type="submit"]');

// variable para saber si se está agregando un usuario nuevo o modificando uno existente
let indiceModificar = null;

// función para generar un ID automático
function generarID(){
    return usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
}

// función para guardar los usuarios en la memoria del navegador
function guardarEnMemoria(){
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// evento del formulario de registro
form.addEventListener('submit', 
    function(e) { 
        e.preventDefault(); // evitar que se recargue la página al enviar el formulario

        // obtener los valores de los campos del formulario
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('correo').value.trim();

        // si indiceModificar no es null, significa que se está modificando un usuario
        if(indiceModificar !== null){
            usuarios[indiceModificar].nombre = nombre;
            usuarios[indiceModificar].email = email;

            // regresar el formulario al modo normal de registro
            indiceModificar = null;
            btnGuardar.textContent = 'Guardar';
        }else{
            // agregar nuevo usuario al arreglo de usuarios
            usuarios.push({ id: generarID(), nombre, email });
        }

        guardarEnMemoria(); // guardar los cambios en la memoria del navegador
        mostrarUsuarios(); // actualizar la tabla de usuarios
        form.reset(); // limpiar el formulario
}); 

// función para mostrar los usuarios en la tabla
function mostrarUsuarios() {
    tabla.innerHTML = '';

    usuarios.forEach((user,index) => {
        const row = document.createElement('tr');

        // crear las filas de la tabla con los datos del usuario
        // se agrega el botón modificar junto al botón eliminar
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.nombre}</td>
            <td>${user.email}</td>
            <td>
                <button onclick="modificarUsuario(${index})">Modificar</button>
                <button onclick="eliminarUsuario(${index})">Eliminar</button>
            </td>
        `;

        tabla.appendChild(row);
    });
}

// función para modificar un usuario existente
function modificarUsuario(index) {
    // cargar los datos del usuario seleccionado en el formulario
    document.getElementById('nombre').value = usuarios[index].nombre;
    document.getElementById('correo').value = usuarios[index].email;

    // guardar el índice del usuario que se va a modificar
    indiceModificar = index;

    // cambiar el texto del botón para indicar que ahora se guardarán cambios
    btnGuardar.textContent = 'Guardar cambios';
}

// función para eliminar usuarios
function eliminarUsuario(index) {
    if(confirm('¿Estás seguro de eliminar este usuario?')) {
        usuarios.splice(index, 1); // eliminar usuario del arreglo
        guardarEnMemoria(); // actualizar la memoria del navegador
        mostrarUsuarios(); // actualizar la tabla
    }
}

// evento para importar archivo JSON
inputArchivo.addEventListener('change', 
    function(e) {
    const archivo = e.target.files[0];
    const lector = new FileReader();

    lector.onload = function(e) {
        try {
            const datos = JSON.parse(e.target.result);

            // verificar que el archivo JSON contenga un arreglo de usuarios
            if (Array.isArray(datos)) {
                usuarios = datos;
                guardarEnMemoria(); // guardar usuarios importados en memoria
                mostrarUsuarios(); // actualizar la tabla
            } else {
                throw new Error('El archivo JSON debe contener un arreglo de usuarios');
            }
        }catch (error) {
            alert('Error al cargar el archivo JSON: ' + error.message);
        }
    };

    lector.readAsText(archivo);
});

// evento para descargar usuarios en un archivo JSON
BtnDescargar.addEventListener('click', 
    function() {
        const blb = new Blob([JSON.stringify(usuarios, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blb);
        const a = document.createElement('a');

        a.href = url;
        a.download = 'usuarios.json';

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url);
});

// mostrar usuarios guardados al cargar la página
mostrarUsuarios();