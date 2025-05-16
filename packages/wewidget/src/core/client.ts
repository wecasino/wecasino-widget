"use client";

import createConfigStore, { FooterConfig } from "./configStore";
import createGameStore from "./gameStore";
import {
  ActivityUpdateEntry,
  GameInfoResult,
  GameRoundResult,
  JackpotInfoResult,
  JackpotTriggerResult,
} from "./types";
import { genWidgetToken } from "./token";

export type WeClientConfig = {
  appKey: string;
  operCode: string;
  token?: string;
  dataUrl?: string;
  sandbox?: boolean;
  reconnectDelay?: number;
  onOpen?: () => void;
  onClose?: (e: CloseEvent) => void;
  onError?: (e: Event) => void;
};

const sndUrl = "wss://uat-weg-wgsapi.wehosts247.com/widgetws";
const prdUrl = "wss://nc-game.wes05.com/widgetws";

class WeClient {
  private _cfg: WeClientConfig = { appKey: "", operCode: "" };
  private _ws?: WebSocket;
  private _rcIntv?: any;

  private _configStore = createConfigStore();
  private _gameStore = createGameStore();

  public get configStore() {
    return this._configStore;
  }

  public get gameStore() {
    return this._gameStore;
  }

  public listenGameUpdates(gameCodes: string) {
    console.info("listenGameUpdates", gameCodes);
  }

  public updateFooterConifg(config: FooterConfig) {
    this._configStore.getState().updateFooterConfig(config);
  }

  public setLanguage(lang: string) {
    this._configStore.getState().setLanguage(lang);
  }

  public connect(cfg: WeClientConfig) {
    this._cfg = cfg;
    this._connect();
  }

  public close() {
    this._close();
  }

  // private methods

  private _close() {
    this._ws?.close();
    this._ws = undefined;
    this._rcIntv && clearTimeout(this._rcIntv);
    this._rcIntv = undefined;
  }

  private _connect() {
    if (this._ws) {
      return;
    }
    const token =
      this._cfg.token || genWidgetToken(this._cfg.operCode, this._cfg.appKey);
    const dataUrl = this._cfg.dataUrl || (this._cfg.sandbox ? sndUrl : prdUrl);
    const ws = new WebSocket(`${dataUrl}?token=${token}`);
    this._ws = ws;

    const self = this;

    ws.onopen = () => {
      self._cfg.onOpen?.();
      this._rcIntv && clearTimeout(this._rcIntv);
      this._rcIntv = undefined;
    };
    ws.onmessage = (e) => {
      if (e.data) self._handleData(e.data);
    };
    ws.onerror = (e) => {
      self._cfg.onError?.(e);
    };
    ws.onclose = (e) => {
      self._cfg.onClose?.(e);
      if (self._cfg.reconnectDelay) {
        self._rcIntv = setTimeout(() => {
          self._close();
          self._connect();
        }, self._cfg.reconnectDelay);
      }
    };
  }

  private _handleData(dataString: string) {
    try {
      const data = JSON.parse(dataString);
      if (data.gameInfos) {
        const gameInfos = data.gameInfos as GameInfoResult[];
        this._gameStore.getState().updateGameInfos(gameInfos);
      }
      if (data.gameRounds) {
        const gameRounds = data.gameRounds as GameRoundResult[];
        this._gameStore.getState().updateGameRounds(gameRounds);
      }
      if (data.gamePlayerCnt) {
        const playerCnt = data.gamePlayerCnt as { [key: string]: number };
        this._gameStore.getState().updatePlayerCnt(playerCnt);
      }
      if (data.gameViewCnt) {
        const viewCnt = data.gameViewCnt as { [key: string]: number };
        this._gameStore.getState().updateViewCnt(viewCnt);
      }
      if (data.jackpots) {
        const jpInfo = data.jackpots as JackpotInfoResult[];
        this._gameStore.getState().updateJackpotInfo(jpInfo);
      }
      if (data.jackpotTrigger) {
        const jpTrigger = data.jackpotTrigger as JackpotTriggerResult;
        this._gameStore.getState().updateJackpotTrigger(jpTrigger);
      }
      if (data.activityUpdate) {
        const actUpdate = data.activityUpdate as ActivityUpdateEntry;
        this._gameStore.getState().updateActivityUpdate(actUpdate);
      }
    } catch (e) {}
  }
}

const weClientInstance = new WeClient();

// expose client instance to the window object
// @ts-ignore
window.weClientInstance = weClientInstance;

export { WeClient, weClientInstance };
