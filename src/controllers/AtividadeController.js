const { response } = require('express')
const atividadeService = require('../services/AtividadeService')

module.exports = {
    //metodo para trazer todas as atividades
    findALLatividades: async (request, response) => {
        let json = { error: "", result: [] };
    
        try {
            let atvs = await atividadeService.readAtividade();
    
            for (let atividades of atvs) {
                json.result.push({
                    id: atividades.id, 
                    nome: atividades.nome,
                    descricao: atividades.descricao,
                    data_entrega: atividades.data_entrega,
                    peso_nota: atividades.peso_nota,
                    turma_id: atividades.turma_id
                });
            }
            
            response.status(200).json(json);
        } catch (error) {
            json.error = "Erro ao buscar atividades  " + error.message;
            response.status(500).json(json);
        }
    },

    //metodo para criar atividades
    createAtidades: async (request, response) => {
        let json = { error: "", result: {} }

        let nome = request.body.nome
        let descricao = request.body.descricao
        let data_entrega = request.body.data_entrega
        let peso_nota = request.body.peso_nota
        let turma_id = request.body.turma_id

        if (nome && descricao && data_entrega && peso_nota && turma_id) {

            let atvs = await atividadeService.createAtividade(nome, descricao, data_entrega, peso_nota, turma_id)

            json.result = {
                id: atvs.insertId,
                nome,
                descricao,
                data_entrega,
                peso_nota,
                turma_id
            }

        } else {
            json.error = "Campos imcompletos!"
        }


        response.status(201).json(json)
    },

    //metodo para atualizar atividades
    updateAtividades: async (request, response) => {

        let json = { error:"",result: {}}

        let id = request.params.id
        let nome = request.body.nome
        let descricao = request.body.descricao
        let data_entrega = request.body.data_entrega
        let peso_nota = request.body.peso_nota
        let turma_id = request.body.turma_id

        if(id){

            await atividadeService.updateAtividades( id, nome, descricao, data_entrega, peso_nota, turma_id)

            json.result = {id, nome, descricao, data_entrega, peso_nota, turma_id}


        }else{
            json.error = "Error no ID"

        }
        
        response.json(json)
    },

    //metodo para deletar atividades
    deleteAtividades: async (request, response) => {
        
        let json = { error : "", result: "" }

        let id = request.params.id

        if(id){
            await atividadeService.deleteAtividades(id)
            json.result = `Atividade deletada com sucesso ID:${id}`
        } else{
            json.error = "Erro no ID!"
        }

        response.json(json)

    },

    //metodo para buscar atividades referente a foreign key
    findALLatividadesByTurma: async (request, response) => {
        let json = { error: "", result: [] };
        let turma_id = request.params.turma_id;
        let professor_id = request.professorId; // ID do professor logado
    
        try {
            // Obtenha as atividades da turma que pertencem ao professor
            let atvs = await atividadeService.readAtividadeByTurma(turma_id, professor_id);
            
            for (let atividade of atvs) {
                json.result.push({
                    nome: atividade.nome,
                    descricao: atividade.descricao,
                    data_entrega: atividade.data_entrega,
                    peso_nota: atividade.peso_nota,
                    turma_id: atividade.turma_id,
                });
            }
    
            response.status(200).json(json);
        } catch (error) {
            json.error = "Erro ao buscar atividades: " + error.message;
            response.status(500).json(json);
        }
    }
}