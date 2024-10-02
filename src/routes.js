const express = require('express');
const route = express.Router();
const cors = require('cors');
const turmaController = require('./controllers/TurmaController');
const professorController = require('./controllers/ProfessorController');
const atividadesController = require('./controllers/AtividadeController');

// Configuração do CORS para todas as rotas
route.use(cors());

//Endpoints - TURMA
route.get('/turma', turmaController.findALLTurmas);
route.post('/turma', turmaController.createTurmas);
route.put('/turma/:id', turmaController.updateTurmas);
route.delete('/turma/:id', turmaController.deleteTurmas);

//Endpoints - PROFESSORES
route.get('/prof', professorController.findALLprof);
route.post('/prof', professorController.createProfessor);
route.post('/prof/login', professorController.loginProfessor);
route.put('/prof/:id', professorController.updateProfessor);
route.delete('/prof/:id', professorController.deleteProfessores);

//Endpoints - ATIVIDADES
route.get('/atividades/:turma_id', atividadesController.findALLatividadesByTurma);
route.post('/atividades', atividadesController.createAtidades);
route.put('/atividades/:id', atividadesController.updateAtividades);
route.delete('/atividades/:id', atividadesController.deleteAtividades);

module.exports = route;
