-- Este esquema SQL é fornecido para uma implementação persistente usando SQLite.
-- A implementação atual utiliza armazenamento em memória para simplicidade.

-- Tabela para armazenar a configuração do jogo
CREATE TABLE IF NOT EXISTS GameConfiguration (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    minRange INTEGER NOT NULL DEFAULT 1,
    maxRange INTEGER NOT NULL DEFAULT 100,
    lastUpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    lastUpdatedBy TEXT -- ID do administrador que atualizou
);

-- Inserir configuração inicial se a tabela estiver vazia
INSERT INTO GameConfiguration (minRange, maxRange) 
SELECT 1, 100
WHERE NOT EXISTS (SELECT 1 FROM GameConfiguration);


-- Tabela para armazenar as sessões de jogo ativas
CREATE TABLE IF NOT EXISTS GameSessions (
    sessionId TEXT PRIMARY KEY NOT NULL,
    secretNumber INTEGER NOT NULL,
    attempts INTEGER NOT NULL DEFAULT 0,
    isFinished BOOLEAN NOT NULL DEFAULT 0,
    startTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    endTime DATETIME
);

-- Tabela para logs de auditoria
CREATE TABLE IF NOT EXISTS AuditLogs (
    logId INTEGER PRIMARY KEY AUTOINCREMENT,
    sessionId TEXT,
    action TEXT NOT NULL, -- Ex: 'GAME_STARTED', 'CONFIG_UPDATED'
    details TEXT, -- JSON com detalhes, como o número secreto ou a nova configuração
    actorId TEXT, -- ID do usuário que realizou a ação
    timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sessionId) REFERENCES GameSessions(sessionId)
);

-- Índices para otimizar consultas
CREATE INDEX IF NOT EXISTS idx_audit_action ON AuditLogs(action);
CREATE INDEX IF NOT EXISTS idx_audit_timestamp ON AuditLogs(timestamp);
