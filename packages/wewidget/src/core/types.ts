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

export type PlayerActivityRankList = {
  data: PlayerActivityRankListEntry[];
};
export type PlayerActivityRankListEntry = {
  // 玩家UID
  userUid: string;
  // 玩家名稱
  userCode: string;
  // 排名
  rank: number;
  // 分數
  rankScore: number;
  // 獲得的獎品紀錄
  winPrizes: RankListWinPrizesEntry[];
  // 大頭貼
  avatarUrl: string;
  // 會員等級
  memberLevel: string;
};

export type RankListWinPrizesEntry = {
  // 獎項ID
  prizeId: string;
  // 獎項名稱
  prizeName: string;
  // 獲獎次數
  winCount: number;
};

export type ActivityUpdateEntry = {
  serverTs: number;
  // 活動id
  activityId: string;
  // 玩家
  userName: string;
  // 通知事件類型, should be 2
  event: number;
  // 獎項名稱
  prizeName: string;
  prizeCond: string;
};
