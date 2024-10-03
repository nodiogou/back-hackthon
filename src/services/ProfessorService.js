const database = require('../database');


module.exports = {

    readProfessor: () => {
        return new Promise((resolve, reject) => {
            database.query(`SELECT * FROM professores`, 
            (err, result) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(result)
            })
        })
    },

    searchProfessor: (senha, email) => {
        return new Promise(
            (resolve, reject) => {
                database.query(`SELECT * FROM professores WHERE senha = '${senha}' and email = '${email}'`, (error, result) => {
                    if (error) {
                        reject(error)
                        return
                    }
                    resolve(result)
                })
            }
        )
    },

    createProfessor: (nome, senha, email) => {
        return new Promise(
            (resolve, reject) => {
                database.query(`INSERT INTO professores (nome, senha, email) VALUES ('${nome}', '${senha}','${email}')`,
                    (error, result) => {
                        if (error) {
                            reject(error)
                            return
                        }
                        resolve(result)
                    })
            })
    },

    updateProfessor: (senha, email) => {
        return new Promise(
            (resolve,reject) => {
                database.query(`UPDATE professores SET senha = '${senha}' WHERE email = '${email}'`,
                    (error, result) => {
                       if (error){
                        reject(error)
                        return
                       }     
                       resolve(result)
                })
                
            })
        
    },

    deleteProfessor: (id) => {
        return new Promise(
            (resolve,reject) => {
                database.query(`DELETE FROM professores WHERE id =${id}`,
                (error,result)=>{
                    if(error){
                        reject(error)
                        return
                    }
                    resolve(result)
                    
                })
            }
        )
    }
}