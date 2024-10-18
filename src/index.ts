import 'dotenv/config';
import http from 'node:http';
import { get } from './endpoints/get.ts';
import { post } from './endpoints/post.ts';

const port = process.env.PORT;

const server = http.createServer((req, res) => {
  if (req.url && req.url.startsWith('/api/users')) {
    if (req.method === 'GET') {
      get(req.url, req, res);
    }
    if (req.method === 'POST') {
      post(req.url, req, res);
    }
  }
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Endpoint not found' }));
  }
});

server.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
