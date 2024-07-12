import { WeSpacer } from "./Spacer";
import { WeGamePreview } from "./WeGamePreview";

export default {
  WeSpacer,
  WeGamePreview,
};

declare global {
  interface HTMLElementTagNameMap {
    "we-spacer": WeSpacer;
    "we-game-preview": WeGamePreview;
  }
}
