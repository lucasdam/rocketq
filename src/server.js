const express = require('express') // Importa o express
const route = require('./route') // Importa o 'route' que foi criado
const path = require('path') // Importa o módulo path

const server = express() // Inicia o express e guarda na const

server.set('view engine', 'ejs') // Informo ao express que a view engine será ejs

server.use(express.static('public')) // Express usará um conteúdo público estático

server.set('views', path.join(__dirname, 'views')) // 'path' pega o caminho da página, join junta esse caminho com o 'dirname' (src/), o que resulta em ".../rocketq/src/views". Fala pro express que os os arquivos não estão simplesmente na pasta views/, e sim em todo esse caminho descrito

server.use(express.urlencoded({extended: true})) // Trabalhando como um middleware... Pega o conteúdo que está vindo do formulário, decodifica e passa para o controller.

server.use(route) // Vai usar o arquivo 'route'

server.listen(3000, () => console.log('RODANDO')) // "node src/server.js" para rodar ou "npm start" pois há um atalho configurado no package.json. Se invés de 'start' for outro nome, usar "npm run outro-nome"