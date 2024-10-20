import http from 'http';
import { v4 } from 'uuid';
import { addData, isValidateTypes, isValidateFields } from '../data/data';
import { User } from '../data/types';

export const post = (url: string, req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => {
  if (url === '/api/users') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {

      if (body) {
        try {
          const user: User = JSON.parse(body);

          if (isValidateFields(user) && isValidateTypes(user)) {
            const id = v4();
            res.writeHead(201, { 'Content-Type': 'application/json' });
            addData(id, user);
            res.end(JSON.stringify({ id, ...user }));
          } else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Request does not contain required fields or an invalid type is specified'}));
          }
        } catch (error) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Invalid JSON format'}));
        }
      }
      else {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Request with empty body'}));
      }
    });
  }

  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Request with invalid url'}));
  }
}
