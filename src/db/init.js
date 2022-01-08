// não vai fazer parte do projeto, ele é simplesmente um arquivo q vamos pecisar rodar ele antes pra q a tabela do banco de dados sejam criadas pra gente colocar o conteúdo lá dentro

// primeiro devemos importar o nosso banco de dados
const Database = require("./config")

// const q vai iniciar o nosso banco de dados, vamos atribuir a ele todas as nossas funções
const initDb = {
    async init(){
        // é aq q vamos começar a criar o nosso banco de dados em si
        const db = await Database() // o await significa esperar, ou seja, vc só vai continuar executando o código, assim q ele tiver uma resposta, ou seja, assim q o Database() for executado, e retornar o resultado para a const db, pq o js roda o código mais rapido q o tempo q leva pro código ser executado, por isso devemos esperar ele nos estregar o resultado para dai sim continuarmos
        //  de formar resumida, estou falando pro js, vc vai rodar o Database() e vai esperar ele me trazer o resultado pra continuar, o await é uma forma da gente garantir que o await vai ter o conteúdo dele certinho, antes de irmos para a próxima linha
        // o async funciona junto com o await, eles são tipo gêmeos ciameses, se vc tirar o async o await n funciona, então se em uma função, vc for usar o await, essa função deve ser async

        // primeiro comando para criarmos as nossas tabelas
        
        await db.exec(`CREATE TABLE rooms (
            id INTEGER PRIMARY KEY, 
            pass TEXT
        )`);

        // dentro do exec é onde vou colocar o meu código para criar a tabela
        // a partir do exec, vc vai começar a escrever o código sql

        // criando a tabela das questões
        await db.exec(`CREATE TABLE questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            read INT,
            room INT
        )`); // a palavra check é uma palavra reservada, então não pode ser usada como nome de campo
        // o async await é bme importante aq pq estamos trabalhando com módulos externos, se fosse só o js aq n iria precisar
    
        // const db = await Database() estamos iniciando a nossa database, estamos dando um opne na database, quando terminamos de usar o database é interessante darmos um close (fechar a database, encerrar a database)
            
        await db.close()

        // agr vamos criar um script no nosso json, para esse arquivo
    }
}

initDb.init()