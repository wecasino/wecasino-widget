import { WeSpacer } from "./Spacer";
import { WeGamePreview } from "./WeGamePreview";

export { WeSpacer, WeGamePreview };

declare global {
  interface HTMLElementTagNameMap {
    "we-spacer": WeSpacer;
    "we-game-preview": WeGamePreview;
  }
}
