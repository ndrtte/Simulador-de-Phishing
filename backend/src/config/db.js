const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('phishing_simulation_db.db', (err) => {
  if (err) {
    console.error('Error conectando a la DB', err.message);
  } else {
    console.log('Conectado a Base de datos');
  }
});

module.exports = db;