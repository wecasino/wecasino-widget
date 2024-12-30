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

// JP累積資訊
export class JackpotInfoResult {
  currency = "";
  jpCode = "";
  jpGrandAmt = 0;
  jpMajorAmt = 0;
  jpMinorAmt = 0;
  jpMiniAmt = 0;
  gameCodes: string[] = [];
}

export type Game = {
  gameInfo?: GameInfoResult;
  gameRound?: GameRoundResult;
  jackpotInfo?: JackpotInfoResult;
};

export type Games = { [gameCode: string]: Game };
