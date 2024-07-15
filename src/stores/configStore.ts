import { produce } from "immer";
// import { shallow } from "zustand/shallow";
import { createStore } from "zustand/vanilla";

export type FooterConfig = { textColor?: string; backgroundColor?: string };

export interface IConfigStore {
  baseUrl?: string;
  language?: string;
  footer: FooterConfig;
  setLanguage: (lang: string) => void;
  setBaseUrl: (url: string) => void;
  updateFooterConfig: (config: FooterConfig) => void;
}

const getStoreDefaultState = () => ({
  baseUrl: "",
  language: "en",
  footer: {},
});

const configStore = createStore<IConfigStore>((set) => ({
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
  setBaseUrl: (url: string) => {
    set((s) =>
      produce(s, (draft) => {
        draft.baseUrl = url;
      })
    );
  },
}));
export default configStore;
