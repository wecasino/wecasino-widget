import { useStore } from "zustand";

import {
  createBAEntry,
  analyzeBigRoad,
  calcGreatRoad,
} from "@wecasino/weroadmap";
import { weClientInstance, allGreatRoads } from "../../core";

import { useMemo } from "react";

const greatRoadGameTypes = [
  "BAA",
  "BAC",
  "BAS",
  "BAM",
  "BAL",
  "BACB",
  "BAAB",
  "BASB",
  "BAMB",
];

const useAvailableGameCodesForGR = () =>
  useStore(weClientInstance.gameStore, (s) => {
    console.info("games", s.games);

    return Object.keys(s.games).filter((gc) => {
      const { gameType = "", gameState = "" } = s.games[gc]?.gameInfo || {};
      return greatRoadGameTypes.includes(gameType) && gameState === "active";
    });
  });

const useGames = () => useStore(weClientInstance.gameStore, (s) => s.games);

export default () => {
  const games = useGames();
  const availableGameCodes = useAvailableGameCodesForGR();

  const greatRoadGCs = useMemo(() => {
    const gcs = availableGameCodes.filter((gc) => {
      const getIsGreatRoad = (cards: string[]) => {
        const data = cards.map((d) => createBAEntry(d));
        const [colsRt1] = analyzeBigRoad(data);
        return !!calcGreatRoad(allGreatRoads, colsRt1);
      };
      const game = games?.[gc] || {};
      const cards = game?.gameRound?.accumCards || [];
      const isGreat = getIsGreatRoad(cards);
      return isGreat;
    });
    return gcs;
  }, [availableGameCodes, games]);

  console.info("gcs", { greatRoadGCs, availableGameCodes });
  return greatRoadGCs;
};
