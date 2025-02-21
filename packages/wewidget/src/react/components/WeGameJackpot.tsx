import React, {
  Ref,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  JSX,
} from "react";
import SlotCounter, {
  SlotCounterRef,
  StartAnimationOptions,
} from "react-slot-counter";
import numeral from "numeral";
import useWeGameWidget, { RoundState } from "../hooks/useWeGameWidget";
import { useComposedRefs, interpolate, toCurrency } from "../utils";

export const numberSlotClassName = "animated-counter-text-transition-elastic";

type Value = string | number | string[] | JSX.Element[];
type Direction = "bottom-up" | "top-down";

export interface IAnimatedCounterTextProps extends StartAnimationOptions {
  className?: string;
  counterRef?: Ref<SlotCounterRef>;
  mode?: "fast" | "slow";
  value: Value;
  startValue?: Value;
  duration?: number;
  speed?: number;
  delay?: number;
  direction?: Direction;
  redraw?: number;
}

/** turn any number into 0 string */
const getStartValue = (value: Value): Value => {
  return String(value)
    .split("")
    .map((n) => (!isNaN(Number(n)) ? "0" : n))
    .join("");
};

// how to calculate duration:
// effect: all digits start rolling, then stop each digit
// ease-in-out duration: 7 digits need 1.3s, 9 digits need 1.8s
// ease-in-out-back duration: 7 digits need 1.7s, 9 digits need 2.5s
// delay: 0.2s

const getReasonableDuration = (value: Value): number => {
  const length = String(value).length;
  return interpolate(7, 1.7, 9, 2.5, length);
};

