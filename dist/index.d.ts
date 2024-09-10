import * as lit from 'lit';
import { LitElement, PropertyValueMap } from 'lit';

type FooterConfig = {
    textColor?: string;
    backgroundColor?: string;
};

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
declare class WeClient {
    private _cfg;
    private _ws?;
    private _rcIntv?;
    constructor(cfg: WeClientConfig);
    listenGameUpdates(gameCodes: string): void;
    updateFooterConifg(config: FooterConfig): void;
    setLanguage(lang: string): void;
    connect(): void;
    close(): void;
    private _close;
    private _connect;
    private _handleData;
}

declare class WeSpacer extends LitElement {
    flex: number;
    width: string;
    height: string;
    getSizeStyles(): string;
    render(): lit.TemplateResult<1>;
}

declare class WeGamePreview extends LitElement {
    gameCode: string;
    footerPadding: string;
    footerColor: string;
    footerBackground: string;
    width: string;
    withFooter: string;
    title: string;
    private ctrl;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    getRoadmapContent({ accumCards }: {
        accumCards: string[];
    }): string;
    renderFooter(): lit.TemplateResult<1>;
    render(): lit.TemplateResult<1>;
    static styles: lit.CSSResult;
}

declare global {
    interface HTMLElementTagNameMap {
        "we-spacer": WeSpacer;
        "we-game-preview": WeGamePreview;
    }
}

export { WeClient, WeGamePreview, WeSpacer };
