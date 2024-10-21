import 'dotenv/config';
import http from 'node:http';
import { get } from './endpoints/get';
import { post } from './endpoints/post';
import { del } from './endpoints/delete';
import { put } from './endpoints/put';

const port = process.env.PORT;

export const server = http.createServer((req, res) => {
  if (req.url && req.url.startsWith('/api/users')) {
    switch (req.method) {
      case 'GET':
        get(req.url, req, res);
        break;
      case 'POST':
        post(req.url, req, res);
        break;
      case 'DELETE':
        del(req.url, req, res);
        break;
      case 'PUT':
        put(req.url, req, res);
        break;
      default:
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        break;
    }
  }
  else {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Endpoint not found' }));
  }
});

server.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
