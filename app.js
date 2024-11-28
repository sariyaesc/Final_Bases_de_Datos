const express = require('express');
const cors = require('cors'); // Importar CORS
const db = require('./index'); // Importar la conexión a la base de datos

const app = express();

// Habilitar CORS para permitir solicitudes desde otros orígenes
app.use(cors());

// Middleware para parsear JSON en solicitudes
app.use(express.json());


app.get('/', (req, res) => {
  res.send('¡Hola desde el servidor Express!');
});

app.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});

//#region Seleccionar todos los libros
app.get('/libros', (req, res) => {
    const sql = 'SELECT * FROM libros'; // Consulta para seleccionar todos los libros
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error en la consulta SELECT:', err);
        return res.status(500).send('Error al obtener los libros.');
      }
      res.json(results);  // Enviamos los resultados como respuesta en formato JSON
    });
  });
//#endregion

//#region Seleccionar todos los autores
app.get('/autors', (req, res) => {
    const sql = 'SELECT * FROM autors'; 
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error en la consulta SELECT:', err);
        return res.status(500).send('Error al obtener los autores.');
      }
      res.json(results);  
    });
  });
//#endregion

// #region Seleccionar libro por ID
  app.get('/libros/:id', (req, res) => {
    const id = req.params.id;  // Obtenemos el parámetro 'id' de la URL
  
    const sql = 'SELECT * FROM libros WHERE id = ?';  // Consulta para seleccionar un libro por id
  
    db.query(sql, [id], (err, results) => {
      if (err) {
        console.error('Error en la consulta SELECT por ID:', err);
        return res.status(500).send('Error al obtener el libro.');
      }
  
      if (results.length === 0) {
        return res.status(404).send('Libro no encontrado.');
      }
  
      res.json(results[0]);  // Retornamos el primer resultado (debería ser único por ID)
    });
  });
//#endregion

// #region Seleccionar autor por ID
  app.get('/autors/:id', (req, res) => {
    const id = req.params.id;  // Obtenemos el parámetro 'id' de la URL
  
    const sql = 'SELECT * FROM autors WHERE id = ?';
  
    db.query(sql, [id], (err, results) => {
      if (err) {
        console.error('Error en la consulta SELECT por ID:', err);
        return res.status(500).send('Error al obtener el autor.');
      }
  
      if (results.length === 0) {
        return res.status(404).send('Libro no encontrado.');
      }
  
      res.json(results[0]);  // Retornamos el primer resultado (debería ser único por ID)
    });
  });
  
//#endregion

//#region Seleccionar libros por nombre de categoria

app.get('/libros/categoria/:categoria', (req, res) => {
    const categoria = req.params.categoria;  
  
    const sql = 'SELECT * FROM libros l JOIN categorias c ON l.idcategoria=c.id WHERE c.categoria=? order by l.titulo';
  
    db.query(sql, [categoria], (err, results) => {
      if (err) {
        console.error('Error en la consulta SELECT por ID:', err);
        return res.status(500).send('Error al obtener los libros.');
      }
  
      if (results.length === 0) {
        return res.status(404).send('Libros no encontrado.');
      }
  
      res.json(results);  
    });
  });
//#endregion

//#region Seleccionar libros por id del autor
app.get('/libros/autor_libro/:idautor', (req, res) => {
    const idautor = req.params.idautor;  
  
    const sql = 'SELECT l.* FROM libros l JOIN autor_libro at ON l.id=at.idlibro JOIN autors a ON at.idautor=a.id where at.idautor=?';
  
    db.query(sql, [idautor], (err, results) => {
      if (err) {
        console.error('Error en la consulta SELECT por ID:', err);
        return res.status(500).send('Error al obtener los libros.');
      }
  
      if (results.length === 0) {
        return res.status(404).send('Libros no encontrado.');
      }
  
      res.json(results);  
    });
  });
//#endregion
