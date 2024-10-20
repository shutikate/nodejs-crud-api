import http from 'http';
import { getUser, deleteUser } from '../data/data';

export const del = (url: string, req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => {

  const matchId = url.match(/^\/api\/users\/([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})$/);

    if (matchId) {
      const userId = matchId[1];
      const user = getUser(userId);

      if (user) {
        deleteUser(userId);
        res.writeHead(204, { 'Content-Type': 'application/json' });
        res.end();
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User with provided id does not exist' }));
      }

    }

    else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Format of provided id is invalid (not uuid)' }));
    }
};
