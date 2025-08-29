export enum GuessFeedback {
  Low = 'low',
  High = 'high',
  Correct = 'correct',
}

export type GuessResult = {
  feedback: GuessFeedback;
  message: string;
  attempts: number;
  isFinished: boolean;
}

export type GameConfig = {
  minRange: number;
  maxRange: number;
}
