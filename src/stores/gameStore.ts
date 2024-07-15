import { produce } from "immer";
// import { shallow } from "zustand/shallow";
import { createStore } from "zustand/vanilla";

import { Game, Games } from "../types";

export interface IGameStore {
  games: Games;
  gameCodes: string[];
  updateGameCode: (gameCode: string) => void;
  updateGames: (games: Game[]) => void;
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
}));

export default gameStore;
