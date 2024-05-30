import ConexaoMySql from "../database/ConexaoMySql.js";

class AutenticacaoController {
  async logar(req, resp) {
    try {
      if (!req.body.email_cliente || !req.body.senha_cliente) {
        resp.status(400).send("Os campos email e senha são obrigatórios!");
        return;
      }
      console.log(req.body);
      const conexao = await new ConexaoMySql().getConexao();
      const sql =
        "SELECT * FROM cliente WHERE email_cliente = ? AND senha_cliente = ? ";
        console.log (sql)
        const [resultado] = await conexao.execute(sql, [req.body.email_cliente, req.body.senha_cliente,]);
        console.log(resultado)

      const usuarioEncontradoNoBancoDeDados = resultado[0];

     
      if (!usuarioEncontradoNoBancoDeDados) {
        resp.status(401).send("Email ou senha incorreta!"); 
        return;
      }

      resp.send(usuarioEncontradoNoBancoDeDados);
    } catch (error) {
      resp.status(500).send(error);
    }
  }
}

export default AutenticacaoController;
