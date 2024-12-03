import {
  calcBARoadmap,
  calcDTRoadmap,
  type Checker,
  plotBeadRoad,
  plotBegin,
  plotBigRoad,
  plotEnd,
  plotGrid,
  type PlotOption,
  plotR234Road,
  calcCGRoadmap,
  plotCGBeadRoad,
  plotCGBegin,
  plotCGv2Begin,
  plotCGv2eadRoad,
} from "@wecasino/weroadmap";

type RoadmapBackgroundMode = "dark" | "light";

type RoadmapDrawFn = (props: {
  cols: number;
  data: string[];
  gameType: "BA" | "DT";
  mode?: string;
  backgroundMode?: RoadmapBackgroundMode;
  // askRoadWinner?: number;
  plotOption?: PlotOption;
  // zoomedId?: string;
}) => string;

const getPlotOptionByBackgroundMode = (
  mode: RoadmapBackgroundMode = "dark"
): PlotOption => {
  return mode === "light"
    ? {
        hasBorder: true,
        borderColor: "#BDC6D4",
        checkerPadding: 2,
        baBeadDotStrokeColor: "#FFFFFF",
      }
    : {
        hasDots: true,
        dotColor: "white",
        dotOpacity: 0.1,
        checkerPadding: 2,
        baBeadDotStrokeColor: "#000000",
      };
};

const getCGPlotOptionByBackgroundMode = (
  mode: RoadmapBackgroundMode = "dark"
): PlotOption => {
  return mode === "light"
    ? {
        hasDots: true,
        dotColor: "black",
        dotOpacity: 0.1,
        checkerPadding: 4,
      }
    : {
        hasDots: true,
        dotColor: "white",
        dotOpacity: 0.1,
        checkerPadding: 4,
      };
};

export const drawBead: RoadmapDrawFn = ({
  cols,
  data,
  gameType,
  mode,
  backgroundMode,
  // askRoadWinner,
  plotOption,
}) => {
  const rows = 6;
  const w = 50 * cols;
  const h = 50 * rows;
  const calcRoadmap = gameType === "DT" ? calcDTRoadmap : calcBARoadmap;

  const pointFn = (c: Checker) => {
    if (gameType === "DT")
      return c.data?.w === 1 ? c.data?.bv ?? 0 : c.data?.pv ?? 0;
    return c.data?.w === 1 ? c.data?.bv ?? 0 : c.data?.pv ?? 0;
  };

  const rm = calcRoadmap({ data, r0MaxCol: cols });
  const defaultPlotOption = getPlotOptionByBackgroundMode(backgroundMode);
  const beadMode = mode === "point" ? "point" : "standard";
  const beadPlotOption: PlotOption = {
    ...defaultPlotOption,
    mode: beadMode,
    pointFn,
    ...plotOption,
  };
  let rt0 = rm.rt0;
  // if (askRoadWinner && askRoadWinner > 0) {
  //   rt0 = askRoadWinner === 1 ? rm.fcb0 : rm.fcp0;
  // }
  let svg = plotBegin(w, h, w, h, false, beadPlotOption);
  svg += plotBeadRoad(rt0, cols, rows, w, h, 0, 0, 1, beadPlotOption);
  svg += plotEnd();
  return svg;
};

export const drawBigFull: RoadmapDrawFn = ({
  cols,
  data,
  gameType,
  backgroundMode,
  // askRoadWinner,
  // plotOption,
  // zoomedId,
}) => {
  const rows = 6;
  const fh = 50 * rows * 2;
  const w = 50 * cols;
  const h = 50 * rows;
  const calcRoadmap = gameType === "DT" ? calcDTRoadmap : calcBARoadmap;
  const rm = calcRoadmap({
    data,
    r1MaxCol: cols,
    r2MaxCol: cols * 2,
    r3MaxCol: cols,
    r4MaxCol: cols,
  });
  const bigFullPlotOption = {
    ...getPlotOptionByBackgroundMode(backgroundMode),
    // ...plotOption,
  };
  let rt1 = rm.rt1;
  let rt2 = rm.rt2;
  let rt3 = rm.rt3;
  let rt4 = rm.rt4;
  // if (askRoadWinner && askRoadWinner > 0) {
  //   rt1 = askRoadWinner === 1 ? rm.fcb1 : rm.fcp1;
  //   rt2 = askRoadWinner === 1 ? rm.fcb2 : rm.fcp2;
  //   rt3 = askRoadWinner === 1 ? rm.fcb3 : rm.fcp3;
  //   rt4 = askRoadWinner === 1 ? rm.fcb4 : rm.fcp4;
  // }
  let svg = plotBegin(w, fh, w, fh, false, bigFullPlotOption);
  // const isZoomed = !!zoomedId;
  const isZoomed = false;
  if (!isZoomed) {
    if (backgroundMode === "light") {
      svg += plotGrid(cols, rows * 2, w, h * 2, 0, 0, bigFullPlotOption);
    }
    const bigFullPlotOption2: PlotOption = {
      ...bigFullPlotOption,
      hasBorder: false,
    };
    svg += plotBigRoad(rt1, cols, rows, w, h, 0, 0, 1, bigFullPlotOption2);
    /* prettier-ignore */
    svg += plotR234Road(rt2, 2, cols * 2, rows, w, h / 2, 0, h, 2, bigFullPlotOption2)
    /* prettier-ignore */
    svg += plotR234Road(rt3, 3, cols, rows, w / 2, (h * 3) / 2, 0, h, 2, bigFullPlotOption2)
    /* prettier-ignore */
    svg += plotR234Road(rt4, 4, cols, rows, w / 2, (h * 3) / 2, w / 2, h, 2, bigFullPlotOption2)
  } else {
    // const bigFullPlotOption2: PlotOption = {
    //   ...bigFullPlotOption,
    //   hasBorder: false,
    //   withOnClickEvent: true,
    // };
    const zoomedCols = Math.ceil(cols / 2);
    if (backgroundMode === "light") {
      svg += plotGrid(zoomedCols, rows, w, h * 2, 0, 0, bigFullPlotOption);
    }
    // const rm2 = calcRoadmap({
    //   data,
    //   r1MaxCol: zoomedCols,
    //   r2MaxCol: zoomedCols,
    //   r3MaxCol: zoomedCols,
    //   r4MaxCol: zoomedCols,
    // });
    // if (zoomedId === "big") {
    //   svg += plotBigRoad(
    //     rm2.rt1,
    //     zoomedCols,
    //     rows,
    //     w,
    //     h * 2,
    //     0,
    //     0,
    //     1,
    //     bigFullPlotOption2
    //   );
    // } else {
    //   const x = zoomedId === "R2" ? 2 : zoomedId === "R3" ? 3 : 4;
    //   const rt =
    //     zoomedId === "R2" ? rm2.rt2 : zoomedId === "R3" ? rm2.rt3 : rm2.rt4;
    //   svg += plotR234Road(
    //     rt,
    //     x,
    //     zoomedCols,
    //     rows,
    //     w,
    //     h * 2,
    //     0,
    //     0,
    //     1,
    //     bigFullPlotOption2
    //   );
    // }
  }

  svg += plotEnd();
  return svg;
};

