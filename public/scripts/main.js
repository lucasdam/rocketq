import Modal from './modal.js' // Importa o Modal

const modal = Modal() // Adiciona o Modal à uma constante

const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')


const checkButtons = document.querySelectorAll('.actions a.check') // Pega os botões que existem com a classe 'check'

checkButtons.forEach(button => { // Percorre todos os botões 'check'
    button.addEventListener('click', handleCLick) // Fica ouvindo e esperando um click no botão delete. Quando clicar, chama a função 'handleClick'
})


const deleteButton = document.querySelectorAll('.actions a.delete') // Pega os botões que existem com a classe 'delete'

deleteButton.forEach(button => {
    button.addEventListener('click', (event) => handleCLick(event, false)) // Fica ouvindo e esperando um click no botão delete. Quando clicar, chama a função 'handleClick' passando 'false' para a variável 'check'
})


function handleCLick(event, check = true) { // Define 'check' como 'true' para tudo, menos para quem especificou que 'check' seria 'false'
    event.preventDefault() // Impede que o evento padrão ocorra. Nesse caso, diz para o '<a>' não se comportar como um link, para não alterar a URL colocando '#'

    const text = check ? 'Marcar como lida' : 'Excluir pergunta'

    const slug = check ? 'check' : 'delete'
    const roomId = document.querySelector('#room-id').dataset.id
    const questionId = event.target.dataset.id

    const form = document.querySelector('.modal form')
    form.setAttribute('action', `/question/${roomId}/${questionId}/${slug}`) // Altera o valor do atributo 'action' do form. Motando a URL para onde o formulário vai
    
    modalTitle.innerHTML = text // Altera o conteúdo. Se check for true, 'Marcar como lida'. Se for false, 'Excluir pergunta'
    modalDescription.innerHTML = check ? 'Tem certeza que deseja marcar como lida esta pergunta?' : 'Tem certeza que deseja excluir esta pergunta?'
    modalButton.innerHTML = text

    check ? modalButton.classList.remove('red') : modalButton.classList.add('red') // Se 'check' for 'true', remove a classe 'red', que deixará o botão azul. Se 'check' for 'false, adiciona a classe 'red', que deixará o botão vermelho

    modal.open()
}