import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '43577584',
  database: 'estacionamento_sa',
};

class ConexaoMySql {
  async getConexao() {
    if (!ConexaoMySql.conexao) {
      ConexaoMySql.conexao = await mysql.createConnection(dbConfig);
    }

    return ConexaoMySql.conexao;
  }
}

export default ConexaoMySql;