export const drawBig: RoadmapDrawFn = ({
  cols,
  data,
  gameType,
  backgroundMode,
  // askRoadWinner,
  // plotOption,
}) => {
  const rows = 6;
  const w = 50 * cols;
  const h = 50 * rows;
  const calcRoadmap = gameType === "DT" ? calcDTRoadmap : calcBARoadmap;
  const rm = calcRoadmap({ data, r0MaxCol: cols });
  const bigPlotOption = {
    ...getPlotOptionByBackgroundMode(backgroundMode),
    // ...plotOption,
  };
  let rt1 = rm.rt1;
  // if (askRoadWinner && askRoadWinner > 0) {
  //   rt1 = askRoadWinner === 1 ? rm.fcb1 : rm.fcp1
  // }
  let svg = plotBegin(w, h, w, h, false, bigPlotOption);
  svg += plotBigRoad(rt1, cols, rows, w, h, 0, 0, 1, bigPlotOption);
  svg += plotEnd();
  return svg;
};

export const drawCG = ({
  cols,
  rows = 1,
  data,
  rowSpacing,
  backgroundMode,
  isAnimated,
  isShowSuperGameResult = false,
  emptyEndCols = 0,
}: {
  cols: number;
  rows?: number;
  data: string[];
  emptyEndCols?: number;
  rowSpacing?: number;
  isAnimated?: boolean;
  isShowSuperGameResult?: boolean;
  backgroundMode: RoadmapBackgroundMode;
}) => {
  const size = 50;
  const rowHeight = size * (isShowSuperGameResult ? 4 : 3);
  const w = size * cols;
  const h = rowHeight * rows + (rowSpacing || 0) * (rows - 1);

  const rm = calcCGRoadmap({ data, r0MaxCol: cols });
  const plotOption = getCGPlotOptionByBackgroundMode(backgroundMode);
  const roaddata = rm.rt0;
  let svg = plotCGBegin(w, h, w, h, false, plotOption);
  svg += plotCGBeadRoad(
    roaddata,
    cols,
    rows,
    w,
    h,
    0,
    0,
    emptyEndCols,
    rowSpacing,
    isAnimated,
    isShowSuperGameResult,
    plotOption
  );
  svg += plotEnd();
  return svg;
};

export const drawCGV2 = ({
  cols,
  rows,
  data,
  rowSpacing,
  backgroundMode,
  isAnimated = false,
  isShowSuperGameResult = false,
  emptyEndCols = 0,
}: {
  cols: number;
  rows: number;
  data: string[];
  emptyEndCols?: number;
  rowSpacing?: number;
  isAnimated?: boolean;
  isShowSuperGameResult?: boolean;
  backgroundMode: RoadmapBackgroundMode;
}) => {
  const size = 50;
  const rowHeight = size * (isShowSuperGameResult ? 4 : 3);
  const w = size * cols * 1.2;
  const h = rowHeight * rows + (rowSpacing || 0) * (rows - 1);

  const getPlotOptionByBackgroundMode = (
    mode: RoadmapBackgroundMode = "dark"
  ): PlotOption => {
    return mode === "dark"
      ? {
          hasDots: true,
          dotColor: "transparent",
          dotOpacity: 0.6,
        }
      : {
          hasDots: true,
          dotColor: "transparent",
          dotOpacity: 0.6,
        };
  };

  const rm = calcCGRoadmap({ data, r0MaxCol: cols });
  const plotOption = getPlotOptionByBackgroundMode(backgroundMode);
  const roaddata = rm.rt0;

  let svg = plotCGv2Begin(w, h, w, h, false, plotOption);
  svg += plotCGv2eadRoad(
    roaddata,
    cols,
    rows,
    w,
    h,
    0,
    0,
    emptyEndCols,
    rowSpacing,
    isAnimated,
    isShowSuperGameResult,
    plotOption
  );
  svg += plotEnd();
  return svg;
};
