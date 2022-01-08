// importando o banco de dados para o nosso arquivo
const Database = require("../db/config")

module.exports = {
    async create(req, res){
        const db = await Database()
        
        // pegando a nossa senha
        const pass = req.body.password

        // vamos criar esse número dinamicamente com uma função randle
        let roomId
        // aq temos um problema, pq nosso roomId estava começando com 0, e sempre q ia criar a sala, o primeiro numero era 0, para corrigir isso, vamos usar um operador ternário dentro do for

        let isRoom = true
        // enquando o isRoom for true, ele vai ficar repetindo até gerar um número novo e diferente de um q já está cadastrado no banco
        while(isRoom){

            // vamos passar o id da sala e o password para o banco
        
            // função para gerar o número da sala
            for(var i = 0; i < 6; i++){
                i == 0 ? roomId = Math.floor(Math.random() * 10).toString() : roomId += Math.floor(Math.random() * 10).toString()
                // código q usaremos para gerarmos os nossos números aleatórios de 0 a 9 
                // leambrando q cada linha dessa vai criar um número aleatório, por isso vamos usar um for
                // roomId += Math.floor(Math.random() * 10).toString() // estamos transformando em string, pq o javascript permite fazer concatenação quando é string
                // se deixarmos do jeito q esta aq, ele sempre vai somar o valor, e n queremos isso, queremos q ele concatene com o novo numero aleatório gerado
            }

            // agora vamos cadastrar a nossa sala, criar o nosso roomId de fato
            // primeiro vamos importar o nosso banco de dados, para gravarmos isso aq no banco de dados
            
            // console.log(parseInt(roomId))

            // vamos verificar se o id da sala não é igual a um Id Já criado
            // verificar se esse Id já existe
            const roomsExistIds = await db.all(`SELECT id FROM rooms`)
                                    // pq é all pq queremos trazer tudo q a gente encontrar no nosso select, trazer tudo pra gente com esse conteúdo, quando n é pra ele só rodar alguma coisa, quando é pra retornar pra gente, a gente usa o db all
            
            // como o nosso roomsExistsIds é um array podemos usar a função .some o some vai verificar se aq dentro existe essa condição, ou seja roomExistId === roomId, e se essa condição for verdadeira ele vai retornar um true
            // o some vai olhar todos os ids q a gente já tem no banco e vai comparar com oq a gente acabou de gerar, o primeiro q der match, ele já retorna true, então ele  n vai precisar olhas todas as salas, basta uma ser igual ele já retorna o true, é uma forma mais rápida e fácil de verificar
            isRoom = roomsExistIds.some(roomExistId => roomExistId === roomId)
            
            // se o isRoom for falso, então ele vai inserir a nova sala no banco de dados
            if(!isRoom){

                // função pra gente inserir a sala no banco
                await db.run(`INSERT INTO rooms (
                    id,
                    pass
                ) VALUES (
                    ${parseInt(roomId)},
                    "${pass}"
                )`) // para passarmos o roomId para nosso db, temos q transformalo ele em número (lembrando q tranformamos ele em string para concatenar) (pois no nosso db condiguramos o campo id como integer)
                    // a função js parseInt vai transformar a nossa string em número

            } // se existir, ele vai terq gerar o número novamente, por isso vamos colocar essa estrutura toda dentro de um while

            // se já existir uma sala cadastrada ele roda o while dnv
        }

        await db.close()

        res.redirect(`/room/${roomId}`)
        // vamos dar um redirect apra a nossa rota /room/:room
    },

    async open(req, res){
        const db = await Database()

                           // os parametros na nossa url vem normal, tipo /e dai vem o parâmetro, já o query a gente coloca ? e dps um valor de uma url por ex. params: /room/:room query: /room/:room?id = eu o params seria o :room e o query seria o ?id=eu 
        const roomId = req.params.room 
        
        // quando queremos trazer as coisas de uma sala específica, devemos falar pro nosso SQL de qual sala q a gente quer q traga as perguntas por isso usamos o where, ou seja, se tiver questões de uma sala, que não seja a do nosso roomId o SQl n vai trazer
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`)
                                                                                        // alem de trazer só da sala em específico tbm trazer as perguntas marcadas como read
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`)

        // variavel para verificar se tem questões
        let isNoQuestions

        if(questions.length == 0){
            if(questionsRead.length == 0){
                // quer dizer q n tem questão nenhuma
                isNoQuestions = true
            }
        }

        // o resrender tenq ser renderizado passando o número da sala junto
        res.render("room", {roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestions: isNoQuestions})

        // agr vamos ir lá no rooms pra gente conseguir mostrar essas questões, para isso vamos fazer um foreach, por ex, quando temos um array com 3 posições, primeiro ele vai ler essa primeira posição, vai fazer tudo aquele loop, tudo q a gente colocar dentro do for each, dps vai pra prox posição do foreach e assim vai até acabar o array
    
        
    },

    enter(req, res){
        // pegando nosso roomId lá do ejs
        const roomId = req.body.roomId 

        res.redirect(`/room/${roomId}`)
    }
}