import { GuessFeedback, GameConfig } from "@/types/game";

export type GameState = {
    sessionId: string | null;
    attempts: number;
    feedback: GuessFeedback | null;
    feedbackMessage: string;
    isFinished: boolean;
    isLoading: boolean;
    error: string | null;
    config: GameConfig;
}

export type GameContextType = GameState & {
    startNewGame: () => Promise<void>;
    submitGuess: (guess: number) => Promise<void>;
    fetchConfig: () => Promise<void>;
    updateConfig: (newConfig: GameConfig) => Promise<void>;
}

export type GameProviderProps = {
    children: React.ReactNode;
};