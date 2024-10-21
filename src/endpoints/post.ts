import http from 'http';
import { v4 } from 'uuid';
import { addData } from '../data/data';
import { isValidateFields, isValidateTypes } from '../utils/validateUser';
import { User } from '../data/types';
import { Errors } from '../enum';

export const post = (url: string, req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => {
  if (url === '/api/users') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {

      if (!body) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: Errors.EmptyBody }));
        return;
      }

      try {
        const user: User = JSON.parse(body);

        if (isValidateFields(user) && isValidateTypes(user)) {
          const id = v4();
          res.writeHead(201, { 'Content-Type': 'application/json' });
          addData(id, user);
          res.end(JSON.stringify({ id, ...user }));
        } else {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: Errors.InvalidRequest }));
        }

      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: Errors.InvalidJSON }));
      }
    });
  }

  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: Errors.InvalidUrl}));
  }
}
