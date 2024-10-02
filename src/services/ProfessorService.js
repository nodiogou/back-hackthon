const database = require('../database');


module.exports = {
    //metodo que traz todos os professores
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

    //metodo para selecionar professor referent ao email e senha
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

    //metodo para cadastrar um professor
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

    //metodo para atualizar um professor
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

    //metodo para deletar um professor
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