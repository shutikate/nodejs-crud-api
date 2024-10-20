import 'dotenv/config';
import http from 'node:http';
import { get } from './endpoints/get.ts';
import { post } from './endpoints/post.ts';
import { del } from './endpoints/delete.ts';
import { put } from './endpoints/put.ts';

const port = process.env.PORT;

const server = http.createServer((req, res) => {
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
        res.end(JSON.stringify({ error: 'Request error: method not allowed' }));
        break;
    }
  }
  else {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Request error: endpoint not found' }));
  }
});

server.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
