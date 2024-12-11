import { useStore } from "zustand";
import { calcBAStats, calcCGStats } from "@wecasino/weroadmap";
import { type CGStats } from "@wecasino/weroadmap";
import { weClientInstance } from "../../core";
import { useMemo } from "react";

const toPercentages = (ns: number[] = [], upto = 100): number[] => {
  if (ns.length === 0) return [];

  // inputs sum to 100
  const sum = ns.reduce((sum, item) => sum + item, 0);
  const pp = ns.map((p) => (p / sum) * upto);

  // adjust
  const ap = pp.map((p) => ({
    value: p,
    floor: Math.floor(p),
    decimal: p % 1,
  }));

  // sort and add remains to larger value
  const remains = upto - ap.reduce((sum, p) => sum + p.floor, 0);
  ap.sort((a, b) => {
    // 0 < x < 1 -> 1
    if (a.value > 0 && a.value < 1) return -1;
    return b.decimal - a.decimal;
  });
  for (let i = 0; i < remains; i++) {
    ap[i]!.floor += 1;
  }

  // re sort to original
  const ret = pp.map((p) => {
    const item = ap.find((i) => i.value === p);
    return item ? item.floor : 0;
  });

  return ret;
};
const RoundState = {
  SHUFFLE: "shuffle",
  NEW_SHOE: "newshoe",
  START: "start",
  STOP: "stop",
  CARD: "card",
  RESULT: "result",
  CANCEL: "cancel",
};

export const BetCodeCG = {
  PINK: "PINK",
  GREEN: "GREEN",
  YELLOW: "YELLOW",
  RED: "RED",
  WHITE: "WHITE",
  BLUE: "BLUE",
};

export const betCodeCGTypes = [
  BetCodeCG.PINK,
  BetCodeCG.GREEN,
  BetCodeCG.YELLOW,
  BetCodeCG.RED,
  BetCodeCG.WHITE,
  BetCodeCG.BLUE,
];

const CGBetCodeColorsInTitlecase = {
  [BetCodeCG.YELLOW]: "Yellow",
  [BetCodeCG.WHITE]: "White",
  [BetCodeCG.PINK]: "Pink",
  [BetCodeCG.BLUE]: "Blue",
  [BetCodeCG.RED]: "Red",
  [BetCodeCG.GREEN]: "Green",
} as const;

type ValueOf<T> = T[keyof T];

const convertedBetCode = (betCode: string) => {
  return CGBetCodeColorsInTitlecase[betCode] as ValueOf<
    typeof CGBetCodeColorsInTitlecase
  >;
};

const getIsChangingShoe = (roundState: string) => {
  return [RoundState.NEW_SHOE, RoundState.SHUFFLE].includes(roundState);
};

const handleImageUrl = (url: string) => {
  if (!url) return url;
  if (url.startsWith("http") || url.startsWith("https")) return url;
  return `https://${url}`;
};

const useGame = (gameCode: string) =>
  useStore(weClientInstance.gameStore, (s) => {
    const game = s.games[gameCode];
    return game;
  });

const useConfigStore = () => useStore(weClientInstance.configStore, (s) => s);

export default ({ gameCode }: { gameCode: string }) => {
  const game = useGame(gameCode);
  const config = useConfigStore();
  const { language } = config;
  const title =
    game?.gameInfo?.gameDescr?.[language || ""] ||
    game?.gameInfo?.gameDescr?.zh ||
    "-";
  const stats = calcBAStats(game?.gameRound?.accumCards?.slice(-999) || []);

  const roundState = game?.gameRound?.roundState || "";

  const isShowResult = roundState === RoundState.RESULT;
  const isShowCardResult = [RoundState.CARD, RoundState.RESULT].includes(
    roundState
  );
  const isStart = roundState === RoundState.START;

  const roundCard = game?.gameRound?.roundCard || "0,0,0,0,0,0";
  const accumCards = game?.gameRound?.accumCards || [];
  const gameState = game?.gameRound?.gameState;

  const coverImageUrl = handleImageUrl(
    game?.gameInfo?.gameMeta?.dealerImage || ""
  );

  let gameStateFlag = "";
  if (roundState === RoundState.SHUFFLE || roundState === RoundState.NEW_SHOE) {
    gameStateFlag = "new_shoe";
  } else if (roundState === RoundState.RESULT) {
    gameStateFlag = "settling";
  } else if (roundState === RoundState.STOP || roundState === RoundState.CARD) {
    gameStateFlag = "card_dealing";
  } else if (roundState === RoundState.START) {
    gameStateFlag = "betting";
  }
  const isMaintenance = gameState === "maintenance" || gameState === "disable";

  const gameType = game?.gameInfo?.gameType;

  const cgStatsPercentage = useMemo(() => {
    if (["CG", "CGM"].indexOf(gameType || "") === -1) return [];
    const sliced = accumCards.slice(-999);
    const stats = calcCGStats(sliced);
    return toPercentages(
      betCodeCGTypes.map((betCode) => {
        const betCount =
          stats[`cnt${convertedBetCode(betCode)}` as keyof CGStats] ?? 0;
        return betCount;
      })
    );
  }, [gameType, accumCards]);

  return {
    game,
    gameType,
    title,
    stats,
    gameState,
    roundState,
    roundCard,
    accumCards,
    isChangingShoe: getIsChangingShoe(roundState),
    isShowCardResult,
    isShowResult,
    isStart,
    isMaintenance,
    coverImageUrl,
    gameStateFlag,
    cgStatsPercentage,
  };
};
