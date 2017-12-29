const connStr = "Server=ASSERTH-401\\SQLEXPRESS;Database=BASE_TESTE;User Id=sa;Password=123456;";
const sql = require("mssql");

sql.connect(connStr)
   .then(conn => {console.log("conectou!"); createTable();})
   .catch(err => console.log("erro! " + err));

function createTable(conn){
 
      const table = new sql.Table('Itens');
      table.create = true;
      table.columns.add('nome', sql.NVarChar(30), {nullable: false, primary: true});
      table.columns.add('descricao', sql.NVarChar(30), {nullable: false});
      table.columns.add('quantidade', sql.Int, {nullable: false});
      table.rows.add('teste1','teste1', 3);
      table.rows.add('teste2','teste2', 3);
      table.rows.add('teste3','teste3', 3);
 
      const request = new sql.Request()
      request.bulk(table)
             .then(result => console.log('funcionou'))
             .catch(err => console.log('erro no bulk. ' + err));
}
