import { weClientInstance } from "../../core";

export default () => {
  const connectClient = ({
    operCode,
    language,
    appKey,
    sandbox,
    reconnectDelay,
  }: {
    operCode: string;
    appKey: string;
    language?: string;
    sandbox: boolean;
    reconnectDelay?: number;
  }) => {
    weClientInstance.setLanguage(language || "en");
    weClientInstance.connect({
      // ask we to provide
      operCode,
      // ask we to provide
      appKey,
      sandbox,
      reconnectDelay,
      // for custom data url
      // dataUrl: "ws://localhost:16000/widgetws",
      onOpen: () => console.info("socket open"),
      onError: (e) => console.info("socket error", e),
      onClose: (e) => console.info("socket closed", e),
    });
  };

  const setLanguage = (lang: string) => {
    weClientInstance.setLanguage(lang);
  };

  const closeClient = () => {
    weClientInstance.close();
  };

  return { connectClient, setLanguage, closeClient };
};
