import http from 'http';
import { findMatchId } from '../utils/matchId';
import { getUser, deleteUser } from '../data/data';
import { Errors } from '../enum';

export const del = (url: string, req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => {

  const matchId = findMatchId(url);

    if (matchId) {
      const userId = matchId[1];
      const user = getUser(userId);

      if (user) {
        deleteUser(userId);
        res.writeHead(204, { 'Content-Type': 'application/json' });
        res.end();
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: Errors.UserNotFound }));
      }

    }

    else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: Errors.InvalidId }));
    }
};
