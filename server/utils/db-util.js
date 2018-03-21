const allConfig = require("./../../config/env/config")
const config = allConfig.default.database;

const mysql = require("mysql");

const pool = mysql.createPool({
  host     :  config.HOST,
  user     : config.USERNAME,
  password : config.PASSWORD,
  database : config.DATABASE,
  dateStrings: 'DATE'
});

let query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        resolve( err )
      } else {
        let st =  connection.query(sql, values, ( err, rows) => {
          if ( err ) {
            reject( err )
          } else {
            console.log(st.sql)
            let result = JSON.stringify(rows);
            resolve(JSON.parse(result));
          }
          connection.release()
        })

      }
    })
  })

};

module.exports = {
  query,
};
