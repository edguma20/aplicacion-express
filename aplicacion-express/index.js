// Importamos las librerías requeridas
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

// Abre la base de datos SQLite existente
let db = new sqlite3.Database('./basetodos.sqlite3', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Conectado a la base de datos SQLite.');
});

// Inicializa Express y el middleware para JSON
const app = express();
const jsonParser = bodyParser.json();

// Endpoint para listar todas las tareas pendientes
app.get('/lista_todos', function (req, res) {
    const sql = 'SELECT * FROM todos';
    
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({
            message: 'Lista de tareas',
            data: rows
        });
    });
});

// Endpoint para agregar una nueva tarea
app.post('/agrega_todo', jsonParser, function (req, res) {
    const { todo } = req.body;

    if (!todo) {
        return res.status(400).json({ error: 'Falta información necesaria' });
    }

    const createdAt = Math.floor(Date.now() / 1000); // Convertir a segundos

    const stmt = db.prepare('INSERT INTO todos (todo, created_at) VALUES (?, ?)');
    stmt.run(todo, createdAt, function(err) {
        if (err) {
            console.error("Error al insertar el todo:", err.message);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        console.log(`Tarea agregada con éxito. ID: ${this.lastID}`);
        res.status(201).json({ message: 'Tarea agregada con éxito', id: this.lastID });
    });

    stmt.finalize();
});

// Endpoint para probar el servidor
app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ 'status': 'ok' }));
})


//Creamos un endpoint de login que recibe los datos como json
app.post('/login', jsonParser, function (req, res) {
    //Imprimimos el contenido del body
    console.log(req.body);

    //Enviamos de regreso la respuesta
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ 'status': 'ok' }));
})

//Corremos el servidor en el puerto 3000
const port = 3000;

app.listen(port, () => {
    console.log(`Aplicación corriendo en http://localhost:${port}`)
})
