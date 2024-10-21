import http from 'http';
import { getUser, updateUser } from '../data/data';
import { isValidateFields, isValidateTypes } from '../utils/validateUser';
import { findMatchId } from '../utils/matchId';
import { User } from '../data/types';
import { Errors } from '../enum';

export const put = (url: string, req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => {

  const matchId = findMatchId(url);
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    if (!body) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: Errors.EmptyBody }));
      return;
    };

    if (matchId) {
      try {
        const updateInfo: User = JSON.parse(body);

        if (!isValidateFields(updateInfo) || !isValidateTypes(updateInfo)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({message: Errors.InvalidRequest }));
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
          res.end(JSON.stringify({ message: Errors.UserNotFound }));
        }

      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: Errors.InvalidJSON }));
      }

    }

    else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: Errors.InvalidId }));
    };
  });
};
