import { WeSpacer } from "./Spacer";
import { WeGamePreview } from "./WeGamePreview";

export { WeSpacer, WeGamePreview };

declare global {
  interface HTMLElementTagNameMap {
    "we-game-preview": WeGamePreview;
    "we-spacer": WeSpacer;
  }
}
