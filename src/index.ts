import 'dotenv/config';
import http from 'node:http';

const port = process.env.PORT;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
});

server.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
