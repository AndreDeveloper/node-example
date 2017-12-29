const connStr = "Server=ASSERTH-401\\SQLEXPRESS;Database=BASE_TESTE;User Id=sa;Password=123456;";
// const connStr = "Server=DESKTOP-L73PS25;Database=MeuBanco;User Id=sa;Password=123456;";
const sql = require("mssql");
var conn;
 
async function find() {
    try {
        let pool = await sql.connect(connStr)
        // let result1 = await pool.request()
        //     //.input('input_parameter', sql.Int, value)
        //     .query('select * from itens')
            
        return await pool.request().query('select * from itens');
    } catch (err) {
        console.dir(err)                    
    }
}
sql.on('error', err => {
        console.dir(err)                        
})

var retorno =  find();
console.log(retorno);
// var find = (id) =>{
//     let filter = '';
//     if(id) filter = ' WHERE ID=' + parseInt(id);
//     sql.connect(connStr).then(() => {
//         return sql.query("select * from itens" + filter);
//     }).then(result => {
//         return result.recordset;
//         //console.dir(result.recordset);
//     }).catch(err => {
//         console.dir(err);
//     })
    
//     sql.on('error', err => {
//         console.dir(err);
//     })
// }
// console.log(find());

// sql.connect(connStr)
//     .then(conn => global.conn = conn)
//     .catch(err => console.log(err));

// async function conect(){
//     try{
//         var conexao;
//         await sql.connect(connStr)
//         .then(conn => conexao = conn)
//         .catch(err => console.log(err));
//         return conexao;
//     }catch(err){
//         console.log(err);
//     }
// }



// async function find(sqlQry){  
//                 var query;              
//                 if(global.conn)                
//                 await global.conn.request()
//                .query(sqlQry)
//                .then(result => {query = result.recordset; console.log(result.recordset)} )
//                .catch(err => {console.log(err)});               
//                console.log(query);
//                 return query;
//             }  
                
// find('SELECT * FROM itens');
// // console.log(find('SELECT * FROM itens'));
