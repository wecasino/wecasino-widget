import { useCallback } from "react";
import numeral from "numeral";

type CurrencyDisplayOption = {
  isSigned?: boolean;
  format?: string;
  hasDecimal?: boolean;
  convertFn?: (n: number) => number;
};

export const toCurrency = (
  number: number | string | undefined,
  option: CurrencyDisplayOption = {}
) => {
  if (number === undefined) {
    return "-";
  }

  const isNagative = Number(number) < 0;
  const value = number;
  let v = Math.abs(Number(value));

  // format
  const formatStr = option?.hasDecimal ? "0,0.00" : "0,0.[00]";
  let ret = numeral(v).format(option?.format || formatStr, Math.floor);
  let signedStr = "";
  if (option?.isSigned) {
    signedStr = isNagative ? "-" : "+";
  } else if (isNagative) {
    ret = "-" + ret;
  }

  return `${signedStr}${ret}`;
};

type PossibleRef<T> = React.Ref<T> | undefined;

function setRef<T>(ref: PossibleRef<T>, value: T) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref !== null && ref !== undefined) {
    (ref as React.MutableRefObject<T>).current = value;
  }
}

function composeRefs<T>(...refs: PossibleRef<T>[]) {
  return (node: T) => refs.forEach((ref) => setRef(ref, node));
}

export function useComposedRefs<T>(...refs: PossibleRef<T>[]) {
  return useCallback(composeRefs(...refs), refs);
}

export function interpolate(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x: number
) {
  const ratio = (y2 - y1) / (x2 - x1);
  return y1 + ratio * (x - x1);
}
