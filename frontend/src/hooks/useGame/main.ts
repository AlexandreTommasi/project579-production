import { useContext } from 'react';
import { GameContext, GameContextType } from '@/contexts/GameContext';

/**
 * @hook useGame
 * @description Provides access to the game context.
 * @returns {GameContextType} The game context.
 */
export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
