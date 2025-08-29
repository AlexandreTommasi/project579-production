import axios from 'axios';
import { GameConfig, GuessResult } from '@/types/game';
import { ApiResponse } from '@/types/api';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Game Service
export const startGame = async (): Promise<ApiResponse<{ sessionId: string }>> => {
  const { data } = await api.post('/game/start');
  return data;
};

export const makeGuess = async (sessionId: string, guess: number): Promise<GuessResult> => {
  const { data } = await api.post(`/game/guess/${sessionId}`, { guess });
  return data;
};

// Config Service
export const getGameConfig = async (): Promise<GameConfig> => {
  const { data } = await api.get('/game/config');
  return data;
};

export const updateGameConfig = async (config: GameConfig): Promise<ApiResponse<{ config: GameConfig }>> => {
  const { data } = await api.put('/game/config', config);
  return data;
};

export default api;
