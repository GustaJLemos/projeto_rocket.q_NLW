// responsável por iniciar o  nosso servidor. pensa o node como um servidor, então todo o nosso projeto vai estar rodando dentro desse node, e o node precisa iniciar, para mostrar o nosso projeto no navegador, então, esse arquivo vai ter esse papel, inicar o nosso servidor
// a partir de agora a gente n usa mais o live server, o live server parou de funcionar, pq estamos usando o node

// estamos importando o express
const express = require('express') // não precisamos colocar caminho nem nada, somente o express, o node é um carinha inteligente, então quando damos um require no express, ele já sabe q estamos falando do módulo express q acabamos de instalar
// importando o nosso arquivo route, para q ele tbm seja executado no nosso servidor, se n fizermos isso, o nosso servidor não saberá da existência desse arquivo route
const route = require('./route')

const path = require('path') // isso aq n é um arquivo, é um módulo q eu to criando e chamando

// aq estamos falando q o nosso "server" vai ser o express já iniciado
const server = express() // () inicia o expres, estamos executando o express e guardando no server

// agr vamos fazer a nossa configuração pro nosso ejs funcionar, para o express entenda q o nosso view engine é o ejs
server.set('view engine', 'ejs') // estamos falando, para o express (server) que a nossa view engine, vai ser ejs
// agr precisamos falar para o server, onde está a nossa pasta view (pasta onde está o nosso arquivo ejs)
// por padrão, se tirarmos essa pasta views do src, o nosso express consegue encontrar ela, e mostrar o ejs no navegador, porém n queremos isso, queremos deixa ela dentro da nossa pasta src, por isso temos q mostrar para o express onde está

server.use(express.static("public")) // express.static, quer dizer conteúdo estático, conteúdo publico estático, e dai passamos o nome da noss apasta onde vai ficar guardado esse conteúdo, e dai ele vai procurar na raiz do nosso programa onde fica essa pasta public estamos falando pro nosso servidor usar a pasta public
// como criamos essa config para usar arquivos estáticos, n precisamos mudar os caminhos dentro do html e css e tudo mais, ele já identifica o nosso css automaticamente graças a essas configs, a unica coisa q precisamos mudar, é a nossa pasta assets, q mudou o nome para images, então precisamos alterar para images no nosso conteudo

server.set('views', path.join(__dirname, 'views')) // primeiro passamos nossa pasta views, e depois qual o caminho para essa pasta, mas para isso vamos usar um módulo chamado path, o join é uma funcionalidade do path
// o path, pega o caminho onde está a nossa pasta, o join é juntar, ai ele pega, o dirname (aonde está esse arquivo onde eu estou, ou seja, server.js), se eu der o dirname, por ex, no package.json, ele vai trazer no lugar de dirname o nome da pasta do nosso projeto, ou seja, o dirname vai retornar src, essa é uma variável global, ou seja, é só chegar onde for, e chamar ela, e ela vai mostrar o nome, do arquivo em q está variável está dentro, e como o dirname está dentro do server, ela vai trazer o src
// o path é o caminho q vamos percorrer pra chegar no nosso arquivo PROJETO_NLW_DISCOVER, cada pc é diferente, mas isso n importa, ele sempre vai chegar no nosso arquivo, o join é juntar, ou seja, ele ta juntando o caminho do meu projeto, com o dirname, oq é o nosso dirname? src/, ai ele ta juntando o src, com o views q é o nome da nossa pasta, ou seja, no final ele vai me retornar .../PROJETO_NLW_DISCOVER/src/views, então essa linha é a gente falando pro nosso express, que a pasta onde vai estar os nossos arquivos ejs n é mais a pasta views, na real, é todo esse caminho até a nova pasta

// configurando o mediare
server.use(express.urlencoded({extended: true}))
// isso aq é suficiente para pegar o conteúdo, o formulário q está vindo para a nossa rota, decodificar e dai sim passar para o nosso controller

// precisamos falar para o nosso node, usar o nosso route
server.use(route) // use é exatamente isso, usar o nosso arquivo, estamos falando basicamente, express(server) usa o arquivo route
// se executarmos assim, ele vai dar um erro, pq? pq no nosso arquivo route, a gente precisa dizer q precisamos exportar a route, e se n dissermos isso, vai dar erro, sem isso ele  n entende q precisamos pegar esse route


// por ex, quando usamos o live server, ele iniciar um pequeno servidor, em uma porta no nosso pc, por exemplo a porta 5500, aq no node, vamos fazer uma coisa parecida vamos inicar o servidor do node, rodando em uma porta, e nesse caso, vamos escolher a porta 3000, q colocaremos no listen, então esse comando ta basicamente fazendo o seguinte "server" (inicar o nosso servidor express) .listen(3000) (na porta 3000) 
server.listen(3000, () => console.log("RODANDO")) // esse listen é uma funcionalidade q existe lá dentro do express, por isso conseguimos chamar ela junto com o server
// junto com a nossa porta, tambem passamos uma mensagem, para saber se deu certo iniciarmos o nosso servidor, para isso usamos uma arrow function
// pora rodarmos o nosso servidor, geralmente o console.log funciona no nosso navegador, como estamos usando o node, precisamos rodar através do nosso terminal, para isso, usamos o comando node (caminho da nossa pasta de servidor) e se der tudo certo ele vai aparecer rodando
// para iniciar o nosso server usamos:
// * node src/server.js
// para q toda hora, a gente n precise usar esse comando, para ficar mais simples, vamos usar o nodemon, que é a mesma coisa que o node, a unica diferença é, q no nosso package.json, vamos codar uma "palavra" para startar o nosso server, e quando digitarmos essa palavra no nosso terminal, ele vai receber o código que iniciar o nosso server, ou seja? node src/server.js