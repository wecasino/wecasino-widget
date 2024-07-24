import WeClient from "./client";
import * as WeComponent from "./components";

// @ts-ignore
globalThis.WeClient = WeClient;
// @ts-ignore
globalThis.WeComponent = WeComponent;

export default { WeComponent, WeClient };
