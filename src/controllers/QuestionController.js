const Database = require('../db/config') // Importa o banco de dados

module.exports = {

    async index(req, res) {
        const db = await Database()
        const roomId = req.params.room
        const questionId = req.params.question
        const action = req.params.action
        const password = req.body.password // Esse 'password' vem do atributo 'name' do HTML

        const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`) // db.all pega tudo do banco de dados, mas o db.get só traz um dado. Pega do banco a sala que tem o ID correspondente. Garante que o dado é único já que está pegando por id

        if (verifyRoom.pass == password) { // Verifica se a senha que foi pegue do banco é igual a senha digitada na interface

            // Verifica se a ação (opção que o usuário apertou entre 'marcar como lido' e 'excluir') foi a 'delete' ou a 'check'
            if (action == 'delete') {
                await db.run(`DELETE FROM questions WHERE id = ${questionId}`) // Apaga do banco a questão que tem o ID igual ao id da questão que está sendo passado (da questão que o usuário apertou o botão 'excluir')
            } else if (action == 'check') {
                await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`) // Atualiza o campo check para 1 das questões que tem o ID igual ao id da questão que está sendo passado (da questão que o usuário apertou o botão 'marcar como lida')

                // Lembrando... check = 0 significa 'pergunta não lida' e check = 1 significa 'pergunta marcada como lida'
            }

            res.redirect(`/room/${roomId}`) // Redireciona para a sala do ID que foi pegue

        } else {
            res.render('passincorrect', {roomId: roomId}) // Renderiza a página 'passincorrect' passando o ID da sala. Essa página servirá para informar ao usuário que a senha está incorreta. Depois do aviso, o usuário voltará para a página da room normal
        }

        
    },

    async create(req, res) {
        const db = await Database()

        const question = req.body.question // Pega a pergunta realizada
        const roomId = req.params.room // Pega o ID da sala pela URL

        await db.run(`INSERT INTO questions (title, read, room) VALUES ("${question}", 0, ${roomId})`)

        res.redirect(`/room/${roomId}`) // Redireciona para a sala do ID que foi pegue

    }

}