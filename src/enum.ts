export enum Errors {
  NotFound = 'Endpoint not found',
  InvalidId = 'Format of provided id is invalid (not uuid)',
  InvalidRequest = 'Request does not contain required fields or an invalid type is specified',
  InvalidJSON = 'Invalid JSON format',
  EmptyBody = 'Request with empty body',
  UserNotFound = 'User with provided id does not exist',
  InvalidUrl = 'Request with invalid url',
  NoMethod = 'Method not allowed'
}