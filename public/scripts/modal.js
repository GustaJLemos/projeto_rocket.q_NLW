// vai ter o código específico da modal

// exportando a modal
// o module exports usamos geralmente em require, por isso quando estavamos importando o modal no nosso main ele n estava funcionando, ai trocamos isso por export default
// como eisso n é um javascript comum, eu estou importando e esportando coisas como se fosse módulos por causa disso no meu room.ejs, onde eu linkei o meu script, eu tenho q falar para ele, que eu tbm estou usando módulos
export default function Modal(){
    // pegando o button do cancel
    const modalWrapper = document.querySelector('.modal-wrapper')
    const cancelButton = document.querySelector('.button.cancel')

    cancelButton.addEventListener("click", close)

    function open(){
        //  funcionalidade de atribuir a classe active para a modal
        modalWrapper.classList.add("active")
        // esse trecho estamos chegando na modal wrapper, e adicionando a nossa classe active
        // nesse momento ele ainda n funciona, pq o rrom n sabe da existência do script, então temos q ir lá no rrom e adicionar o nosso main.js
    }

    function close(){
        //  funcionalidade de remover a classe active na modal
        modalWrapper.classList.remove("active")
        // para n ficar repetindo sempre o msm código, vamos criar uma const com esse conteúdo "document.querySelector('.modal-wrapper')"
    }

    return{
        open,
        close
    }
}