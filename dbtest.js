var oracledb = require('oracledb');
var dbConfig = require('./dbconfig.js');


oracledb.getConnection(
    {
        user          : dbConfig.user,
        password      : dbConfig.password,
        connectString : dbConfig.connectString
    },
    function(err, connection)
    {
        if (err) {
            console.error(err.message);
            return;
        }
         connection.execute(
            `BEGIN :ret := PKG_GDS_MGR.F_GET_GDS_LODING_ERROR(:PO_V_ERR, :PO_CUR, :PI_V_START_DATE, :PI_V_END_DATE); END;`,
            {
                PO_V_ERR : {
                    dir : oracledb.BIND_OUT,
                    type : oracledb.STRING
                }, 
                PO_CUR : {
                    dir : oracledb.BIND_OUT,
                    type : oracledb.CURSOR
                },
                PI_V_START_DATE : {
                    dir : oracledb.BIND_IN,
                    type : oracledb.STRING,
                    val : '2020-02-21'
                },
                PI_V_END_DATE : {
                    dir : oracledb.BIND_IN,
                    type : oracledb.STRING,
                    val : '2020-02-28',
                },
                ret : {
                    type : oracledb.NUMBER
                }
            },
            function(err, result)
            {
                if (err) {
                    console.error(err.message);
                    doRelease(connection);
                    return;
                }
                console.log('111111111111' );
                console.log(result.metaData );
                console.log(result.rows);
                console.log(result.rows[0]);
                console.log('222222222222' );
                
                var bb = result.rows[0];

                for(var i=0; i < 2; i++){
                    console.log(bb[i]);
                }

                doRelease(connection);
            });
        });        
        // connection.execute(
        //     "SELECT * FROM aaa ",
        //     function(err, result)
        //     {
        //         if (err) {
        //             console.error(err.message);
        //             doRelease(connection);
        //             return;
        //         }
        //         console.log('111111111111' );
        //         console.log(result.metaData );
        //         console.log(result.rows);
        //         console.log(result.rows[0]);
        //         console.log('222222222222' );
                
        //         var bb = result.rows[0];

        //         for(var i=0; i < 2; i++){
        //             console.log(bb[i]);
        //         }

        //         doRelease(connection);
        //     });
        // });

function doRelease(connection)
{
    connection.release(
        function(err) {
            if (err) {
                console.error(err.message);
            }
        });
}