import { useStore } from "zustand";
import { calcBAStats } from "@wecasino/weroadmap";
import { weClientInstance } from "../../core";

const RoundState = {
  SHUFFLE: "shuffle",
  NEW_SHOE: "newshoe",
  START: "start",
  STOP: "stop",
  CARD: "card",
  RESULT: "result",
  CANCEL: "cancel",
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

  return {
    game,
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
  };
};
