import supertest from 'supertest';
import { server } from '../index';

const request = supertest(server);

describe('Requests to work with user data', () => {

  let id: string;

  afterAll((done) => {
    server.close(done);
  });

  test("should return empty array", async () => {
    const response = await request.get('/api/users');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('should create user', async () => {
    const response = await request.post('/api/users').send({
      username: 'Mary',
      age: 30,
      hobbies: ['play piano', 'watch films']
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ id: expect.any(String), username: 'Mary', age: 30, hobbies: ['play piano', 'watch films'] });
    id = response.body.id;
  });

  test('should get user by id', async () => {
    const response = await request.get(`/api/users/${id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ id, username: 'Mary', age: 30, hobbies: ['play piano', 'watch films'] });
  });

  test('should update user', async () => {
    const response = await request.put(`/api/users/${id}`).send({
      username: 'Mary',
      age: 30,
      hobbies: ['play piano', 'swimming']
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ id, username: 'Mary', age: 30, hobbies: ['play piano', 'swimming'] });
  });

  test('should delete user', async () => {
    const response = await request.delete(`/api/users/${id}`);
    expect(response.statusCode).toBe(204);
  });

  test('get a deleted user', async () => {
    const response = await request.get(`/api/users/${id}`);
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ message: 'User with provided id does not exist'});
  });

  test('endpoint not found', async () => {
    const response = await request.get('/api/user');
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ error: 'Endpoint not found' });
  });

  test('Format of provided id is invalid', async () => {
    const response = await request.get('/api/users/123');
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ message: 'Format of provided id is invalid (not uuid)' });
  });

  test('Invalid request', async () => {
    const response = await request.post('/api/users').send({
      username: 'Mary',
      age: 30
    });
    expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ message: 'Request does not contain required fields or an invalid type is specified' });
  });

});
