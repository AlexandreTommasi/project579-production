import request from 'supertest';
import app from '@/app';
import { StatusCodes } from 'http-status-codes';
import config from '@/config';

describe('Health Check API', () => {
  it('should return 200 OK and health status', async () => {
    const response = await request(app).get(`/api/${config.apiVersion}/health`);

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toHaveProperty('uptime');
    expect(response.body).toHaveProperty('message', 'OK');
    expect(response.body).toHaveProperty('timestamp');
  });
});
