import { Router } from 'express';
import { readdirSync } from 'fs';
import { join } from 'path';
import logger from '../core/logging/logger';

const apiRouter = Router();

const modulesPath = join(__dirname, '../modules');

// Carregamento dinâmico de rotas dos módulos
readdirSync(modulesPath, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .forEach((dir) => {
    const moduleName = dir.name;
    const routesPath = join(modulesPath, moduleName);

    try {
      const routeFiles = readdirSync(routesPath).filter(
        (file) => file.endsWith('.routes.ts') || file.endsWith('.routes.js')
      );

      if (routeFiles.length > 0) {
        const routeFile = routeFiles[0]; // Pega o primeiro arquivo de rotas encontrado
        const moduleRouter = require(join(routesPath, routeFile)).default;
        apiRouter.use(`/${moduleName}`, moduleRouter);
        logger.info(`Rotas do módulo '${moduleName}' carregadas com sucesso.`);
      } else {
        logger.warn(`Nenhum arquivo de rotas (*.routes.ts) encontrado para o módulo '${moduleName}'.`);
      }
    } catch (error) {
      logger.error(`Erro ao carregar rotas para o módulo '${moduleName}':`, error);
    }
  });

export default apiRouter;
