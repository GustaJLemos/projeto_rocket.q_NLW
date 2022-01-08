// aq vamos colcoar todos os eventos, todos os detalhezinhos feito com javascript, detalhes de front-end

// importando a modal
import Modal from './modal.js'

const modal = Modal()

// tem uma parte da modal q é diferente quando clica no marcar como lida e outra no excluir, vamos mudar isso usando o js
// agora vamos mapear os elementos html, oq é mapear? é fazermos o querySelector, para q a gente consiga mudar eles usando o javascript
const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')

// pegar todos os botões que existem com a classe check
const checkButtons = document.querySelectorAll(".actions a.check") // estamos pegando a classe action com a tag a e com a classe check, é importante deixarmos mais "especifico" doq só escrever check, pq assim, se em outro lugar do nosso código tiver outra classe check o js não pega

// proximo passo, adicionar, botão a botão o nosso event listner de click
// oq é event litner? event de evento, listner de escutar, é como se eu colcoasse uma escuta em cada elemento, em cada botão, pra ficar escutando ele, quando o mouse vir clicar no marcar como lido, ou no excluir e ai ele vai descobrir q o mouse clicou , e assim por diante, até percorrer todo o for each

                    // esse parãmetro vai ser onde o foreach, quando estiver passando em cada check, o objeto em si q o for each está passando, vai ser guardada nessa variável button, foreach vai passar a primeira vez, vai colocar o eventlistener, e vai guardar na nossa variável button
checkButtons.forEach(button => { // usamos o for each para percorrer todos os botões que temos dentro do checkButtons, como temos 3 botões de check, o forEach vai fazer isso daq, uma vez para cada botão no meu html
    // adicionar a escuta em cada um dos check
    
    button.addEventListener("click", handleClick
    // button.addEventListener("click", event => { assim era como a função estava antes do handleclick }
        // aq vamos mudar o titulo o p e o button do nosso button quando clicamos no marcar como lida
        // modalTitle.innerHTML = "Marcar como lida" // inner html é para trocarmos algo que já está escrito dentro do html
        // modalDescription.innerHTML = "Tem certeza que você deseja excluir esta pergunta?"
        // modalButton.innerHTML = "Sim, excluir"
        
        // abrir a modal
        // modal.open() // aq estamos chamando a função open do nosso arquivo modal
    ) // dentro dos parâmetros colocamos oq queremos escutar, poderiamos querer escutar por ex hover (quando passar o mouse por cima) mas nesse caso queremos escutar o click, a segunda coisa é oq vamos fazer quando escutarmos o click
    // esse primero nome é só o nome apra a gene fazer referência doq a gente quer botar o eventlistener, então pode ser qualquer nome, mas para ficar claro pra gente oq a gente quer fazer vamos deixar como button
})
// ou seja, explicando esse trecho de código vai pegar todos os marcar como lido q existem no html, quando um marcar como lido for clicado, o eventlistener vai estar escutando, e quando for clicado ele vai rodar o modal.open que por sua vez vai abrir o arquivo modal e executar oq está lá dentro

// pegar quando o marcar como lido for clicado


// agora vamos fazer a mesma coisa porém apra o button de excluir
//  quando o delete for clicado ele vai abrir a modal
const deleteButton = document.querySelectorAll(".actions a.delete")

deleteButton.forEach(button => {
    // como no nosso check button a gente mudou o conteúdo html, para ele fazer sentido quando clicarmos no marcar como lida, ele vai ficar com esse contéudo até dizermos o contrário, então para q isso n aconteça, ai a gente vai mudar isso dnv, para q ele fique com o excluir pergunta, e não marcar como lida, ou seja, vaamos fazer com q volte ao normal
//     modalTitle.innerHTML = "Excluir pergunta"
//     modalDescription.innerHTML = "Tem certeza que você deseja excluir esta pergunta?"
//     modalButton.innerHTML = "Sim, excluir"
                                                                    // check = false eu n preciso escrever o check na frente, só o false, e ele entende q estou falando do check, ai automaticamenete o false vai ser atribuido no check
    button.addEventListener("click", (event) => handleClick(event, false)) // aq precisamos fazer uma arrow function para passar o event
    // ao invés de repitirmos todos esses comandos, vamos criar uma função q faça tudo

})

// estamos passando para o hancleclick, um event, e tbm criando uma variável check, que o padrão dela vai ser true, ai por ex se clicarmos no botão check, o check vai continuar true, se clicarmos no delete, o check vai ser false, e como iremos usar um operador ternário, é fácil de separamos o check do true
function handleClick(event, check = true){
    // quando clicamos no marcar como lida ou excluir, como está dentro d uma tag a, ele vai aparecer uma # na url, pq deixamos isso no nosso html, para q isso n aconteça vamos colocar o event prevent default, pra gente falar pro nosso js que esse link n se comporta como um link normal, que quando a gente clicar nesse link, não é para ele alterar a nossa url
    event.preventDefault() // só isso já faz com que pare de mudar nossa url

    // estamos colocando o nosso operador ternário, q vai verificar se o conteúdo é marcar como lido ou excluir dentro de uma constante, para simplificar, q n precisar ficar repetindo código
    const text = check ? "Marcar como lida" : "Excluir"
    // ele vai mudar o conteúdo de innerHTML de acordo com o check, o padrão vai ser sempre check true, porém quando for no delete, ele vai passar o check como false, e vai retornar o "excluir a pergunta"
   
    // cost para verificar se vai ser delete ou check
    const slug = check ? "check" : "delete"

    // pegando o id do nosso html, pegando o código da sala do nosso html
    const roomId = document.querySelector("#room-id").dataset.id

    // agr vamos pegar o id da nossa pergunta
    // o event, ele traz consigo, todo o evento que aconteceu para aquilo ocorrer, ou seja, quando eu clico no marcar como lido, ele vai trazer junto todo aquele a (tag a) junto, ele leva os atributos juntos, então quando a gente quer pegar qualquer atributo que vem junto com o event, podemos fazer pelo próprio event, é só fazer um event target, target quem dizer, o elemento que aconteceu o evento, e dai a gente peda o data-id
    const questionId = event.target.dataset.id

    // pegando o nosso form pra gente passar as informações quando clicar no sim excluir, ou no marcar como lido
    const form = document.querySelector(".modal form")
    // vamos mudar um atributo do form, esse atibuto é o action, então a ação q ele vai fazer quando clicado, é mandar para essa rota
    // form.setAttribute("action", `/room/:room/:question/:action`) exemplo de como seria sem as varáveis
    form.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`)

    // modalTitle.innerHTML = text + "esta pergunta" essa forma de fazer n é legal, por isso vamos usar templatestring
    modalTitle.innerHTML = `${text}` // isso é templatestring
                                                            // to lower casem usamos para deixar nossa string em letra minúscula, para n ficar uma letra grande no meio da frase
    modalDescription.innerHTML = `Tem certeza que deseja ${text.toLowerCase()} esta pergunta?`    
    modalButton.innerHTML = `Sim, ${text.toLowerCase()}`
    // como nosso botão do marcar como lido está vermelho, temos q ir no nosso html e tirar a classe red do button
    check ? modalButton.classList.remove("red") : modalButton.classList.add("red")

    // abrir modal
    modal.open()
}