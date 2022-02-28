const sqlite3 = require('sqlite3') // Importa o sqlite3
const { open } = require('sqlite') // Importa a função open do sqlite

module.exports = () =>
    open({
        filename: './src/db/rocketq.sqlite', // Recebe o caminho do banco de dados com o nome do banco
        driver: sqlite3.Database // Comanda o banco
    })