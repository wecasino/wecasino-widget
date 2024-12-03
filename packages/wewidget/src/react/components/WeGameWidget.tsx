import { useEffect, useRef, useState, useCallback } from "react";
import { type Lang } from "@wecasino/weroadmap";
import useWeGameWidget from "../hooks/useWeGameWidget";
import useLocales from "../hooks/useLocales";
import {
  drawBead,
  drawBigFull,
  drawCG,
  drawCGV2,
  MaintenanceIcon,
} from "../../core";

const CoverImage = ({ imgUrl }: { imgUrl: string }) => (
  <div
    style={{
      position: "absolute",
      overflow: "hidden",
      inset: 0,
      borderRadius: "inherit",
    }}
  >
    <div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        position: "absolute",
        inset: 0,
        backgroundPosition: "top center",
        transform: "scale(1.2)",
        transformOrigin: "center top",
        borderRadius: "inherit",
      }}
    ></div>
  </div>
);

const Roadmap = ({ content }: { content: string }) => (
  <div style={{ width: "100%", height: "100%" }}>
    <img
      style={{ width: "100%", height: "100%" }}
      alt="roadmap"
      src={`data:image/svg+xml;utf8,${encodeURIComponent(content)}`}
      loading="lazy"
    />
  </div>
);

const GameStatusFlag = ({ status }: { status: string }) => {
  const { t } = useLocales();

  const isShow =
    ["sitting", "new_shoe", "settling", "card_dealing"].indexOf(status) > -1;
  if (!isShow) return null;
  return (
    <div
      style={{
        position: "absolute",
        bottom: "0.25rem",
        left: "50%",
        width: "max-content",
        minWidth: "5.125rem",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        background: "rgba(14, 18, 30, 0.6)",
        transform: "translate(-50%, 0px)",
        borderRadius: "0.75rem",
        padding: "0.5rem 1rem",
        textAlign: "center",
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
        color: "white",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        boxShadow: "rgba(0, 0, 0, 0.25) 0px 4px 4px",
      }}
    >
      {t(`status.${status}`)}
    </div>
  );
};

const MaintenanceFlag = () => {
  const { t } = useLocales();
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 11,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          style={{ width: "1.25rem", height: "1.25rem" }}
          src={`data:image/svg+xml;utf8,${encodeURIComponent(MaintenanceIcon)}`}
        ></img>
        <div
          style={{
            fontSize: "0.75rem",
            lineHeight: "1rem",
            color: "#bb7eff",
            marginTop: "0.375rem",
          }}
        >
          {t("common.state.maintenance")}
        </div>
      </div>
    </div>
  );
};

const MaintenanceCover = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      borderRadius: "0.25rem",
      backgroundColor: "rgba(14, 18, 30, 0.6)",
      zIndex: 10,
    }}
  />
);

const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

const checkLang = (lang: string) => {
  if (["en", "zh", "cn"].includes(lang)) return lang;
  return "en";
};

