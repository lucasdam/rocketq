const Database = require('../db/config') // Importa o banco de dados

module.exports = {

    async create(req, res) {
        const db = await Database()

        const pass = req.body.password // pass
        let roomId // id

        let isRoom = true

        while (isRoom) { // Enquanto o 'isRoom' for true... faça

            for (var i = 0; i < 6; i++) { // Executa 6x para criar o ID aleatório da sala. Ex: 493088
                i == 0 ? roomId = Math.floor(Math.random() * 10).toString() : // Para não deixar sempre o 0 como primeiro dígito
                    roomId += Math.floor(Math.random() * 10).toString() // Gera um número aleatório entre 0 e 9 e guarda em 'roomId' (concatenando, e não somando -> devido o toString())
            }

            const roomsExistIds = await db.all(`SELECT id FROM rooms`) // Pega todos os 'id' do banco

            isRoom = roomsExistIds.some(roomsExistId => roomsExistId === roomId) // '.some' verifica se essa condição existe, se sim, guarda 'true' em 'isRoom', senão, guarda 'false'. Ou seja, se no banco tiver um 'id' igual ao 'roomId' que acabou de ser criado, retorna 'true', se não, 'false'

            if (!isRoom) { // Mas se 'isRoom' for false, ou seja, se o 'roomId' que foi criado não for igual a nenhum 'id' que já tem no banco, então segue em frente e insere no banco...
                await db.run(`INSERT INTO rooms (id, pass) VALUES (${parseInt(roomId)}, ${pass})`) // Insere o roomId e o password na tabela 'rooms'. parseInt() para transformar o roomId de string para inteiro
            }

            // Se 'isRoom' for false, vai inserir o novo 'id' no banco e encerrar o loop. Se nesse ponto 'isRoom' for true, há uma nova volta no loop para criar um novo 'roomId'

        }
    
        await db.close() // Encerra a conexão

        res.redirect(`/room/${roomId}`) // Redireciona para a página do ID que acabou de ser criado

    },

    async open(req, res) {
        const db = await Database()
        const roomId = req.params.room // Pega o ID da room
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`) // Pega as perguntas do banco e guarda em 'questions' (somente as não lidas)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`) // Pega do banco as perguntas marcadas como lidas
        let isNoQuestions // variável para informar se não há questões

        if (questions == 0) { // Verifica se tem alguma questão não lida
            if (questionsRead.length == 0) { // Verifica se tem alguma questão lida
                isNoQuestions = true // Se não tiver questão de jeito nenhum, seta 'isNoQuestions' para true
            }
        }

        res.render('room', {roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestions: isNoQuestions}) // Controller responsável por renderizar a página room com o ID correto e mandando as questões para o EJS e o 'isQuestions' para dizer se tem pergunta feita ou naõ
    },

    async enter(req, res) {
        const roomId = req.body.roomId // Recebe o 'name="roomId"' do ejs

        res.redirect(`/room/${roomId}`) // Redireciona para a room que tem a senha que o usuário digitou
    }

}