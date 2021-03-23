import request from 'supertest';
import { app } from '../../app';

describe('Signout router test', () => {
  it('Should delete cookie when user signs out', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'vaggos@vaggos.com',
        password: 'vaggos312'
      })
      .expect(201);

    await request(app)
      .post('/api/users/signin')
      .send({
        email: 'vaggos@vaggos.com',
        password: 'vaggos312'
      })
      .expect(200);

    const res = await request(app)
      .post('api/users/signout')

    expect(res.get('Set-Cookie')).toBeUndefined();
  });
});
