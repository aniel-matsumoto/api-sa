import express from 'express';
import UsuariosController from './controllers/UsuariosController.js';
import cors from 'cors';
import AutenticacaoController from './controllers/autenticacaoController.js';
import VagasController from './controllers/Vagascontoller.js';

const port = 3000;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
 );

 const autenticacaoController = new AutenticacaoController();
app.post('/logar', autenticacaoController.logar);


 

const usuariosController = new UsuariosController();
//crudUsuariso
app.get('/cliente', usuariosController.listarCliente);
app.post('/cliente', usuariosController.adicionar);
app.put('/cliente', usuariosController.atualizar);
app.delete('/cliente', usuariosController.excluir);


const vagasController = new VagasController();
app.get('/listar_vagas', vagasController.listarVagas);
app.post('/adicionar_vaga', vagasController.adicionar);
app.put('/vaga', vagasController.atualizar);
app.delete('/vaga', vagasController.excluir);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
