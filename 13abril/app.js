function agregarPantalla(value) {
    document.getElementById("pantalla").value += value;
}
function limpiarPantalla() {
    document.getElementById("pantalla").value = "";
}
function calcularResultado() {
    try {
        let resultado = eval(document.getElementById("pantalla").value);
        document.getElementById("pantalla").value = resultado;
    } catch (error) {  
        document.getElementById("pantalla").value = "Error";

    }
}

document.addEventListener("keydown", function(event) {
    const tecla = event.key;
    if ((tecla >= '0' && tecla <= '9') || ['+', '-', '*', '/', '.'].includes(tecla)) {
        agregarPantalla(tecla);
    } else if (tecla === 'Enter') {
        calcularResultado();
    } else if (tecla === 'Backspace') {
        limpiarPantalla();
    }
});