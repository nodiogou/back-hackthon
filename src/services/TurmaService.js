const database = require('../database');

module.exports = {
    readTurmas: () => {
        return new Promise((resolve, reject) => {
            database.query(`SELECT * FROM turmas`, 
            (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    },

    createTurmas: (nome, periodo_letivo, professor_id) => {
        return new Promise((resolve, reject) => {
            database.query(`INSERT INTO turmas (nome, periodo_letivo, professor_id) VALUES (?, ?, ?)`,
                [nome, periodo_letivo, professor_id],
                (error, result) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(result);
                });
        });
    },

    updateTurmas: (id, nome, periodo_letivo, professor_id) => {
        return new Promise((resolve, reject) => {
            database.query(`UPDATE turmas SET nome = ?, periodo_letivo = ?, professor_id = ? WHERE id = ?`, 
                [nome, periodo_letivo, professor_id, id],
                (error, result) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(result);
                });
        });
    },

    deleteTurmas: (id) => {
        return new Promise((resolve, reject) => {
            database.query(`DELETE FROM turmas WHERE id = ?`, [id],
                (error, result) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(result);
                });
        });
    },
    readAtividadeByTurma: (turma_id) => {
        return new Promise((resolve, reject) => {
            database.query(`SELECT * FROM atividades WHERE turma_id = ?`, [turma_id], (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
};
