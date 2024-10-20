import http from 'http';
import { getUser, updateUser } from '../data/data.ts';
import { UpdateUser } from '../data/types.ts';

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
      const updateInfo: UpdateUser = JSON.parse(body);
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

    }

    else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Format of provided id is invalid (not uuid)' }));
    };
  });
};
