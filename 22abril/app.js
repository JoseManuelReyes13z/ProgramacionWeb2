    //importa el modulo de http que vieme con nodejs para crear un servidor web
    const http = require('http');
//definir el puerto en el que se ejecutara el servidor
    const port = 3009;

    const server = http.createServer((req, res) => {
        res.writablehead(200, { 'Content-Type': 'text/plain' });
        res.end('Hola Mundo');
    });
    //escuchar el servidor en el puerto definido
    server.listen(port, () => {
        console.log(`Servidor escuchando en https://localhost:${port}`);
    });

