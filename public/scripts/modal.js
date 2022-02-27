export default function Modal() { // Exporta a função, o que permite que ela seja importada e utilizada em outro local

    const modalWrapper = document.querySelector('.modal-wrapper')
    const cancelButton = document.querySelector('.button.cancel') // Pega o botão cancelar

    cancelButton.addEventListener('click', close) // Fica ouvindo... Quando for clicado, executa a função 'close'

    function open() {
        modalWrapper.classList.add('active') // Adiciona a classe 'active' onde houver a classe 'modal-wrapper'
    }

    function close() {
        modalWrapper.classList.remove('active') // Remove a classe 'active' onde houver a classe 'modal-wrapper'
    }

    return {
        open,
        close
    }

}