const AnimatedCounterText = (props: IAnimatedCounterTextProps) => {
  const {
    counterRef,
    className,
    mode = "fast",
    duration,
    delay,
    direction = "top-down",
    redraw,
  } = props;

  const isMounted = useRef(false);
  const slotRef = useRef<SlotCounterRef>(null);
  const composedRef = useComposedRefs(slotRef, counterRef);

  // animation durations
  const reasonableDuration = getReasonableDuration(props.value);
  const _duration =
    duration ?? mode === "fast" ? reasonableDuration : reasonableDuration + 2;
  const _delay = delay ?? mode === "fast" ? 0.1 : 0.25;
  const blurTransitionDuration = mode === "fast" ? 0.5 : 2;

  // default start with all 0 once, then previous value
  const startValue = isMounted.current
    ? undefined
    : props.startValue ?? getStartValue(props.value);

  // add blur when transition start
  useLayoutEffect(() => {
    const events = [] as ((event: TransitionEvent) => void)[];
    const timeouts = [] as NodeJS.Timeout[];

    const transitionStart =
      (el: HTMLSpanElement) => (event: TransitionEvent) => {
        if (event.propertyName !== "transform") return;
        el.style.transition =
          el.style.transition += `, filter ${blurTransitionDuration}s ease-in-out`;
        el.style.filter = "blur(3px)";
        const timer = setTimeout(() => {
          el.style.filter = "blur(0px)";
        }, _duration * 1000 - blurTransitionDuration * 1000);
        timeouts.push(timer);
      };

    const els = document.getElementsByClassName(numberSlotClassName);
    for (let i = 0; i < els.length; i++) {
      const el = els[i] as HTMLSpanElement;
      if (el) {
        const event = transitionStart(el);
        events.push(event);
        el.addEventListener("transitionstart", event);
      }
    }

    return () => {
      for (let i = 0; i < els.length; i++) {
        const el = els[i] as HTMLSpanElement;
        const event = events[i];
        if (el) {
          el.style.filter = "none";
          el.style.transition = "none";
          if (event) {
            el.removeEventListener("transitionstart", event);
          }
        }
      }
      for (let i = 0; i < timeouts.length; i++) {
        clearTimeout(timeouts[i]);
      }
    };
  }, [redraw, _duration, _delay, blurTransitionDuration]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  /** redraw trigger from parent */
  useEffect(() => {
    slotRef.current?.startAnimation();
  }, [redraw]);

  return (
    <SlotCounter
      ref={composedRef}
      containerClassName={className}
      startValueOnce={true}
      useMonospaceWidth={true}
      autoAnimationStart={false}
      animateUnchanged={true}
      dummyCharacterCount={8}
      {...props}
      startValue={startValue}
      duration={_duration}
      delay={_delay}
      direction={direction}
      numberSlotClassName={numberSlotClassName}
    />
  );
};

type JackpotConfig = {
  bgColor: string;
};

const jackpotConfig: { [key: string]: JackpotConfig } = {
  grand: {
    bgColor:
      "linear-gradient(90deg, rgba(0, 0, 0, 0) 30%, rgba(222, 168, 105, 0.6) 100%)",
  },
  major: {
    bgColor:
      "linear-gradient(90deg, rgba(0, 0, 0, 0) 30%, rgba(240, 68, 56, 0.6) 100%)",
  },
  minor: {
    bgColor:
      "linear-gradient(90deg, rgba(0, 0, 0, 0) 30%, rgba(83, 177, 253, 0.6) 100%)",
  },
  mini: {
    bgColor:
      "linear-gradient(90deg, rgba(0, 0, 0, 0) 30%, rgba(102, 198, 28, 0.6) 100%)",
  },
} as const;

const WeGameJackpot = ({
  gameCode,
  mode = "slow",
}: {
  gameCode: string;
  mode?: "fast" | "slow";
}) => {
  const { game, roundState } = useWeGameWidget({ gameCode });
  const [redraw, setRedraw] = useState(0);
  const jpGrandAmt = toCurrency(game?.jackpotInfo?.jpGrandAmt || 0, {
    hasDecimal: true,
  });
  const jpMajorAmt = toCurrency(game?.jackpotInfo?.jpMajorAmt || 0, {
    hasDecimal: true,
  });
  const jpMinorAmt = toCurrency(game?.jackpotInfo?.jpMinorAmt || 0, {
    hasDecimal: true,
  });
  const jpMiniAmt = toCurrency(game?.jackpotInfo?.jpMiniAmt || 0, {
    hasDecimal: true,
  });
  useEffect(() => {
    if (roundState === RoundState.RESULT) {
      setRedraw(Date.now());
    }
  }, [roundState]);

  if (!game) return "-";

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    borderRadius: " 0.25rem",
    background: "linear-gradient(rgb(42, 47, 66) 0%, rgb(21, 24, 34) 100%)",
  } as React.CSSProperties;
  const textStyles = {
    paddingLeft: "0.25rem",
    paddingRight: "0.25rem",
    color: "white",
  } as React.CSSProperties;
  const commonStyles = {
    flex: "1 1 0%",
    borderRadius: " 0.25rem",
    paddingTop: "0.21875rem",
    paddingBottom: "0.21875rem",
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
    textAlign: "right",
    fontSize: "0.9375rem",
    fontWeight: 700,
    lineHeight: "1.375rem",
    color: "white",
  } as React.CSSProperties;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
      <div style={containerStyle}>
        <div style={textStyles}>GRAND</div>
        <div
          style={{ ...commonStyles, background: jackpotConfig.grand.bgColor }}
        >
          <AnimatedCounterText mode={mode} redraw={redraw} value={jpGrandAmt} />
        </div>
      </div>
      <div style={containerStyle}>
        <div style={textStyles}>MAJOR</div>
        <div
          style={{ ...commonStyles, background: jackpotConfig.major.bgColor }}
        >
          <AnimatedCounterText mode={mode} redraw={redraw} value={jpMajorAmt} />
        </div>
      </div>
      <div style={containerStyle}>
        <div style={textStyles}>MINOR</div>
        <div
          style={{ ...commonStyles, background: jackpotConfig.minor.bgColor }}
        >
          <AnimatedCounterText mode={mode} redraw={redraw} value={jpMinorAmt} />
        </div>
      </div>
      <div style={containerStyle}>
        <div style={textStyles}>MINI</div>
        <div
          style={{ ...commonStyles, background: jackpotConfig.mini.bgColor }}
        >
          <AnimatedCounterText mode={mode} redraw={redraw} value={jpMiniAmt} />
        </div>
      </div>
    </div>
  );
};

export default WeGameJackpot;
