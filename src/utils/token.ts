import { sha3_256 } from "js-sha3";

export function genWidgetToken(operCode: string, appKey: string): string {
  const tss = `${Date.now().valueOf()}`;
  const sign = sha3_256.hex(`${appKey}_${tss}`);
  const token = `wgs.${operCode}.${tss}_${sign}`;
  return token;
}
