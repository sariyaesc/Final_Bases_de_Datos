const mysql = require('mysql2');

// Configurar la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',    // Si Laragon está corriendo en tu máquina local, usa localhost
  user: 'root',         // Nombre de usuario predeterminado de MySQL en Laragon
  password: '',         // Contraseña predeterminada (vacía si no has configurado una)
  database: 'libros'    // Nombre de tu base de datos
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err.stack);
    return;
  }
  console.log('Conectado a la base de datos como id ' + connection.threadId);
});

// Exportar la conexión
module.exports = connection;