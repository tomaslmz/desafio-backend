import request from 'supertest';
import app from '../../appTest.setup';

const getToken = async (email: string, senha: string) => {
  const response = await request(app)
    .post('/api/v1/token/create')
    .send({ email, senha });

  return response.body.data.token;
};

export default getToken;