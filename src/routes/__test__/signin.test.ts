import request from 'supertest';
import { app } from '../../app';

describe('Signin router tests', () => {
  it('Receive a status code of 200 upon successful signin', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'vaggos@vaggos.com',
        password: 'vaggos312'
      })
      .expect(201);

    return request(app)
      .post('/api/users/signin')
      .send({
        email: 'vaggos@vaggos.com',
        password: 'vaggos312'
      })
      .expect(200);
  });

  it('Fails when an email that does not exist is supplied', async () => {
    return request(app)
      .post('/api/users/signin')
      .send({
        email: 'vas@vaggos.com',
        password: 'vaggos312'
      })
      .expect(400);
  });

  it('Fails when a wrong password is provides', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'vaggos@vaggos.com',
        password: 'vaggos312'
      })
      .expect(201);

    return request(app)
      .post('/api/users/signin')
      .send({
        email: 'vaggos@vaggos.com',
        password: 'sasasas'
      })
      .expect(400);
  });

  it('Stores cookie when valid credentials are supplied', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'vaggos@vaggos.com',
        password: 'vaggos312'
      })
      .expect(201);

    const res = await request(app)
      .post('/api/users/signin')
      .send({
        email: 'vaggos@vaggos.com',
        password: 'vaggos312'
      })
      .expect(200);

      expect(res.get('Set-Cookie')).toBeDefined();
  });
});
