import { produce } from "immer";
// import { shallow } from "zustand/shallow";
import { createStore } from "zustand/vanilla";

import { Game, GameInfoResult, GameRoundResult, Games } from "../types";

export interface IGameStore {
  games: Games;
  gameCodes: string[];
  updateGameCode: (gameCode: string) => void;
  updateGames: (games: Game[]) => void;
  updateGameInfos: (gameInfos: GameInfoResult[]) => void;
  updateGameRounds: (gameRounds: GameRoundResult[]) => void;
}

const getStoreDefaultState = () => ({
  gameCodes: [],
  games: {},
});

const gameStore = createStore<IGameStore>((set) => ({
  ...getStoreDefaultState(),
  updateGameCode: (gameCode: string) => {
    set((s) =>
      produce(s, (draft) => {
        const otherCodes = draft.gameCodes.filter((gc) => gc !== gameCode);
        draft.gameCodes = [...otherCodes, gameCode];
      })
    );
  },
  updateGames: (games: Game[]) => {
    set((s) =>
      produce(s, (draft) => {
        const updatedGames: Games = games.reduce(
          (p, g) =>
            g.gameInfo?.gameCode ? { ...p, [g.gameInfo?.gameCode]: g } : p,
          {} as Games
        );
        draft.games = { ...draft.games, ...updatedGames };
      })
    );
  },
  updateGameInfos: (gameInfos: GameInfoResult[]) => {
    set((s) =>
      produce(s, (draft) => {
        const updatedGames: Games = gameInfos.reduce((p, g) => {
          const gameCode = g?.gameCode;
          if (!gameCode) return p;
          const game = p[gameCode];
          const nextGame = { ...game, gameInfo: g };
          return { ...p, [gameCode]: nextGame };
        }, s.games);
        draft.games = { ...draft.games, ...updatedGames };
      })
    );
  },
  updateGameRounds: (gameRounds: GameRoundResult[]) => {
    set((s) =>
      produce(s, (draft) => {
        const updatedGames: Games = gameRounds.reduce((p, g) => {
          const gameCode = g?.gameCode;
          if (!gameCode) return p;
          const game = p[gameCode];
          const nextGame = { ...game, gameRound: g };
          return { ...p, [gameCode]: nextGame };
        }, s.games);
        draft.games = { ...draft.games, ...updatedGames };
      })
    );
  },
}));

export default gameStore;
