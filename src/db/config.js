const sqlite3 = require("sqlite3")
const {open} = require("sqlite") 

module.exports = () =>{
    
    return open({
        filename: './src/db/rocketq.sqlite', 
        driver: sqlite3.Database, 
    })
}
