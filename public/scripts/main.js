import Modal from './modal.js'

const modal = Modal()

// mapeando os elementos html que vamos usar
const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')
const checkButtons = document.querySelectorAll(".actions a.check") 
const deleteButton = document.querySelectorAll(".actions a.delete")

// adicionando o EventListener em cada checkButton
checkButtons.forEach(button => {
    button.addEventListener("click", handleClick)
})

// adicionando o EventListener em cada deleteButton
deleteButton.forEach(button => {
    // o deleteButton manda para a função handleClick um false, para que o operador ternário saiba diferenciar qual conteúdo será mostrado "Marcar como lida" ou "Excluir"
    button.addEventListener("click", (event) => handleClick(event, false)) 
})

function handleClick(event, check = true){
    event.preventDefault()

    const text = check ? "Marcar como lida" : "Excluir"
    const slug = check ? "check" : "delete"
    const roomId = document.querySelector("#room-id").dataset.id
    const questionId = event.target.dataset.id
    const form = document.querySelector(".modal form")

    form.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`)

    modalTitle.innerHTML = `${text}`
    modalDescription.innerHTML = `Tem certeza que deseja ${text.toLowerCase()} esta pergunta?`    
    modalButton.innerHTML = `Sim, ${text.toLowerCase()}`

    check ? modalButton.classList.remove("red") : modalButton.classList.add("red")

    modal.open()
}