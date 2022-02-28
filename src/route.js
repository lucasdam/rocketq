const express = require('express') // Importa o express
const QuestionController = require('./controllers/QuestionController') // Importa o QuestionController
const RoomController = require('./controllers/RoomController') // Importa o RoomController

const route = express.Router() // 'route' guarda todas as funcionalidades de rota que o express tem

route.get('/', (req, res) => res.render('index', {page: 'enter-room'})) // Cria a rota '/' para renderizar a página 'index'. Está sendo passado uma variável em 'page' para renderizar também a parte de página 'enter-room'
route.get('/create-pass', (req, res) => res.render('index', {page: 'create-pass'})) // Cria a rota '/create-pass' para renderizar a página 'index'. Está sendo passado uma variável em 'page' para renderizar também a parte de página 'create-pass'

route.get('/room/:room', (req, res) => res.render('room')) // Cria a rota '/room' para renderizar a página 'room'

route.post('/question/:room/:question/:action', QuestionController.index) // Esse é o formato que o formulário do modal tem que passar a informação. Passa o 'QuestionController' para a rota. Implicitamente o 'QuestionController.index' está recebendo req, res daqui da rota
route.post('/create-room', RoomController.create) //Formulário do botão de criar sala

module.exports = route // Exporta a const 'route' para ser usada em outros lugares