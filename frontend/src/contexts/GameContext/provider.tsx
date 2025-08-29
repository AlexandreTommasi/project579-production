'use client';

import { useState, useCallback, useEffect } from 'react';
import { GameContext } from './context';
import { GameProviderProps, GameState } from './types';
import * as gameService from '@/services/api';
import { GameConfig } from '@/types/game';

const initialState: GameState = {
  sessionId: null,
  attempts: 0,
  feedback: null,
  feedbackMessage: 'Adivinhe o número para começar!',
  isFinished: false,
  isLoading: false,
  error: null,
  config: { minRange: 1, maxRange: 100 },
};

export const GameProvider = ({ children }: GameProviderProps) => {
  const [state, setState] = useState<GameState>(initialState);

  const fetchConfig = useCallback(async () => {
    try {
      setState(s => ({ ...s, isLoading: true }));
      const config = await gameService.getGameConfig();
      setState(s => ({ ...s, config, isLoading: false }));
    } catch (error) {
      console.error('Failed to fetch game config:', error);
      setState(s => ({ ...s, error: 'Não foi possível carregar a configuração do jogo.', isLoading: false }));
    }
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  const startNewGame = useCallback(async () => {
    setState({ ...initialState, config: state.config, isLoading: true });
    try {
      const { sessionId } = await gameService.startGame();
      setState(s => ({ ...s, sessionId, isLoading: false, feedbackMessage: `Novo jogo iniciado! Adivinhe um número entre ${s.config.minRange} e ${s.config.maxRange}.` }));
    } catch (error) {
      console.error('Failed to start new game:', error);
      setState(s => ({ ...s, error: 'Não foi possível iniciar um novo jogo.', isLoading: false }));
    }
  }, [state.config]);

  const submitGuess = useCallback(async (guess: number) => {
    if (!state.sessionId || state.isFinished) return;

    setState(s => ({ ...s, isLoading: true, error: null }));
    try {
      const result = await gameService.makeGuess(state.sessionId, guess);
      setState(s => ({
        ...s,
        attempts: result.attempts,
        feedback: result.feedback,
        feedbackMessage: result.message,
        isFinished: result.isFinished,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Failed to submit guess:', error);
      setState(s => ({ ...s, error: 'Ocorreu um erro ao enviar o palpite.', isLoading: false }));
    }
  }, [state.sessionId, state.isFinished]);

  const updateConfig = useCallback(async (newConfig: GameConfig) => {
    setState(s => ({ ...s, isLoading: true, error: null }));
    try {
        await gameService.updateGameConfig(newConfig);
        setState(s => ({ ...s, config: newConfig, isLoading: false }));
    } catch (error) {
        console.error('Failed to update config:', error);
        setState(s => ({ ...s, error: 'Falha ao atualizar a configuração.', isLoading: false }));
        throw error; // Re-throw to be caught in the form
    }
  }, []);

  const value = {
    ...state,
    startNewGame,
    submitGuess,
    fetchConfig,
    updateConfig,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
