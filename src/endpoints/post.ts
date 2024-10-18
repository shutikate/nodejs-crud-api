import http from 'http';
import { v4 } from 'uuid';
import { addData, isValidateUser } from '../data/data.ts';
import { User } from '../data/types.ts';

export const post = (url: string, req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => {
  if (url === '/api/users') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      if (body) {
        const user: User = JSON.parse(body);
        if (isValidateUser(user)) {
          const id = v4();
          res.writeHead(201, { 'Content-Type': 'application/json' });
          addData(id, user);
          res.end(JSON.stringify({ id, ...user }));
        } else {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Invalid request: request does not contain required fields'}));
        }
      }
      else {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid request: request does not contain required fields'}));
      }
    });
  }
}
