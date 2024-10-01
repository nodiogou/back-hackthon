const { response } = require('express')
const turmaService = require('../services/TurmaService')

module.exports = {

    //metodo para consultar as turmas
    findALLTurmas: async (request, response) => {

        //declaração do objeto json que sera retornado como resposta da requisição
        let json = { error: "", result: [] }

        let turma = await turmaService.readTurmas()

        //tratamento de dados
        for (turmas of turma){
            json.result.push({
                id: turmas.id,
                nome: turmas.nome,
                periodo_letivo: turmas.periodo_letivo,
                professor_id: turmas.professor_id
            })
        }
        
        response.status(200).json(json)
    },

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

    updateTurmas: async (request, response) => {

        let json = { error:"",result: {}}

        let id = request.params.id
        let nome = request.body.nome
        let periodo_letivo = request.body.periodo_letivo
        let professor_id = request.body.professor_id

        if(id){

            await turmaService.updateTurmas( id, nome, periodo_letivo, professor_id)

            json.result = {id, nome,periodo_letivo, professor_id}


        }else{
            json.error = "Error no ID"

        }
        
        response.json(json)
    },

    deleteTurmas: async (request, response) => {
        
        let json = { error : "", result: "" }

        let id = request.params.id

        if(id){
            await turmaService.deleteTurmas(id)
            json.result = `Turma deletada com sucesso ID:${id}`
        } else{
            json.error = "Erro no ID!"
        }

        response.json(json)

    }


}