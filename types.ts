export enum Player {
  X = 'X',
  O = 'O',
}

export type BoardState = (Player | null)[];

export interface WinState {
  winner: Player | null;
  line: number[] | null;
  isDraw: boolean;
}

export interface GameState {
  board: BoardState;
  currentPlayer: Player;
  winState: WinState;
  history: BoardState[];
  currentStep: number;
}