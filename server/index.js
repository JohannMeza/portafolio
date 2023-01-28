const app = require("./app.js");
const connection = require("./config/connection.js");
connection.connect();
app.listen(app.get("port"), () => console.log("Running server on the port: " + app.get("port")));