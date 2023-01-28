const connection = require("../config/connection.js");
const typesErrors = require("../util/typesMessages.js");

const requestFindQuery = async (queryId) => {
  try {
    let data;
    if (!queryId) typesErrors.throwExcepction({
      error: true,
      status: 401,
      message: "Id Query no provided"
    })

    data = await connection
    .query(`SELECT "SQL_QUERY", "SQL_TYPE" FROM "PUBLIC"."FW_SQL" WHERE "SQL_ID" = ${queryId}`)
    .then(result => result.rows[0])
    .catch(error => error.stack);
    if (!data) typesErrors.throwExcepction({
      error: true,
      status: 401,
      message: "Id Query no existe"
    })

    return data
  } catch (error) {
    return error
  }
}

const REQUEST_DATABASE = async (params) => {
  try {
    let { queryId, body } = params;
    let resultQuery = await requestFindQuery(queryId);
    let { SQL_QUERY } = resultQuery
    body = JSON.stringify(body);

    if (resultQuery.error) throw(resultQuery)
    if (!SQL_QUERY) throw(typesErrors.throwExcepctionServer())
    const data = await connection.query(`SELECT "PUBLIC"."${SQL_QUERY}"(CAST('${body}' AS JSON))`).then(result => typeof result.rows[0][SQL_QUERY] === "string" ? JSON.parse(result.rows[0][SQL_QUERY]) : result.rows[0][SQL_QUERY]).catch(error => error.stack)
    // connection.end();
    const messageReturn = typesErrors.returnData(data)
    if (messageReturn.error) throw(messageReturn)

    return messageReturn
  } catch (error) {
    return typesErrors.throwExcepction(error)
  }
}

module.exports = { 
  REQUEST_DATABASE
}