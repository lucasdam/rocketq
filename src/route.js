const express = require('express') // Importa o express

const route = express.Router() // 'route' guarda todas as funcionalidades de rota que o express tem

route.get('/', (req, res) => res.render('index')) // Cria a rota '/' para renderizar a página 'index'
route.get('/room', (req, res) => res.render('room')) // Cria a rota '/room' para renderizar a página 'room'
route.get('/create-pass', (req, res) => res.render('create-pass')) // Cria a rota '/create-pass' para renderizar a página 'create-pass'

module.exports = route // Exporta a const 'route' para ser usada em outros lugares