const WeGameWidget = ({
  gameCode,
  backgroundColor,
  borderRadius,
  width,
  title: propTitle,
  titleColor = "white",
  roadmapMode = "light",
  roadmapBackgroundColor,
  roadmapVersion = "V1",
}: {
  gameCode: string;
  title?: string;
  titleColor?: string;
  width?: string;
  backgroundColor?: string;
  borderRadius?: string;
  roadmapMode?: "dark" | "light";
  roadmapBackgroundColor?: string;
  roadmapVersion?: string;
}) => {
  const {
    gameType,
    title,
    coverImageUrl,
    gameStateFlag,
    accumCards,
    isMaintenance,
  } = useWeGameWidget({
    gameCode,
  });
  const { language } = useLocales();
  const roadmapContainerRef = useRef<HTMLDivElement | null>(null);
  // default value 321 for default width
  const [containerWidth, setContainerWidth] = useState(321);

  const calcRoadmapContainerWidth = useCallback(
    debounce(() => {
      if (roadmapContainerRef.current) {
        const clientWidth = roadmapContainerRef.current.clientWidth;
        // 8 for padding
        setContainerWidth(clientWidth - 8);
      }
    }, 200),
    []
  );

  useEffect(() => {
    calcRoadmapContainerWidth();
  }, [roadmapContainerRef.current, width]);

  useEffect(() => {
    window.addEventListener("resize", calcRoadmapContainerWidth);
    return () =>
      window.removeEventListener("resize", calcRoadmapContainerWidth);
  }, []);

  const getBeadRoadmapContent = ({ accumCards }: { accumCards: string[] }) => {
    const drawFn = drawBead;
    const w = containerWidth * 0.53;
    const r = w / 166;
    const cols = Math.floor(r * 6);
    const svgContent = drawFn({
      cols,
      gameType: "BA",
      data: accumCards,
      mode: "standard",
      backgroundMode: roadmapMode === "dark" ? "dark" : "light",
      plotOption: {
        lang: checkLang(language || "") as Lang,
      },
      // askRoadWinner,
      // plotOption: {
      //   gameType,
      //   lang,
      // },
    });
    return svgContent;
  };

  const getBigFullRoadmapContent = ({
    accumCards,
  }: {
    accumCards: string[];
  }) => {
    const drawFn = drawBigFull;
    const w = containerWidth * 0.47;
    const r = w / 166;
    const cols = Math.ceil(r * 12);
    const svgContent = drawFn({
      cols,
      gameType: "BA",
      data: accumCards,
      mode: "standard",
      backgroundMode: roadmapMode === "dark" ? "dark" : "light",
      // askRoadWinner,
      // plotOption: {
      //   gameType,
      //   lang,
      // },
    });
    return svgContent;
  };

  const getCGRoadmapContent = ({ accumCards }: { accumCards: string[] }) => {
    const h = 166;
    const cols = Math.ceil(containerWidth / (h / 3));
    const drawFn = roadmapVersion === "V2" ? drawCGV2 : drawCG;
    const svgContent = drawFn({
      cols,
      rows: 1,
      data: accumCards,
      isAnimated: true,
      backgroundMode: roadmapMode === "dark" ? "dark" : "light",
    });
    return svgContent;
  };
  const roamdapBg =
    roadmapBackgroundColor ||
    (roadmapMode === "dark" ? "transparent" : "white");

  const isCG = gameType === "CG" || gameType === "CGM";
  return (
    <div
      style={{
        position: "relative",
        width: width || "30rem",
        boxSizing: "border-box",
        height: "auto",
        background: backgroundColor || "#0e1328",
        borderRadius: borderRadius || "0.25rem",
        display: "flex",
        flexDirection: "column",
        padding: "0.5rem",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "1.5rem",
          lineHeight: "1.375rem",
          fontSize: "1rem",
          display: "flex",
          alignItems: "center",
          color: titleColor || "white",
          paddingLeft: "0.25rem",
          marginBottom: "0.375rem",
        }}
      >
        {propTitle || `${title}`}
      </div>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "auto",
          display: "flex",
        }}
      >
        <div
          style={{
            width: "8.75rem",
            height: "10.375rem",
            position: "relative",
            flexShrink: 0,
            borderRadius: "0.5rem",
          }}
        >
          <CoverImage imgUrl={coverImageUrl} />
          <GameStatusFlag status={gameStateFlag} />
        </div>
        <div style={{ width: "0.675rem" }} />
        {!isMaintenance && (
          <div
            ref={roadmapContainerRef}
            style={{
              position: "relative",
              width: "100%",
              height: "10.375rem",
              flex: 1,
              display: "flex",
              alignItems: "center",
              padding: "0 0.25rem",
              background: roamdapBg,
            }}
          >
            {!isCG && (
              <>
                <div style={{ width: "53%", height: "100%" }}>
                  <Roadmap content={getBeadRoadmapContent({ accumCards })} />
                </div>
                <div style={{ flex: 1, height: "100%" }}>
                  <Roadmap content={getBigFullRoadmapContent({ accumCards })} />
                </div>
              </>
            )}
            {isCG && (
              <div style={{ flex: 1, height: "100%" }}>
                <Roadmap content={getCGRoadmapContent({ accumCards })} />
              </div>
            )}
          </div>
        )}
        {isMaintenance && <MaintenanceFlag />}
      </div>
      {isMaintenance && <MaintenanceCover />}
    </div>
  );
};

export default WeGameWidget;
