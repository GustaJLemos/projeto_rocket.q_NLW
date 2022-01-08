// arquivo usado para criar as nossas rotas, caminhos
const express = require('express')
const res = require('express/lib/response')
const questionController = require('./controllers/questionController')
const roomController = require('./controllers/roomController')

// agora devemos falar, quem vai ser o nosso route
const route = express.Router() // agr estou falando, q a minha const router, guarda todas as funcionalidades de Router que o express tem

route.get('/', (req, res) => res.render("index", {page: 'enter-room'})) // req requisição dessa rota, res responsa da rota (resposta), estou falando q a minha res (resposta) vai ser uma render, ou seja, vai renderizar na tela o conteúdo de index, devemos colocar para renderizar o nosso ejs, e o nosso ejs tem o nome de index
// explicando melhor, na nossa rota, a gente passou um / o node é um carinha inteligente, então ele sabe a porta q está rodando o nosso projeto, ou seja, quando a gente, inicar o nosso projeto, e procurar a nossa porta no navegador, sem nenhum conteúdo dps do barra, por ex localhost:3000/ ele vai levar automaticamente a gente pro index do nosso programa, q foi oq a gente acabou de configurar no nosso programa, ou seja, aq a gente configurou, pra quando a gente acessar o servidor, sem conteúdo nenhum dps do barra, ele vai direto para o nosso index
// quando deixamos a nossa rota assim, ele da um erro no navegador falando q não consegue pegar o GET de /, oq significa? q ele n ta encontranod o nosso index, isso ocorreu pq no nosso arquivo server ele n sabe da existência do nosso arquivo route, o nosso server é o arqvivo q está sendo rodado no nosso server, e ninguém sabe q tambem precisamos usar o route

// agr vamos criar as rotas para os restantes dos arquivos ejs
// quando a gente terminar de criar a sala, automaticamente o id da nossa sala vai aparecer na nossa url
route.get('/room/:room', roomController.open) // ao inves de fazermos a nossa renderização aq, vamos pedir para um controle fazer isso aq pra gente
                                                                    // oq eu to fazendo aq? apenas passando uma variável aq dentro
// quando essa rota for selecionada, ele tambem vai terq ir la na tabela questões e fazer as buscas dessas perguntas que estão linkadas com essa sala, vai ser nessa rota, pq eu quero q quando ele abra essa url, ele busque as perguntas do banco de dados dessa sala, por isso tenq ser em quem está abrindo ela, roomController.open

// rota para colocarmos o id e entrarmos na sala correta
// é post pq estamos enviando um formulario
route.post('/enterroom', roomController.enter)

route.get('/create-pass', (req, res) => res.render("index", {page: 'create-pass'})) // o arquivo index, é o mesmo nas duas rotas, a diferenã é q quando for no / ele vai passar o arquvio enter-room, e quando for no /create-pass vai passar o arquivo create-pass, tipo a origem do arqvuio é a mesma, o index, porém dependendo da url ele vai mudar o conteúdo entre enter-room ou create-pass

// rota para passarmos as informações da nossa modal, marcar como lida, excluir, qual pergunta foi selecionada, numero da sala, senha da sala
// quando estamos falando de rotas, podemos fazer varias coisas com essas rotas, uma dessas coisas é o get, que é pegar, é a gente bater nessa rota, bater quer dizer ir lá no navegador e abrir essa rota e pegar o conteúdo dessa rota pra gente ver, quando queremos enviar uma coisa pra rota, a gente usa o post, nesse caso a gente quer pegar os dados do nosso formulário html, e enviar para essa rota, então quando enviamos dados para alguma rota, essa rota é post
                                                                    // estou renderizando a view exemplo, e estou passando a req pra ela, como queremos pegar a req, oq vem dentro dessa req, colocamos ela junto
             // formato que o formulário de dentro da modal tem que passar a informação                                                       
// route.get('/room/:room/:question/:action' , (req, res) => res.render("exemplo", {req})) // quando colocamos os dois pontos, estamos falando pro nosso express que o conteúdo que vai vir nesse espaço a gente n sabe oq é, então estamos criando uma variável para receber esse conteúdo que vai vir na nossa url, diferente do /room que é fixo, que vai vir exatamente a palavra room
// route.post('/room/323232/2/delete') para criarmos essas rotas, que temos esses tipos de variável, precisamos colcoar : e o nome da variavel
// estamos passando a nossa rota, o nome do nosso arquivo, o código da sala, o número da questão, e se é para check ou delete
// passando o question controller para a nossa rota
// implicitamente o nosso question controller está recebendo req res, ai temos q ir no nosso index do controller e tbm colocar o req, res
route.post('/question/:room/:question/:action', questionController.index)

// rota q leva a gente pra onde vai ser criado a nova sala
// a senha da sala vamos passar escondida, e o id da sala, vamos definir no código
route.post('/create-room', roomController.create)

// rota pra gente pegar o formulário das perguntas
route.post('/question/create/:room', questionController.create)

// estamos exportando a nossa rota, para ser usada pelo nosso arquivo server
module.exports = route