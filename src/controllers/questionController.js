const res = require('express/lib/response')
const Database = require('../db/config')

module.exports = {
    async index(req, res){ 
        const db = await Database()
        const roomId = req.params.room
        const questionId = req.params.question
        const action = req.params.action
        const password = req.body.password
        const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)

        // verificando se o password da sala está correto
        if(verifyRoom.pass == password){
            if(action == "delete"){
                // vai deletar a pergunta
                await db.run(`DELETE FROM questions WHERE id = ${questionId}`)
            }else if(action == "check"){
                // vai marcar como lida a pergunta
                await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`)
            }
            res.redirect(`/room/${roomId}`)
        } else{
            res.render('passincorrect', {roomId: roomId})
        }
    },

    async create(req, res){
        const db = await Database()
        const question = req.body.question
        const roomId = req.params.room

        // inserindo questões no nosso banco
        await db.run(`INSERT INTO questions (
            title,
            room,
            read
        ) VALUES (
            "${question}",
            ${roomId},
            0
        )`)
        
        res.redirect(`/room/${roomId}`)
    }
}