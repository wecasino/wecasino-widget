import configStore, { FooterConfig } from "./stores/configStore";
import gameStore from "./stores/gameStore";

class WeClient {
  private _fetcher: number;

  constructor() {}

  public initClient() {
    this.fetchData = this.fetchData.bind(this);
    this.startPollData = this.startPollData.bind(this);
    this.startPollData();
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

  public fetchData() {
    const gameCodes = gameStore.getState().gameCodes;
    const url = configStore.getState().baseUrl;
    console.info(`fetch data [${url}]`, gameCodes);
    // TODO: implement fetch data logi
    // 1. do fetch
    // 2. update game with new Data
    gameStore.getState().updateGames([]);
  }

  public startPollData() {
    clearTimeout(this._fetcher);
    setTimeout(() => {
      this.fetchData();
      this.startPollData();
    }, 5000);
  }
}

export default WeClient;
