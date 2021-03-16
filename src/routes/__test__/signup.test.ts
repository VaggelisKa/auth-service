import request from 'supertest';
import { app } from '../../app';

describe('Signup router test', () => {
  it('Returns a 201 status code upon successful signup', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'pass12345'
      })
      .expect(201);
  });


  it('Returns a 400 status code upon entering an invalid password or invalid email', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'pa'
      })
      .expect(400);

    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@te',
        password: 'password'
      })
      .expect(400);
  });

  it('Returns a 400 status code when email and password fields are empty', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: '',
        password: ''
      })
      .expect(400);
  });

  it('Disallows duplicate emails', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password21212'
      })
      .expect(201);

    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password21212'
      })
      .expect(400);
  });

  it('Sets a cookie upon successful signup', async () => {
    const res = await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password21212'
      })
      .expect(201);

    expect(res.get('Set-Cookie')).toBeDefined();
  })
});

