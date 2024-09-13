import { weClientInstance, locales } from "../../core";
import { useStore } from "zustand";

const useConfigStore = () => useStore(weClientInstance.configStore, (s) => s);

export default () => {
  const { language } = useConfigStore();

  const t = (key: string) => {
    const lang = language || "";
    const value = locales[lang]?.[key] || key;
    return value;
  };

  return { t, language };
};
