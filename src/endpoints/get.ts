import http from 'http';
import { findMatchId } from '../utils/matchId';
import { getUser, getAllUsers } from '../data/data';
import { Errors } from '../enum';

export const get = (url: string, req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => {

  const matchId = findMatchId(url);

  if (matchId) {
    const userId = matchId[1];
    const user = getUser(userId);

    if (user) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: Errors.UserNotFound }));
    }

  }

  else if (url === '/api/users') {
    const users = getAllUsers();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  }

  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: Errors.InvalidId }));
  }
}
