import ConexaoMySql from '../database/ConexaoMySql.js';

class VagasController {
  async listarVagas(req, resp) {
    try {
      const conexao = await new ConexaoMySql().getConexao();
      const sql = 'SELECT * FROM cadastro_vaga';
      const [resultado] = await conexao.execute(sql);

      resp.send(resultado);
    } catch (error) {
      resp.status(500).send(error);
    };
  };


  async adicionar(req, resp) {
    try {
      const novaVaga = req.body;
      // if (!novaVaga.nome_vaga || !novaVaga.valor || !novaVaga.logadouro || !novaVaga.estado || !novaVaga.capacidade) {
        console.log(novaVaga);
      //   resp.status(400).send('Todos os campos são obrigatórios.');
      //   return;
      // }
      
      const conexao = await new ConexaoMySql().getConexao();
      const sql = 'INSERT INTO cadastro_vaga (nome_vaga, capacidade, valor, logadouro, bairro, cidade, estado) VALUES (?, ?, ?, ?, ?, ?, ?)';
      
      const [resultado] = await conexao.execute(sql, [
        novaVaga.nome_vaga,
        novaVaga.capacidade,
        novaVaga.valor,
        novaVaga.logadouro,
        novaVaga.bairro,
        novaVaga.cidade,
        novaVaga.estado,
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
      const sql = 'DELETE FROM cadastro_vaga WHERE id_vaga = ?';
        const [resultado] = await conexao.execute(sql,[+req.params.id_vaga]);
        
        resp.send(resultado);
      } catch (error) {
        resp.status(500).send(error);
      }

}
};

export default VagasController
