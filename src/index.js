import express from 'express';
import UsuariosController from './controllers/UsuariosController.js';
import cors from 'cors';
const port = 3000;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
 );
 

const usuariosController = new UsuariosController();
//crudUsuariso
app.get('/cliente', usuariosController.listarCliente);
app.post('/cliente', usuariosController.adicionar);
app.put('/cliente', usuariosController.atualizar);
app.delete('/cliente', usuariosController.excluir);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
