import { weClientInstance } from "../../core";

export default () => {
  const connectClient = ({
    operCode,
    language,
    appKey,
    sandbox,
  }: {
    operCode: string;
    appKey: string;
    language?: string;
    sandbox: boolean;
  }) => {
    weClientInstance.setLanguage(language || "en");
    weClientInstance.connect({
      // ask we to provide
      operCode,
      // ask we to provide
      appKey,
      sandbox,
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

  return { connectClient, setLanguage };
};
