import { LitElement, html, css, PropertyValueMap } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap, StyleInfo } from "lit/directives/style-map.js";

import { MaintenanceIcon } from "./icon";
import { GamePreviewController } from "./controller";
import { locales } from "./locale";
import { drawBig } from "../core";

@customElement("we-game-widget")
export class WeGameWidget extends LitElement {
  @property()
  gameCode = "";

  @property({ attribute: "footer-padding" })
  footerPadding = "";

  @property({ attribute: "footer-color" })
  footerColor = "";

  @property({ attribute: "footer-background" })
  footerBackground = "";

  @property({ attribute: "width" })
  width = "";

  @property({ attribute: "roadmap-background" })
  roadmapBackground = "white";

  @property({ attribute: "roadmap-mode" })
  roadmapMode = "light";

  @property({ attribute: "with-footer" })
  withFooter = "true";

  @property()
  title = "";

  private ctrl: GamePreviewController;

  public connectedCallback(): void {
    super.connectedCallback();
    this.ctrl = new GamePreviewController(this);
    this.ctrl.gameCode = this.gameCode;
    this.ctrl.connectStore();
  }

  public disconnectedCallback() {
    super.disconnectedCallback();
    this.ctrl.disconnectStore();
  }

  protected updated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    if (_changedProperties.has("gameCode")) {
      const prevGameCode = _changedProperties.get("gameCode");
      if (!prevGameCode && this.gameCode) {
        this.ctrl.gameCode = this.gameCode;
      }
    }
  }

  public getRoadmapContent({ accumCards }: { accumCards: string[] }) {
    const drawFn = drawBig;
    const cols = 15;
    const svgContent = drawFn({
      cols,
      gameType: "BA",
      data: accumCards,
      mode: "standard",
      backgroundMode: this.roadmapMode === "dark" ? "dark" : "light",
      // askRoadWinner,
      // plotOption: {
      //   gameType,
      //   lang,
      //   // withOnClickEvent: type === 'BIG_FULL',
      // },
      // ...(type === 'BIG_FULL' ? { zoomedId } : {}),
    });
    return svgContent;
  }

  private tr(key: string) {
    const lang = this.ctrl.client.configStore.getState().language || "";
    const value = locales[lang]?.[key] || key;
    return value;
  }

  renderFooter() {
    const hasFooter = this.withFooter === "true";
    if (!hasFooter) return html``;
    const { title } = this.ctrl.getGameInfos();
    const config = this.ctrl.client.configStore.getState();
    const footerBackgroundColor =
      this.footerBackground || config.footer.backgroundColor || "";
    const footerTextColor = this.footerColor || config.footer.textColor || "";
    const footerStyle: StyleInfo = {};
    if (footerBackgroundColor) footerStyle.background = footerBackgroundColor;
    if (this.footerPadding) footerStyle.padding = this.footerPadding;
    const footerTextStyle: StyleInfo = {};
    if (footerTextColor) footerTextStyle.color = footerTextColor;
    const footerText = this.title || title;
    return html`<div class="footer" style=${styleMap(footerStyle)}>
      <div class="game-name-container">
        <div class="game-name" style=${styleMap(footerTextStyle)}>
          ${footerText}
        </div>
      </div>
    </div>`;
  }

  render() {
    const { accumCards, coverImageUrl, gameStateFlag, isMaintenance } =
      this.ctrl.getGameInfos();
    const svgContent = this.getRoadmapContent({ accumCards });
    const statusMsg =
      ["sitting", "new_shoe", "settling", "card_dealing"].indexOf(
        gameStateFlag
      ) > -1
        ? this.tr(`status.${gameStateFlag}`)
        : "";
    const statusFlagClasses = {
      "status-flag": true,
      hidden: !statusMsg,
    };

    const containerStyle: StyleInfo = {};
    if (this.width) containerStyle.width = this.width;

    const roadmapContainerStyle: StyleInfo = {};
    if (this.roadmapBackground)
      roadmapContainerStyle.backgroundColor = this.roadmapBackground;

    return html`
    <div class="container" style=${styleMap(containerStyle)}>
      <div class="cover">
        <div class="cover-image">
          <div
            class="bg-image"
            style="background-image: url(${coverImageUrl});"
          ></div>
        </div>
        <div class=${classMap(statusFlagClasses)}>${statusMsg}</div>
      </div>
      <div class="roadmap-container" style=${styleMap(roadmapContainerStyle)}>
        <div class="roadmap-content">
          <div class="roadmap">
            <img
              class="image" 
              alt="roadmap"
              src=${`data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`}
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <div class=${classMap({
        "maintence-container": true,
        hidden: !isMaintenance,
      })}>
        <div class="icon"><img class="image" src=${`data:image/svg+xml;utf8,${encodeURIComponent(
          MaintenanceIcon
        )}`}></img></div>
        <div class="text">${this.tr("common.state.maintenance")}</div>
      </div>
      ${this.renderFooter()}
      <div class=${classMap({
        "maintence-cover": true,
        hidden: !isMaintenance,
      })}></div>
    </div>`;
  }

  static styles = css`
    .container {
      position: relative;
      width: 9.75rem;
      height: auto;
      background: #0e1328;
      border-radius: 0.25rem;
    }

    .cover {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 55.128%;
    }

    .cover-image {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: black;
    }

    .bg-image {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: inherit;
      background-repeat: no-repeat;
      background-position: top center;
      background-size: 130% 130%;
    }

    .status-flag {
      position: absolute;
      left: 50%;
      bottom: 0.25rem;
      background: #0e121e99;
      padding: 0.375rem 1rem;
      font-size: 12px;
      line-height: 16px;
      color: white;
      border-radius: 0.375rem;
      transform: translateX(-50%);
      font-weight: 700;
    }

    we-countdown-timer {
      position: absolute;
      top: 0.5rem;
      left: 0.5rem;
      width: 1.5rem;
      height: 1.5rem;
    }

    .roadmap-container {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 42.3077%;
      display: flex;
      align-items: center;
      background: white;
    }

    .roadmap-content {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 0.1875rem;
    }

    .roadmap {
      width: 100%;
      height: 100%;
    }

    .bet-pool-bar {
      width: 100%;
      height: 0.125rem;
      display: flex;
      flex-direction: row;
      background-color: rgba(255, 255, 255, 0.1);
    }

    .bet-pool-bar-player {
      height: 100%;
      border-bottom-left-radius: 0.125rem;
      border-top-left-radius: 0.125rem;
      background-color: #1468dc;
    }

    .bet-pool-bar-banker {
      height: 100%;
      border-bottom-right-radius: 0.125rem;
      border-top-right-radius: 0.125rem;
      background-color: #d92d20;
      margin-left: 0.125rem;
    }

    .footer {
      display: flex;
      flex-direction: column;
      background: #0e1328;
      padding: 0.25rem;
    }

    .game-name-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .game-name {
      color: white;
      font-size: 0.875rem;
      line-height: 1.25rem;
    }

    .maintence-container {
      width: 100%;
      height: 4.7rem;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      z-index: 1;
    }

    .icon {
      width: 1.25rem;
      height: 1.25rem;
    }

    .image {
      width: 100%;
      height: 100%;
    }

    .text {
      margin-top: 0.375rem;
      font-size: 0.75rem;
      color: #bb7eff;
    }

    .maintence-cover {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 0.25rem;
      background-color: rgba(14, 18, 30, 0.6);
    }

    .hidden {
      display: none;
    }
  `;
}
