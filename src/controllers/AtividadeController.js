const { response } = require('express');
const atividadeService = require('../services/AtividadeService');

module.exports = {
    findALLatividades: async (request, response) => {
        let json = { error: "", result: [] };
        try {
            let atvs = await atividadeService.readAtividade();

            for (let atividade of atvs) {
                json.result.push({
                    id: atividade.id,
                    nome: atividade.nome,
                    descricao: atividade.descricao,
                    data_entrega: atividade.data_entrega,
                    peso_nota: atividade.peso_nota,
                    turma_id: atividade.turma_id
                });
            }

            response.status(200).json(json);
        } catch (error) {
            json.error = "Erro ao buscar atividades: " + error.message;
            response.status(500).json(json);
        }
    },

    createAtidades: async (request, response) => {
        let json = { error: "", result: {} };
        const { nome, descricao, data_entrega, peso_nota, turma_id } = request.body;
        
        if (nome && descricao && data_entrega && peso_nota && turma_id) {
            try {
                let atvs = await atividadeService.createAtividade(nome, descricao, data_entrega, peso_nota, turma_id);
                json.result = {
                    id: atvs.insertId,
                    nome,
                    descricao,
                    data_entrega,
                    peso_nota,
                    turma_id
                };
                response.status(201).json(json);
            } catch (error) {
                json.error = "Erro ao criar atividade: " + error.message;
                response.status(500).json(json);
            }
        } else {
            json.error = "Campos incompletos!";
            response.status(400).json(json);
        }
    },

    updateAtividades: async (request, response) => {
        let json = { error: "", result: {} };
        const id = request.params.id;
        const { nome, descricao, data_entrega, peso_nota, turma_id } = request.body;

        if (id) {
            try {
                await atividadeService.updateAtividades(id, nome, descricao, data_entrega, peso_nota, turma_id);
                json.result = { id, nome, descricao, data_entrega, peso_nota, turma_id };
                response.json(json);
            } catch (error) {
                json.error = "Erro ao atualizar atividade: " + error.message;
                response.status(500).json(json);
            }
        } else {
            json.error = "Erro no ID";
            response.status(400).json(json);
        }
    },

    deleteAtividades: async (request, response) => {
        let json = { error: "", result: "" };
        const id = request.params.id;

        if (id) {
            try {
                await atividadeService.deleteAtividades(id);
                json.result = `Atividade deletada com sucesso ID: ${id}`;
                response.json(json);
            } catch (error) {
                json.error = "Erro ao deletar atividade: " + error.message;
                response.status(500).json(json);
            }
        } else {
            json.error = "Erro no ID!";
            response.status(400).json(json);
        }
    },

    findALLatividadesByTurma: async (request, response) => {
        let json = { error: "", result: [] };
        let turma_id = request.params.id;
    
        try {
            let atvs = await atividadeService.readAtividadeByTurma(turma_id);
    
            for (let atividades of atvs) {
                json.result.push({
                    id: atividades.id,
                    turma_id: atividades.turma_id,
                    nome: atividades.nome,
                    descricao: atividades.descricao,
                    data_entrega: atividades.data_entrega,
                    peso_nota: atividades.peso_nota,
                    
                });
            }
    
            response.status(200).json(json);
        } catch (error) {
            json.error = "Erro ao buscar atividades: " + error.message;
            response.status(500).json(json);
        }
    }
    
}    
