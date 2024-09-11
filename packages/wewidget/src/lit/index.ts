import { WeGameWidget } from "./widget";

export { WeGameWidget };

declare global {
  interface HTMLElementTagNameMap {
    "we-game-widget": WeGameWidget;
  }
}
