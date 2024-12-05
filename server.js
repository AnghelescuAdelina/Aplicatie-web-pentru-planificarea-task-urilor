const http=require('http');

const app=require('./app');

//we set the port to 3000 if there is not an already defined one
const port =process.env.PORT || 3000;

const server=http.createServer(app);
//starting the server
server.listen(port);
