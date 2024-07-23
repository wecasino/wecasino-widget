import configStore, { FooterConfig } from "./stores/configStore";
import gameStore from "./stores/gameStore";
import { GameInfoResult, GameRoundResult } from "./types";

class WeClient {
  private _onClose: (e: CloseEvent) => void;
  private _onError: (e: Event) => void;

  constructor() {
    this.initClient();
  }

  public initClient() {
    this.connectWS = this.connectWS.bind(this);
    this.updateGameData = this.updateGameData.bind(this);
    this.handleWSClose = this.handleWSClose.bind(this);
    this.handleWSError = this.handleWSError.bind(this);
  }

  public set onClose(cb: (e: CloseEvent) => void) {
    this._onClose = cb;
  }

  public set onError(cb: (e: Event) => void) {
    this._onError = cb;
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

  public setBaseUrl(url: string) {
    configStore.getState().setBaseUrl(url);
  }

  public updateGameData(dataString: string) {
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

  private handleWSError(e: Event) {
    this._onError?.(e);
  }

  private handleWSClose(e: CloseEvent) {
    this._onClose?.(e);
  }

  public connectWS({ token }: { token: string }) {
    const baseUrl = configStore.getState().baseUrl;
    const url = `${baseUrl}?token=${token}`;
    const socket = new WebSocket(url);
    // socket.onopen = () => console.info("on socket open");
    socket.onmessage = (e) => {
      if (e.data) this.updateGameData(e.data);
    };
    socket.onerror = (e) => {
      this.handleWSError(e);
    };
    socket.onclose = (e) => {
      this.handleWSClose(e);
    };
  }
}

export default WeClient;
