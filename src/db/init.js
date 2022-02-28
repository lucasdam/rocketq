/* Arquivo que será rodado para criar as tabelas do banco de dados */

const Database = require('./config') // Importa o banco

const initDb = { // const para guardar as funções

    async init() {
        const db = await Database() // await para garantir que o 'db' vai ter o conteúdo correto antes de ir para a próxima linha

        // Cria a tabela 'rooms'
        await db.exec(`CREATE TABLE rooms (
            id INTEGER PRIMARY KEY,
            pass TEXT
        )`);

        // Cria a tabela 'questions'
        await db.exec(`CREATE TABLE questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            read INT,
            room INT
        )`);

        await db.close() // Fecha a conexão com o banco de dados

    }
    
}

initDb.init() // Executa a função