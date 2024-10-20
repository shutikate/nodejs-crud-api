import http from 'http';
import { getUser, updateUser, isValidateFields, isValidateTypes } from '../data/data';
import { User } from '../data/types';

export const put = (url: string, req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => {

  const matchId = url.match(/^\/api\/users\/([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})$/);
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    if (!body) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Request with empty body' }));
      return;
    };

    if (matchId) {
      try {
        const updateInfo: User = JSON.parse(body);

        if (!isValidateFields(updateInfo) || !isValidateTypes(updateInfo)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            message: 'Request does not contain required fields or an invalid type is specified' }));
          return;
        }

        const userId = matchId[1];
        const user = getUser(userId);

        if (user) {
          updateUser(userId, user, updateInfo);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ...user, ...updateInfo }));
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'User with provided id does not exist' }));
        }

      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid JSON format' }));
      }

    }

    else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Format of provided id is invalid (not uuid)' }));
    };
  });
};
