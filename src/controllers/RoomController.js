const Database = require ('../db/config') // Importa o banco de dados

module.exports = {

    async create(req, res) {
        const db = await Database()

        const pass = req.body.password // pass
        let roomId // id

        for (var i = 0; i < 6; i++) { // Executa 6x para criar o ID aleatório da sala. Ex: 493088
            i == 0 ? roomId = Math.floor(Math.random() * 10).toString() :
            roomId += Math.floor(Math.random() * 10).toString() // Gera um número aleatório entre 0 e 9 e guarda em 'roomId' (concatenando, e não somando -> devido o toString())
        }

        await db.run(`INSERT INTO rooms (id, pass) VALUES (${parseInt(roomId)}, ${pass})`) // Insere o roomId e o password na tabela 'rooms'. parseInt() para transformar o roomId de string para inteiro

        await db.close() // Encerra a conexão

        res.redirect(`/room/${roomId}`)

    }

}