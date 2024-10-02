const database = require('../database');

module.exports = {
    //metodo para buscar todas as atividades
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
    //metodo para cadastrar atividades
    createAtividade: (nome, descricao, data_entrega, peso_nota, turma_id, professor_id) => {
        return new Promise((resolve, reject) => {
            database.query(`INSERT INTO atividades (nome, descricao, data_entrega, peso_nota, turma_id, professor_id) VALUES (?, ?, ?, ?, ?, ?)`,
                [nome, descricao, data_entrega, peso_nota, turma_id, professor_id],
                (error, result) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(result);
                });
        });
    },
    
    //metodo para atualizar ativdade de acordo com o id passado
    updateAtividades: (id, nome, descricao, data_entrega, peso_nota, turma_id) => {
        return new Promise((resolve, reject) => {
            database.query(`UPDATE atividades SET nome = ?, descricao = ?, data_entrega = ?, peso_nota = ?, turma_id = ? WHERE id = ?`, 
                [nome, descricao, data_entrega, peso_nota, turma_id, id],
                (error, result) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(result);
                });
        });
    },

    //meotodo para deletar atividade referente ao id
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
    },

    //metodo para selecionar as atividades de acordo com a chave estrangeira cadastrada(chave da turma)
    readAtividadeByTurma: (turma_id, professor_id) => {
        return new Promise((resolve, reject) => {
            database.query(`SELECT * FROM atividades WHERE turma_id = ? AND professor_id = ?`, [turma_id] [professor_id],
                (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result);
                });
        });
    },


}