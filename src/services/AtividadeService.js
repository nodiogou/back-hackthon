const database = require('../database');

module.exports = {

    readAtividade: () => {
        return new Promise((resolve, reject) => {
            database.query(`SELECT * FROM atividades`,
                (err, result) => {
                    if (err) {
                        reject(err)
                        return
                    }
                    resolve(result)
                })
        })
    },

    createAtividade: (nome, descricao, data_entrega, peso_nota, turma_id) => {
        return new Promise(
            (resolve, reject) => {
                database.query(`INSERT INTO atividades (nome, descricao, data_entrega,peso_nota,turma_id) VALUES ('${nome}', '${descricao}','${data_entrega}','${peso_nota}','${turma_id}')`,
                    (error, result) => {
                        if (error) {
                            reject(error)
                            return
                        }
                        resolve(result)
                    })
            })
    },

    updateAtividades: (id, nome, descricao, data_entrega, peso_nota, turma_id) => {
        return new Promise((resolve, reject) => {
            database.query(`UPDATE turmas SET nome = '${nome}', descricao = '${descricao}', data_entrega = '${data_entrega}', data_entrega = '${peso_nota}', data_entrega = '${turma_id}' WHERE id = '${id}'`,
                (error, result) => {
                    if (error) {
                        reject(error);
                        return;
                    }     
                    resolve(result);
                });
        });
    },

    deleteAtividades: (id) => {
        return new Promise(
            (resolve,reject) => {
                database.query(`DELETE FROM atividades WHERE id =${id}`,
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