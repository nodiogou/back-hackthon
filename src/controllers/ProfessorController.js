const { response } = require('express')
const professorService = require('../services/ProfessorService')


module.exports = {
    //autenticação de login
    loginProfessor: async (request, response) => {
        const { email, senha } = request.body;
    
        if (!email || !senha) {
            return response.status(400).json({ error: "Email e senha são obrigatórios." });
        }
    
        const professores = await professorService.searchProfessor(senha, email);
    
        if (professores.length > 0) {
            response.status(200).json({ id: professores[0].id, nome: professores[0].nome });
        } else {
            response.status(401).json({ error: "Credenciais inválidas." });
        }
    },
    
    //metodo para buscar todos os professores
    findALLprof: async (request, response) => {
        let json = { error: "", result: [] };
    
        try {
            let profs = await professorService.readProfessor();
    
            for (let professor of profs) {
                json.result.push({
                    id: professor.id, 
                    nome: professor.nome,
                    email: professor.email,
                    senha: professor.senha
                });
            }
            
            response.status(200).json(json);
        } catch (error) {
            json.error = "Erro ao buscar professores: " + error.message;
            response.status(500).json(json);
        }
    },
    
    //metodo para validação de existencia de conta
    readyProfessor: async (request, response) => {
        let json = { error: "", result: [] }

        let prof = await professorService.searchProfessor()

        for (let x in prof) {
            json.result.push({
                id: prof[x].id,
                nome: prof[x].nome_de_usuario,
                email: prof[x].email,
                senha: prof[x].senha
               
            })
        }
        

        if (json.result.length == 0) {
            response.status(200).json({
                message: "Nenhuma conta de usuario encontrada!!!"
            })
        } else {
            response.status(200).json(json)
        }
    },

    //metodo para criação de professor  
    createProfessor: async (request, response) => {
        let json = { error: "", result: {} }

        let nome = request.body.nome
        let senha = request.body.senha
        let email = request.body.email

        if (nome && senha && email) {

            let prof = await professorService.createProfessor(nome, senha, email)

            json.result = {
                id: prof.insertId,
                nome,
                senha,
                email
            }


        } else {
            json.error = "Campos imcompletos!"
        }


        response.status(201).json(json)
    },

    //metodo para atualização de professor
    updateProfessor: async (request, response) => {

        let json = { error:"",result: {}}

        let senha = request.body.senha
        let email = request.body.email
        
        if(i && emaild){

            await professorService.updateProfessor( id, nome,email, senha)

            json.result = {id, nome,senha}


        }else{
            email
            json.error = "Error no ID"

        }
        
        
        response.json(json)
    },

    //metodo para deletar
    deleteProfessores: async (request, response) => {
        
        let json = { error : "", result: "" }

        let id = request.params.id

        if(id){
            await professorService.deleteProfessor(id)
            json.result = `Professor deletada com sucesso ID:${id}`
        } else{
            json.error = "Erro no ID!"
        }

        response.json(json)

    }
}