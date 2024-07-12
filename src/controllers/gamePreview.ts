import { ReactiveController, ReactiveControllerHost } from "lit";

import { calcBAStats } from "@wegdevio/roadmap-ts-lib";

import configStore from "../stores/configStore";
import { Game } from "../types";

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

export class GamePreviewController implements ReactiveController {
  host: ReactiveControllerHost;

  private _gameCode: string;
  private _unsubConfigStore: () => void;

  public set gameCode(gameCode: string) {
    this._gameCode = gameCode;
  }

  public get gameCode() {
    return this._gameCode;
  }

  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);
  }

  hostConnected() {}

  hostDisconnected() {}

  private subScribeConfigstore() {
    this.host.requestUpdate();
  }

  public connectStore() {
    this._unsubConfigStore = configStore.subscribe(
      this.subScribeConfigstore.bind(this)
    );
  }

  public disconnectStore() {
    this._unsubConfigStore?.();
  }

  public get game(): Game {
    return {};
  }
  public getGameInfos() {
    const game = this.game;
    const language = this.getConfig().language;
    const title =
      game?.gameInfo?.gameDescr?.[language || ""] ||
      game?.gameInfo?.gameDescr?.zh ||
      "-";
    const stats = calcBAStats(game?.gameRound?.accumCards.slice(-999) || []);

    const roundState = game?.gameRound?.roundState || "";

    const isShowResult = roundState === RoundState.RESULT;
    const isShowCardResult = [RoundState.CARD, RoundState.RESULT].includes(
      roundState
    );
    const isStart = roundState === RoundState.START;

    const roundCard = this.game?.gameRound?.roundCard || "0,0,0,0,0,0";
    const accumCards = this.game?.gameRound?.accumCards || [];
    const gameState = game?.gameRound?.gameState;
    const gameStream = game?.gameStream || {};

    const coverImageUrl =
      gameStream?.capDomainMain && gameStream?.capPathMain
        ? `https://${gameStream?.capDomainMain}${gameStream?.capPathMain}`
        : "";

    let gameStateFlag = "";
    if (
      roundState === RoundState.SHUFFLE ||
      roundState === RoundState.NEW_SHOE
    ) {
      gameStateFlag = "new_shoe";
    } else if (roundState === RoundState.RESULT) {
      gameStateFlag = "settling";
    } else if (
      roundState === RoundState.STOP ||
      roundState === RoundState.CARD
    ) {
      gameStateFlag = "card_dealing";
    } else if (roundState === RoundState.START) {
      gameStateFlag = "betting";
    }
    const isMaintenance =
      gameState === "maintenance" || gameState === "disable";
    return {
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
  }

  public getConfig() {
    return configStore.getState();
  }
}
