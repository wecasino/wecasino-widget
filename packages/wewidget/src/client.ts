import configStore, { FooterConfig } from "./stores/configStore";
import gameStore from "./stores/gameStore";
import { GameInfoResult, GameRoundResult } from "./types";
import { genWidgetToken } from "./utils/token";

type WeClientConfig = {
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

export const sndUrl = "wss://uat-weg-gdsapi.wehosts247.com/widgetws";
export const prdUrl = "wss://nc-gdsapi.worldonlinegame.com/widgetws";

class WeClient {
  private _cfg: WeClientConfig;
  private _ws?: WebSocket;
  private _rcIntv?: any;

  constructor(cfg: WeClientConfig) {
    this._cfg = cfg;
  }

  public listenGameUpdates(gameCodes: string) {
    console.info("listenGameUpdates", gameCodes);
  }

  public updateFooterConifg(config: FooterConfig) {
    configStore.getState().updateFooterConfig(config);
  }

  public setLanguage(lang: string) {
    configStore.getState().setLanguage(lang);
  }

  public connect() {
    this._connect();
  }

  public close() {
    this._close;
  }

  // private methods

  private _close() {
    this._ws?.close();
    this._ws = undefined;
    this._rcIntv && clearInterval(this._rcIntv);
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
      this._rcIntv && clearInterval(this._rcIntv);
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
        self._rcIntv = setInterval(() => {
          self._close();
          self._connect();
        }, self._cfg.reconnectDelay);
      }
    };
  }

  private _handleData(dataString: string) {
    const data = JSON.parse(dataString);
    if (data.gameInfos) {
      const gameInfos = data.gameInfos as GameInfoResult[];
      gameStore.getState().updateGameInfos(gameInfos);
    }
    if (data.gameRounds) {
      const gameRounds = data.gameRounds as GameRoundResult[];
      gameStore.getState().updateGameRounds(gameRounds);
    }
  }
}

export default WeClient;