const database = require('../database')

module.exports = {

// Método para buscar as turmas
readTurmas: (professor_id) => {
    return new Promise((resolve, reject) => {
        database.query(`SELECT * FROM turmas WHERE professor_id = ?`, [professor_id],  
        (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
},


    //metodo para criar uma turma
    createTurmas: (nome, periodo_letivo, professor_id) => {
        return new Promise(
            (resolve, reject) => {
                database.query(`INSERT INTO turmas (nome, periodo_letivo, professor_id) VALUES ('${nome}', '${periodo_letivo}', '${professor_id}')`,
                    (error, result) => {
                        if (error) {
                            reject(error)
                            return
                        }
                        resolve(result)
                    })

            })
    },

    //metodo para atualizar uma turma
    updateTurmas: (id, nome, periodo_letivo, professor_id) => {
        return new Promise((resolve, reject) => {
            database.query(`UPDATE turmas SET nome = '${nome}', periodo_letivo = '${periodo_letivo}', professor_id = '${professor_id}' WHERE id = '${id}'`,
                (error, result) => {
                    if (error) {
                        reject(error);
                        return;
                    }     
                    resolve(result);
                });
        });
    },

    //metodo para deletar uma turma
    deleteTurmas: (id) => {
        return new Promise(
            (resolve,reject) => {
                database.query(`DELETE FROM turmas WHERE id =${id}`,
                (error,result)=>{
                    if(error){
                        reject(error)
                        return
                    }
                    resolve(result)
                    
                })
            }
        )
    },
}