const boton = document.querySelector("#botonID1");
const numero = document.querySelector("#numeroID1");
const contenedor = document.querySelector("#contenedorID1");

boton.addEventListener("click", () => {
    contenedor.innerHTML = "";

    let valor = parseInt(numero.value);

    for (let i = 1; i <= valor; i++) {
        const tituloLista = document.createElement("h3");
        tituloLista.textContent = "Lista " + i;
        contenedor.appendChild(tituloLista);

        const lista = document.createElement("ul");

        for (let j = 1; j <= valor; j++) {
            const elemento = document.createElement("li");
            elemento.textContent = "Elemento " + i + "." + j;
            lista.appendChild(elemento);
        }

        contenedor.appendChild(lista);
    }
});