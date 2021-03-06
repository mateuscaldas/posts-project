const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('./data.json');
const middlewares = jsonServer.defaults();
const port = 3333;

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log('JSON Server is running')});
