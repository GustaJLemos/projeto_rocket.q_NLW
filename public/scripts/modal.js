export default function Modal(){
    const modalWrapper = document.querySelector('.modal-wrapper')
    const cancelButton = document.querySelector('.button.cancel')

    cancelButton.addEventListener("click", close)

    // função para abrir a nossa modal
    function open(){
        modalWrapper.classList.add("active")
    }

    // função para fechar a nossa modal
    function close(){
        modalWrapper.classList.remove("active")
    }

    return{
        open,
        close
    }
}