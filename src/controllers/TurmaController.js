const turmaService = require('../services/TurmaService');

module.exports = {
    findTurmas: async (request, response) => {
        let json = { error: "", result: [] };
    
        const email = request.params.email; 
    
        if (!email) {
            json.error = "E-mail do professor não fornecido.";
            return response.status(400).json(json);
        }
    
        try {
            let turmas = await turmaService.readTurmas(email); 
    
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
    
    createTurmas: async (request, response) => {
        let json = { error: "", result: {} };
        const { nome, periodo_letivo,professor_id } = request.body;


        if (nome && periodo_letivo && professor_id) {
            try {
                let turmas = await turmaService.createTurmas(nome, periodo_letivo, professor_id);
                json.result = {
                    id: turmas.insertId,
                    nome,
                    periodo_letivo,
                    professor_id
                };
                response.status(201).json(json);
            } catch (error) {
                json.error = "Erro ao criar turma: " + error.message;
                response.status(500).json(json);
            }
        } else {
            json.error = "Campos incompletos!";
            response.status(400).json(json);
        }
    },

    updateTurmas: async (request, response) => {
        let json = { error: "", result: {} };
        const id = request.params.id;
        const { nome, periodo_letivo, professor_id } = request.body;

        if (id) {
            try {
                await turmaService.updateTurmas(id, nome, periodo_letivo, professor_id);
                json.result = { id, nome, periodo_letivo, professor_id };
                response.json(json);
            } catch (error) {
                json.error = "Erro ao atualizar turma: " + error.message;
                response.status(500).json(json);
            }
        } else {
            json.error = "Erro no ID";
            response.status(400).json(json);
        }
    },

    deleteTurmas: async (request, response) => {
        let json = { error: "", result: "" };
        const id = request.params.id;

        if (id) {
            try {
                await turmaService.deleteTurmas(id);
                json.result = `Turma deletada com sucesso ID: ${id}`;
                response.json(json);
            } catch (error) {
                json.error = "Erro ao deletar turma: " + error.message;
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
    
            for (let atividade of atvs) {
                json.result.push({
                    id: atividade.id,
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
    
};
