import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("we-spacer")
export class WeSpacer extends LitElement {
  @property({ type: Number })
  flex = 0;

  @property()
  width = "";

  @property()
  height = "";

  getSizeStyles() {
    if (this.flex && this.flex > 0) {
      return `flex:1;`;
    } else if (this.width) {
      return `width:${this.width};height:auto;min-height:auto`;
    } else {
      return `height:${this.height};width:auto;min-width:auto`;
    }
  }

  render() {
    const style = this.getSizeStyles();
    return html`<div style="${style}"></div>`;
  }
}
