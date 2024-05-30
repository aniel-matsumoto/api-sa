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
    };
  };


  async adicionar(req, resp) {
    try {
      const novoUsuario = req.body;
      // Verificação de campos obrigatórios
      if (!novoUsuario.nome_cliente || !novoUsuario.cpf_cliente || !novoUsuario.telefone_cliente || !novoUsuario.email_cliente || !novoUsuario.senha_cliente) {
        console.log(novoUsuario);
        resp.status(400).send('Todos os campos são obrigatórios.');
        return;
      }
      
      const conexao = await new ConexaoMySql().getConexao();
      const sql = 'INSERT INTO cliente (nome_cliente, cpf_cliente, telefone_cliente, email_cliente, senha_cliente) VALUES (?, ?, ?, ?, ?)';
      
      // Passando todos os valores na consulta SQL
      const [resultado] = await conexao.execute(sql, [
        novoUsuario.nome_cliente,
        novoUsuario.cpf_cliente,
        novoUsuario.telefone_cliente,
        novoUsuario.email_cliente,
        novoUsuario.senha_cliente
      ]);
      
      resp.send({ resultado });
      
      // Fechando a conexão
      await conexao.end();
    } catch (error) {
      resp.status(500).send(error.message);
    }
  }
    

    

  atualizar() {}

  async excluir() {
    try {
      const conexao = await new ConexaoMySql().getConexao();
      const sql = 'DELETE FROM usuarios WHERE id_usuario = ?';
        const [resultado] = await conexao.execute(sql,[+req.params.id_usuario]);
        
        resp.send(resultado);
      } catch (error) {
        resp.status(500).send(error);
      }

}
};

export default UsuariosController
