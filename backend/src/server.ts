import http from 'http';
import app from './app';
import config from './config';
import { logger } from './core/utils/logger';

const server = http.createServer(app);

const startServer = async () => {
  try {
    server.listen(config.port, () => {
      logger.info(`Servidor executando em http://localhost:${config.port} no modo ${config.env}`);
    });
  } catch (error) {
    logger.error('Falha ao iniciar o servidor:', error);
    process.exit(1);
  }
};

const gracefulShutdown = (signal: string) => {
  process.on(signal, () => {
    logger.info(`Sinal ${signal} recebido. Encerrando a aplicação...`);
    server.close(() => {
      logger.info('Servidor HTTP encerrado.');
      process.exit(0);
    });
  });
};

gracefulShutdown('SIGTERM');
gracefulShutdown('SIGINT');

startServer();
