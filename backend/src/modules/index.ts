import { Router } from 'express';
import { readdirSync } from 'fs';
import { join } from 'path';
import config from '@/config';
import { logger } from '@/core/utils/logger';

const apiRouter = Router();
const versionRouter = Router();

const modulesPath = __dirname;

readdirSync(modulesPath, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .forEach(dir => {
    const moduleName = dir.name;
    const routesPath = join(modulesPath, moduleName);
    try {
      const routeFiles = readdirSync(routesPath).filter(file => file.endsWith('.routes.ts') || file.endsWith('.routes.js'));
      if (routeFiles.length > 0) {
        const routeFile = routeFiles[0];
        const { default: moduleRouter } = require(join(routesPath, routeFile));
        versionRouter.use(`/${moduleName}`, moduleRouter);
        logger.info(`Rotas do módulo '${moduleName}' carregadas em /${moduleName}`);
      }
    } catch (error) {
      logger.error(`Erro ao carregar rotas para o módulo '${moduleName}':`, error);
    }
  });

apiRouter.use(`/${config.apiVersion}`, versionRouter);

export default apiRouter;
