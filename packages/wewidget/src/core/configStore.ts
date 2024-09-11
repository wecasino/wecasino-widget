import { produce } from "immer";
// import { shallow } from "zustand/shallow";
import { createStore } from "zustand/vanilla";

export type FooterConfig = { textColor?: string; backgroundColor?: string };

export interface IConfigStore {
  language?: string;
  footer: FooterConfig;
  setLanguage: (lang: string) => void;
  updateFooterConfig: (config: FooterConfig) => void;
}

const getStoreDefaultState = () => ({
  language: "en",
  footer: {},
});

const createConfigStore = () =>
  createStore<IConfigStore>((set) => ({
    ...getStoreDefaultState(),
    updateFooterConfig: (config: FooterConfig) => {
      set((s) =>
        produce(s, (draft) => {
          draft.footer = { ...draft.footer, ...config };
        })
      );
    },
    setLanguage: (lang: string) => {
      set((s) =>
        produce(s, (draft) => {
          draft.language = lang;
        })
      );
    },
  }));
export default createConfigStore;
