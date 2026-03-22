let estudiante = {
    matricula: 123456789,
    nombre: "Carlos",
    apellidoPaterno: "Gómez",
    apellidoMaterno: "López",
    edad: 25,
    graduado: true,
    certificado: {
        activo: false
    },
    direccion: {
        via: {
            nombreCalle: "Roble",
            lote: 22,
            manzana: 3
        },
        numeroExterior: "12A",
        colonia: "Del Valle",
        municipio: "Benito Juárez",
        estado: "Jalisco",
        pais: "México",
        continente: "América"
    },
    preescolar: {
        nombre: "Pequeños Genios",
        actividadInicial: function () {
            console.log("dibujar figuras");
        },
        actividadHabitual: function () {
            console.log("leer cuentos");
        },
        datosMaestra: {
            nombre: "Ana",
            edad: 31,
            estudios: "Licenciatura"
        }
    },
    secundaria: {
        nombre: "Revolución Mexicana",
        alimentarse(alimento) {
            return `en este momento está comiendo ${alimento}`;
        },
        aviso(texto) {
            return `${this.nombre} es la Secundaria y el estudiante debe ir a ${texto}`;
        }
    }
}

console.log(estudiante.preescolar.datosMaestra.nombre);
console.log(estudiante.secundaria.aviso("Oficina"));
console.log(estudiante.secundaria.alimentarse("Sándwich"));