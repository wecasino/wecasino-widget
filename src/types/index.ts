export class GameInfoResult {
  gameCode = "";
  gameType = "";
  gameState = "";
  gameDescr: { [key: string]: string } = {};
  gameMeta: { [key: string]: string } = {};
}

export class GameRoundResult {
  serverTs = 0;
  updateTs = 0;
  gameCode = "";
  gameType = "";
  gameState = "";
  roundId = "";
  roundCode = "";
  roundStartTs = 0;
  roundStopTs = 0;
  roundResultTs = 0;
  roundState = "";
  roundWin = "";
  roundCard = "";
  roundLucky = "";
  roundMeta: { [key: string]: string } = {};
  accumCards: string[] = [];
}

export type Game = {
  gameInfo?: GameInfoResult;
  gameRound?: GameRoundResult;
};

export type Games = { [gameCode: string]: Game };
