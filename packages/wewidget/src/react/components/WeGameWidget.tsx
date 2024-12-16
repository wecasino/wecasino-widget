import { useEffect, useRef, useState, useCallback } from "react";
import { type Lang } from "@wecasino/weroadmap";
import useWeGameWidget, {
  BetCodeCG,
  betCodeCGTypes,
} from "../hooks/useWeGameWidget";
import useLocales from "../hooks/useLocales";
import {
  drawBead,
  drawBigFull,
  drawCG,
  drawCGV2,
  MaintenanceIcon,
  PlayerCountIcon,
  ViewCountIcon,
} from "../../core";

const betCodeCGBgColor = {
  [BetCodeCG.PINK]: "#FF6FB7",
  [BetCodeCG.GREEN]: "#42C961",
  [BetCodeCG.YELLOW]: "#FBD930",
  [BetCodeCG.RED]: "#FF3D57",
  [BetCodeCG.WHITE]: "#FFF9F2",
  [BetCodeCG.BLUE]: "#668EEB",
};

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

const countFormat = (count: number) => {
  if (`${count}`.length <= 4) {
    return count;
  } else if (`${count}`.length > 4 && `${count}`.length <= 6) {
    const countString = Math.floor(count / 1000);
    return `${countString}K+`;
  } else if (`${count}`.length > 6) {
    const countString = (count / 1000000).toFixed(2);
    return `${countString}M+`;
  }
};

const CountRow = ({
  playerCount,
  viewCount,
  style,
}: {
  playerCount: number;
  viewCount: number;
  style?: React.CSSProperties;
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        color: "white",
        fontSize: "0.75rem",
        padding: "0 0.125rem",
        ...style,
      }}
    >
      <img
        style={{ width: "0.75rem", height: "0.75rem" }}
        src={`data:image/svg+xml;utf8,${encodeURIComponent(PlayerCountIcon)}`}
      ></img>
      <div style={{ marginLeft: "0.125rem", color: "#98a2b3" }}>
        {countFormat(playerCount)}
      </div>
      <img
        style={{ width: "0.75rem", height: "0.75rem", marginLeft: "0.75rem" }}
        src={`data:image/svg+xml;utf8,${encodeURIComponent(ViewCountIcon)}`}
      ></img>
      <div style={{ marginLeft: "0.125rem", color: "#98a2b3" }}>
        {countFormat(viewCount)}
      </div>
    </div>
  );
};

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
  roadmapVersion = "V2",
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
    cgStatsPercentage,
    playerCnt,
    viewCnt,
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
  }, [roadmapContainerRef.current, width, gameType]);

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
    // 102 raw roadmap section height, 20 player view count row height
    const h = 102 - 20;
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
          ...(isCG ? { justifyContent: "space-between" } : {}),
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            ...(isCG
              ? {
                  width: "12.75rem",
                  height: "6.375rem",
                  flexShrink: 0,
                  borderRadius: "0.5rem",
                }
              : {
                  width: "8.75rem",
                  height: "9.125rem",
                  flexShrink: 0,
                  borderRadius: "0.5rem",
                }),
          }}
        >
          <div
            style={
              isCG
                ? {
                    width: "12.75rem",
                    height: "6.375rem",
                    position: "relative",
                    flexShrink: 0,
                    borderRadius: "0.5rem",
                  }
                : {
                    width: "8.75rem",
                    height: "9.125rem",
                    position: "relative",
                    flexShrink: 0,
                    borderRadius: "0.5rem",
                  }
            }
          >
            <CoverImage imgUrl={coverImageUrl} />
            <GameStatusFlag status={gameStateFlag} />
          </div>
          {!isCG && !isMaintenance && (
            <CountRow
              style={{ marginTop: "0.25rem" }}
              viewCount={viewCnt}
              playerCount={playerCnt}
            />
          )}
        </div>
        {!isCG && <div style={{ width: "0.675rem" }} />}
        {!isMaintenance && (
          <div
            ref={roadmapContainerRef}
            style={{
              position: "relative",
              width: "100%",
              height: isCG ? "6.375rem" : "10.375rem",
              flex: 1,
              display: "flex",
              alignItems: "center",
              // padding: isCG ? "0" : "0 0.25rem",
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
                <div style={{ width: "100%", height: "5.125rem" }}>
                  <Roadmap content={getCGRoadmapContent({ accumCards })} />
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "1rem",
                    marginTop: "0.25rem",
                  }}
                >
                  <CountRow viewCount={viewCnt} playerCount={playerCnt} />
                </div>
              </div>
            )}
          </div>
        )}
        {isMaintenance && <MaintenanceFlag />}
      </div>
      {isMaintenance && <MaintenanceCover />}
      {isCG && !isMaintenance && (
        <div
          style={{
            marginTop: "0.675rem",
            display: "flex",
            justifyContent: "space-between",
            gap: "0.25rem",
          }}
        >
          {betCodeCGTypes.map((cg, idx) => (
            <div
              key={cg}
              style={{
                flex: 1,
                background: betCodeCGBgColor[cg],
                color: [BetCodeCG.WHITE, BetCodeCG.YELLOW].includes(cg)
                  ? "#99633D"
                  : "#FFF9F2",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "0.25rem",
                lineHeight: "1.375rem",
                fontSize: "0.75rem",
                fontWeight: 700,
              }}
            >
              {`${cgStatsPercentage[idx]}%`}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeGameWidget;
