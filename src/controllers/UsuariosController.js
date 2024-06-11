import ConexaoMySql from '../database/ConexaoMySql.js';

class UsuariosController {
  async listarCliente(req, resp) {
    try {
      const conexao = await new ConexaoMySql().getConexao();
      const sql = 'SELECT * FROM cliente';
      const [resultado] = await conexao.execute(sql);
      resp.send(resultado);
    } catch (error) {
      resp.status(500).send(error);
    }
  }

  async adicionar(req, resp) {
    try {
      const novoUsuario = req.body;
      if (!novoUsuario.nome_cliente || !novoUsuario.cpf_cliente || !novoUsuario.telefone_cliente || !novoUsuario.email_cliente || !novoUsuario.senha_cliente) {
        console.log(novoUsuario);
        resp.status(400).send('Todos os campos são obrigatórios.');
        return;
      }
      
      const conexao = await new ConexaoMySql().getConexao();
      const sql = 'INSERT INTO cliente (nome_cliente, cpf_cliente, telefone_cliente, email_cliente, senha_cliente) VALUES (?, ?, ?, ?, ?)';
      const [resultado] = await conexao.execute(sql, [
        novoUsuario.nome_cliente,
        novoUsuario.cpf_cliente,
        novoUsuario.telefone_cliente,
        novoUsuario.email_cliente,
        novoUsuario.senha_cliente
      ]);
      
      resp.send({ resultado });
    } catch (error) {
      resp.status(500).send(error.message);
    }
  }

  async atualizar(req, resp) {
    try {
      const usuarioEditar = req.body;

      if (!usuarioEditar.id_cliente || !usuarioEditar.nome_cliente || !usuarioEditar.email_cliente) {
        resp.status(400).send('Os campos id_cliente, nome_cliente e email_cliente são obrigatórios para atualizar.');
        return;
      }

      const conexao = await new ConexaoMySql().getConexao();
      const sql = 'UPDATE cliente SET nome_cliente = ?, email_cliente = ?, telefone_cliente = ?, senha_cliente = ? WHERE id_cliente = ?';
      const [resultado] = await conexao.execute(sql, [
        usuarioEditar.nome_cliente,
        usuarioEditar.email_cliente,
        usuarioEditar.telefone_cliente,
        usuarioEditar.senha_cliente,
        usuarioEditar.id_cliente
      ]);

      resp.send({ resultado });
    } catch (error) {
      resp.status(500).send(error);
    }
  }

  async excluir(req, resp) {
    try {
      const conexao = await new ConexaoMySql().getConexao();
      const sql = 'DELETE FROM cliente WHERE id_cliente = ?';
      const [resultado] = await conexao.execute(sql, [req.params.id_cliente]);
      resp.send(resultado);
    } catch (error) {
      resp.status(500).send(error);
    }
  }
}

export default UsuariosController;
