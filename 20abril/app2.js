// variables globales

// arreglo donde se almacenan los usuarios registrados
// ahora también carga los usuarios guardados en la memoria del navegador
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

// obtener referencia del DOM a los elementos principales
const formRegistro = document.getElementById('formulario');
const tabla = document.getElementById('tablaUsuarios');
const inputArchivo = document.getElementById('importarJSON');
const btnDescargar = document.getElementById('descargarJSON');

// obtener referencia al botón del formulario
// se usa para cambiar el texto cuando se está modificando un usuario
const btnGuardar = formRegistro.querySelector('button[type="submit"]');

// variable para saber si se está agregando un usuario nuevo o modificando uno existente
let indiceModificar = null;

// funcion para generar ID automatico
function generarID() {
    return usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
}

// funcion para guardar los usuarios en la memoria del navegador
function guardarEnMemoria() {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// eventos del formulario de registro
formRegistro.addEventListener('submit', function (e) {
    e.preventDefault(); // evitar que se recargue la pagina al enviar el formulario

    // obtener los valores de los campos del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const email = document.getElementById('email').value.trim();

    // si indiceModificar no es null, significa que se está modificando un usuario existente
    if (indiceModificar !== null) {
        usuarios[indiceModificar].nombre = nombre;
        usuarios[indiceModificar].apellido = apellido;
        usuarios[indiceModificar].email = email;

        // regresar el formulario al modo normal de registro
        indiceModificar = null;
        btnGuardar.textContent = 'Agregar Usuario';
    } else {
        // agregar nuevo usuario al arreglo de usuarios
        usuarios.push({ id: generarID(), nombre, apellido, email });
    }

    guardarEnMemoria(); // guardar los cambios en la memoria del navegador
    mostrarUsuarios(); // actualizar la tabla con los nuevos datos

    // limpiar el formulario
    formRegistro.reset();
});

// mostrar los usuarios registrados en la tabla
function mostrarUsuarios() {
    tabla.innerHTML = ''; // limpiar la tabla antes de mostrar los usuarios

    usuarios.forEach((user, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${user.id}</td>
            <td contenteditable="true" onblur="editarCampo(${index}, 'nombre', this.textContent)">${user.nombre}</td>
            <td contenteditable="true" onblur="editarCampo(${index}, 'apellido', this.textContent)">${user.apellido}</td>
            <td contenteditable="true" onblur="editarCampo(${index}, 'email', this.textContent)">${user.email}</td>
            <td>
                <button type="button" onclick="modificarUsuario(${index})">Modificar</button>
                <button type="button" onclick="eliminarUsuario(${index})">Eliminar</button>
            </td>
        `;

        tabla.appendChild(row);
    });
}

// funcion de edicion
function editarCampo(index, campo, valor) {
    usuarios[index][campo] = valor.trim();
    guardarEnMemoria(); // guardar en memoria cuando se edita directamente desde la tabla
}

// funcion para modificar usuario
function modificarUsuario(index) {
    // cargar los datos del usuario seleccionado en el formulario
    document.getElementById('nombre').value = usuarios[index].nombre;
    document.getElementById('apellido').value = usuarios[index].apellido;
    document.getElementById('email').value = usuarios[index].email;

    // guardar el índice del usuario que se va a modificar
    indiceModificar = index;

    // cambiar el texto del botón para indicar que ahora se guardarán cambios
    btnGuardar.textContent = 'Guardar cambios';
}

// funcion para eliminar usuario
function eliminarUsuario(index) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
        usuarios.splice(index, 1);
        guardarEnMemoria(); // actualizar la memoria del navegador al eliminar
        mostrarUsuarios();
    }
}

// evento de importacion de JSON
inputArchivo.addEventListener('change', function (e) {
    const archivo = e.target.files[0];

    if (!archivo) {
        return;
    }

    const lector = new FileReader();

    lector.onload = function (e) {
        try {
            const datos = JSON.parse(e.target.result);

            if (Array.isArray(datos)) {
                usuarios = datos;
                guardarEnMemoria(); // guardar usuarios importados en memoria
                mostrarUsuarios();
            } else {
                throw new Error('El archivo JSON debe contener un arreglo de usuarios');
            }
        } catch (error) {
            alert('Error al importar el archivo JSON: ' + error.message);
        }
    };

    lector.readAsText(archivo);
});

// evento para descargar el JSON
btnDescargar.addEventListener('click', function () {
    const contenidoJSON = JSON.stringify(usuarios, null, 2);

    const blob = new Blob([contenidoJSON], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'usuarios.json';
    a.click();

    URL.revokeObjectURL(url);
});

// mostrar usuarios guardados al cargar la página
mostrarUsuarios();