import request from 'supertest';
import app from '@/app';
import { UserRole } from '@/modules/auth/auth.types';

describe('Game Module API', () => {
  const adminAuthHeader = { 'x-user-role': UserRole.Admin, 'x-user-id': 'admin-test-user' };
  const playerAuthHeader = { 'x-user-role': UserRole.Player, 'x-user-id': 'player-test-user' };
  let gameSessionId: string;

  // Inicia um jogo antes de todos os testes que precisam de uma sessão
  beforeAll(async () => {
    const response = await request(app)
      .post('/api/v1/game/start')
      .set(playerAuthHeader);
    gameSessionId = response.body.sessionId;
  });

  describe('POST /api/v1/game/start', () => {
    it('deve iniciar um novo jogo e retornar um sessionId com status 201', async () => {
      const response = await request(app)
        .post('/api/v1/game/start')
        .set(playerAuthHeader)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'Novo jogo iniciado com sucesso!');
      expect(response.body).toHaveProperty('sessionId');
      expect(typeof response.body.sessionId).toBe('string');
    });
  });

  describe('Game Configuration Endpoints', () => {
    it('GET /config deve falhar com 403 para um jogador comum', async () => {
      await request(app)
        .get('/api/v1/game/config')
        .set(playerAuthHeader)
        .expect(403);
    });

    it('GET /config deve retornar a configuração padrão para um admin', async () => {
      const response = await request(app)
        .get('/api/v1/game/config')
        .set(adminAuthHeader)
        .expect(200);

      expect(response.body).toEqual({ minRange: 1, maxRange: 100 });
    });

    it('PUT /config deve falhar com 403 para um jogador comum', async () => {
      await request(app)
        .put('/api/v1/game/config')
        .set(playerAuthHeader)
        .send({ minRange: 10, maxRange: 50 })
        .expect(403);
    });

    it('PUT /config deve falhar com 400 para dados inválidos (min >= max)', async () => {
      const response = await request(app)
        .put('/api/v1/game/config')
        .set(adminAuthHeader)
        .send({ minRange: 100, maxRange: 50 })
        .expect(400);
      
      expect(response.body.message).toContain('Dados de entrada inválidos');
    });

    it('PUT /config deve atualizar a configuração com sucesso para um admin', async () => {
      const newConfig = { minRange: 10, maxRange: 50 };
      const response = await request(app)
        .put('/api/v1/game/config')
        .set(adminAuthHeader)
        .send(newConfig)
        .expect(200);

      expect(response.body.message).toBe('Configuração atualizada com sucesso!');
      expect(response.body.config).toEqual(newConfig);

      // Verifica se a configuração foi realmente alterada
      const getConfigResponse = await request(app)
        .get('/api/v1/game/config')
        .set(adminAuthHeader)
        .expect(200);
      
      expect(getConfigResponse.body).toEqual(newConfig);
    });
  });

  describe('POST /api/v1/game/:sessionId/guess', () => {
    it('deve retornar 400 para um palpite não numérico', async () => {
      await request(app)
        .post(`/api/v1/game/${gameSessionId}/guess`)
        .set(playerAuthHeader)
        .send({ guess: 'abc' })
        .expect(400);
    });

    it('deve retornar 404 para uma sessão inexistente', async () => {
      const nonExistentSessionId = '123e4567-e89b-12d3-a456-426614174000';
      await request(app)
        .post(`/api/v1/game/${nonExistentSessionId}/guess`)
        .set(playerAuthHeader)
        .send({ guess: 50 })
        .expect(404);
    });

    it('deve processar um palpite válido e retornar o feedback', async () => {
      const response = await request(app)
        .post(`/api/v1/game/${gameSessionId}/guess`)
        .set(playerAuthHeader)
        .send({ guess: 30 }) // Usando a nova configuração de 10-50
        .expect(200);

      expect(response.body).toHaveProperty('feedback');
      expect(['low', 'high', 'correct']).toContain(response.body.feedback);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('attempts', 1);
      expect(response.body).toHaveProperty('isFinished');
    });
  });
});
