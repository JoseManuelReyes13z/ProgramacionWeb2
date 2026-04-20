// variables globales
// arreglo donde se almacenan los usuarios registrados
let usuarios = [];

// obtener referencia del DOM a los elementos principales
const formRegistro = document.getElementById('formulario');
const tabla = document.getElementById('tablaUsuarios');
const inputArchivo = document.getElementById('importarJSON');
const btnDescargar = document.getElementById('descargarJSON');

// funcion para generar ID automatico
function generarID() {
    return usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
}

// eventos del formulario de registro
formRegistro.addEventListener('submit', function (e) {
    e.preventDefault(); // evitar que se recargue la pagina al enviar el formulario

    // obtener los valores de los campos del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const email = document.getElementById('email').value.trim();

    // agregar nuevo usuario al arreglo de usuarios
    usuarios.push({ id: generarID(), nombre, apellido, email });

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
            <td><button type="button" onclick="eliminarUsuario(${index})">Eliminar</button></td>
        `;

        tabla.appendChild(row);
    });
}

// funcion de edicion
function editarCampo(index, campo, valor) {
    usuarios[index][campo] = valor.trim();
}

// funcion para eliminar usuario
function eliminarUsuario(index) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
        usuarios.splice(index, 1);
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