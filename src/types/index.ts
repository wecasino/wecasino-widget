export interface IDataStore {
  name?: string;
}

export type GameStreamResult = {
  capDomainMain?: string;
  capPathMain?: string;
};

export class GameInfoResult {
  gameCode = "";
  gameType = "";
  gameState = "";
  gameGenre = "";
  gamePvd = "";
  gameTags: string[] = [];
  gameSpecs: string[] = [];
  gameDescr: { [key: string]: string } = {};
  gameMeta: { [key: string]: string } = {};
  gameLimit = 0;
  gameTheme = "";
  gameFlag = 0;
  statsInfo: { [key: string]: string } = {};
}

export class GameRoundResult {
  serverTs = 0;
  updateTs = 0;
  gameCode = "";
  gameType = "";
  gameState = "";
  gameFlag = 0;
  roundId = "";
  roundCode = "";
  roundStartTs = 0;
  roundStopTs = 0;
  roundResultTs = 0;
  roundDay = 0;
  roundSeq = 0;
  roundShoe = 0;
  roundNum = 0;
  roundSec = 0;
  roundFlag = 0;
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
  gameStream?: GameStreamResult;
};

export type Games = { [gameCode: string]: Game };
