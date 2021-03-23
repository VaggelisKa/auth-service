import request from 'supertest';
import { app } from '../../app';

describe('CurrentUser route tests', () => {
  it('Responds with details about the current user', async () => {
    const cookie = await global.getCookie();

    const res = await request(app)
      .get('/api/users/currentUser')
      .set('Cookie', cookie)
      .expect(200);

    const { currentUser } = res.body;

    expect(currentUser).toBeTruthy();
    expect(currentUser.email).toEqual('vaggos@vaggos.com');
    expect(currentUser.id).toBeDefined();
  });

  it('CurrentUser should be null when request does not have a cookie', async () => {
    const res = await request(app)
      .get('/api/users/currentUser')
      .send()
      .expect(200);

    const { currentUser } = res.body;

    expect(currentUser).toBeNull();
  });
});


