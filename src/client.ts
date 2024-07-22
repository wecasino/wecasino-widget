import configStore, { FooterConfig } from "./stores/configStore";
import gameStore from "./stores/gameStore";
import { GameInfoResult, GameRoundResult } from "./types";

class WeClient {
  constructor() {
    this.initClient();
  }

  public initClient() {
    this.connectWS = this.connectWS.bind(this);
    this.updateGameData = this.updateGameData.bind(this);
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

  public connectWS({ token }: { token: string }) {
    const baseUrl = configStore.getState().baseUrl;
    const url = `${baseUrl}?token=${token}`;
    const socket = new WebSocket(url);
    socket.onopen = () => console.info("on socket open");
    socket.onmessage = (e) => {
      if (e.data) this.updateGameData(e.data);
    };
    socket.onerror = (e) => console.info("on socket error", e);
    socket.onclose = (e) => console.info("on socket close", { e });
  }
}

export default WeClient;
