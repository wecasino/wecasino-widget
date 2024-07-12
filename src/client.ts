import configStore, { FooterConfig } from "./stores/configStore";

class WeClient {
  constructor() {
    this.initClient();
  }

  public initClient() {}

  public listenGameUpdates(gameCodes: string) {
    console.info("listenGameUpdates", gameCodes);
  }

  public updateFooterConifg(config: FooterConfig) {
    configStore.getState().updateFooterConfig(config);
  }

  public setLanguage(lang: string) {
    configStore.getState().setLanguage(lang);
  }
}

export default WeClient;
