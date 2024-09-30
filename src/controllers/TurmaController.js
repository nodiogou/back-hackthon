const { response } = require('express')
const turmaService = require('../services/TurmaService')

module.exports = {

    //metodo para consultar as turmas
    findALLTurmas: async (request, response) => {

        //declaração do objeto json que sera retornado como resposta da requisição
        let json = { error: "", result: [] }

        let turma = await turmaService.readCursos()

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
    }
}