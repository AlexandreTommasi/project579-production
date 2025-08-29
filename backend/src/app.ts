import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import config from './config';
import { requestLogger } from './core/middleware/requestLogger';
import { errorHandler } from './core/middleware/errorHandler';
import { notFoundHandler } from './core/middleware/notFoundHandler';
import apiRouter from './modules';

const app: Application = express();

// Middlewares de segurança
app.use(helmet());
app.use(cors({ origin: config.cors.origin }));

// Middlewares para parse do corpo da requisição
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de log de requisições
app.use(requestLogger);

// Rota de Health Check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

// Rotas da API
app.use('/api', apiRouter);

// Middlewares de tratamento de erros (devem ser os últimos a serem registrados)
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
