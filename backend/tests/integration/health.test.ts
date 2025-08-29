import request from 'supertest';
import app from '@/app';

describe('GET /health', () => {
  it('deve retornar status 200 e a mensagem de status UP', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'UP');
    expect(response.body).toHaveProperty('timestamp');
  });
});

describe('Rota Inexistente', () => {
  it('deve retornar status 404 para uma rota que não existe', async () => {
    const response = await request(app).get('/rota-que-nao-existe');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toContain('não foi encontrada');
  });
});
