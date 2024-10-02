const { response } = require('express')
const turmaService = require('../services/TurmaService')

module.exports = {

    //metodo para consultar as turmas
    findALLTurmas: async (request, response) => {
        let json = { error: "", result: [] };
        const professor_id = request.professorId; 
    
        try {
            let turmas = await turmaService.readTurmas(professor_id);
            
            for (let turma of turmas) {
                json.result.push({
                    id: turma.id,
                    nome: turma.nome,
                    periodo_letivo: turma.periodo_letivo,
                    professor_id: turma.professor_id
                });
            }
    
            response.status(200).json(json);
        } catch (error) {
            json.error = "Erro ao buscar turmas: " + error.message;
            response.status(500).json(json);
        }
    },
    
    

    //metodo para criar turmas
    createTurmas: async (request, response) => {
        let json = { error: "", result: {} }

        let nome = request.body.nome
        let periodo_letivo = request.body.periodo_letivo
        let professor_id = request.body.professor_id

        if (nome && periodo_letivo && professor_id) {

            let turmas = await turmaService.createTurmas(nome, periodo_letivo, professor_id)

            json.result = {
                id: turmas.insertId,
                nome,
                periodo_letivo,
                professor_id

            }

        } else {
            json.error = "Campos imcompletos!"
        }

        response.status(200).json(json)

    },

    //metodo para atualizar turma
    updateTurmas: async (request, response) => {

        let json = { error: "", result: {} }

        let id = request.params.id
        let nome = request.body.nome
        let periodo_letivo = request.body.periodo_letivo
        let professor_id = request.body.professor_id

        if (id) {

            await turmaService.updateTurmas(id, nome, periodo_letivo, professor_id)

            json.result = { id, nome, periodo_letivo, professor_id }


        } else {
            json.error = "Error no ID"

        }

        response.json(json)
    },

    //metodo para deletar turma
    deleteTurmas: async (request, response) => {

        let json = { error: "", result: "" }

        let id = request.params.id

        if (id) {
            await turmaService.deleteTurmas(id)
            json.result = `Turma deletada com sucesso ID:${id}`
        } else {
            json.error = "Erro no ID!"
        }

        response.json(json)

    },

}