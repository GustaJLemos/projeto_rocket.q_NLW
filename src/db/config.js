// vamos importar primeiro os dois módulos do nosso SQLite
const sqlite3 = require("sqlite3") // quando estamos importando assim, estamos importando tudo q temos dentro do sqlite3
const {open} = require("sqlite") // quando queremos usar uma funcionalidade específica, no nome, a gente coloca o nome da nossa funcionalidade, quando apssamos dessa forma, o js vai lá no sqlite, procura quem q é o open e traz só ele pra gente, e ai ele fica salvo numa variável chamada open 

module.exports = () =>{
    //o sqlite tem esse open, pq precisamos abrir uma conexão com o banco de dados, sempre, quando vamos usar o banco de dados, precisamos abrir essa conexão
    //  imagina o banco de dados como se fosse uma caixinha, para nos pegar ou colcoar coisas lá dentro a gente precisa abir a tampa dessa caixinha, esse é o papel do open
    return open({
        // o sqlite é um banco de dados muito simples, q usa o sql, porém ele é uma forma lite do sql
        filename: './src/db/rocketq.sqlite', // vai receber o caminho do nosso banco de dados
        driver: sqlite3.Database, // o driver é quem comanda o banco de dados, por ex se um dia quiser dar um upgrade no projeot e colocar outro banco de dados, vou precisar trocar o driver, o nosso driver é oq vai comandar o nosso arquivo do banco de dados rocketq.sqlite, a gente n vai por ex, abrir esse arquivo manualmente, e colcoar as coisas lá dentro, quem faz isso pra gente é o próprio sqlite, a unica coisa q a gente vai fazer é passar as instuções em sql e ele vai fazer todo o trabalho, então se abrirmos esse arqvuio rocketq.sqlite dps de um tempo, vamos ver q tem um monte de coisa estranha la dentro, pq n é a gente q ta adminsitrando esse arqvuio e sim o sqlite
        // agr sim, o banco de dados já esta configurado para usarmos
    })
}
