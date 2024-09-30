const database = require('../database');

module.exports = {

    //metodo para consultar as turmas
    readCursos: () => {
        return new Promise((resolve, reject) => {
            database.query('select * from turmas', (err, result) =>{

                if (err) {
                    reject(err)
                    return
                }
                resolve(result)
            })
        })
    }
}