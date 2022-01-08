// vamos mandar o conteúdo da modal para cá

// importar o banco de dados

const res = require('express/lib/response')
const Database = require('../db/config')

// já vamos começar exportando, pq vamos importar o nosso controller em algum lugar, vamos importar isso daq lá na nossa route
module.exports = {
   

    // index vai ser onde vamos colocar o nosso código
    async index(req, res){ // aq estamos recebendo o req, res q vem lá da nossa rota
        const db = await Database()
        
        // vamos separar primeiro as nossas variáveis
        const roomId = req.params.room
        const questionId = req.params.question
        console.log(questionId, new Date())
        const action = req.params.action
        // para pegarmos a senha é um pouco diferente, vamos pegar o req.body
        const password = req.body.password
        // quando estamos passando dados parra o nosso controller, quando estamos recebendo dados na nossa rota, precisamos configurar um mediare, um mediare é como se fosse um intermédio de tudo q entra, por ex, vc mandou alguma coisa pra rota, mandou um formulário pra rota, ele passa primeiro no mediare e dps entra no nosso controler, o mediare esta implicitamente entre a rota, e entre pra onde a rota vai mandar, então precisamos configurar esse mediare lá no nosso server
                                // name do nosso input q tá lá no nosso formulário
        // console.log(`room = ${roomId}, question = ${questionId}, action = ${action}, password = ${password}`) // pra gente ver se está funcioanndo tudo direitinho                        
        // dps q configurarmos o mediare, ai sim ele vai aparecer no nosso console as informações que pedimos
    
        // verificar se a senha está correta
                            // o get vai trazer apenas um elemento pra gente, como pode ter dois pssword iguais, a gente n coloca o where com password mas sim com o id, a difenreça do all pro get, é q o all traz todos os dados q ele encontrar do banco de dados, já o get traz apenas um dado por isso temos q fazer o where ser unico tbm, por isso n fazemos com a senha, pq podem ter duas senhas iguais, mas nunca tera dois ids das salas iguais, n usamos tbm o all, pq ele iria retornar pra gente um array, ai n ia ter como fazer esse if dps bem simples
        const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)
        // se o verifyRoom.pass for igual ao password, ai sim vamos ter verificado q a senha cadastrada está correta
        if(verifyRoom.pass == password){
            if(action == "delete"){
                await db.run(`DELETE FROM questions WHERE id = ${questionId}`)
            }else if(action == "check"){
                // vai mudar o campo read pra 1
                await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`)
            }
            res.redirect(`/room/${roomId}`)
        } else{
            res.render('passincorrect', {roomId: roomId})
        }
    },

    // através da rota post, a função q a gente colocar nela, vai receber implicitamente o req, res, independente da função q estiver ali, se for uma rota post, ela vai receber req, res, por isso n precisamos colocar o nosso req, res lá na função do route, pq ele já recebe
    async create(req, res){
        const db = await Database()
        // essa vai ser a nossa pergunta
        const question = req.body.question
        const roomId = req.params.room

        // vamos criar agr a nossa questão
        // colocar sempre o await quando estiver trabalahndo com o db
        await db.run(`INSERT INTO questions (
            title,
            room,
            read
        ) VALUES (
            "${question}",
            ${roomId},
            0
        )`)
        // quando inserimos um text no banco de dados ele precisa estar envolto de aspas
        
        // oq ele vai renderizar dps de fazer tudo aquilo ali de cima, pra onde vai ser redirecionado
        res.redirect(`/room/${roomId}`)
        // dps de fazer tudo isso é pra ter dado certo
    }

}