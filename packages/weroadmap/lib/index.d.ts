declare const TurnModeLeftAndRight = 0;
declare const TurnModeProhibitLeft = 1;
declare const TurnModeSimpleRight = 2;
declare const DefaultTurnMode = 2;
/** max visible cols */
declare const DefaultMaxCol = 200;
/** max visible rows */
declare const DefaultMaxRow = 6;
/** calculation max cols */
declare const DefaultMaxCalcCol = 200;
/** red, 庄, 虎  */
declare const winResultBanker = 1;
/** blue, 閒, 龍 */
declare const winResultPlayer = 2;
/** green, 和 */
/** green, 和 */
declare const winResultTie = 3;
type Checker = {
    index: number;
    rindex: number;
    row: number;
    col: number;
    winner: number;
    cntRws: number;
    cntFties: number;
    cntTies: number;
    cntBps: number;
    cntPps: number;
    cntBsix: number;
    isLucky?: boolean;
    isLast?: boolean;
    data?: DataEntry;
};
type Roadmap = {
    rt0: Checker[];
    rt1: Checker[];
    rt2: Checker[];
    rt3: Checker[];
    rt4: Checker[];
    fcb: (Checker | undefined)[];
    fcp: (Checker | undefined)[];
    fcb0: Checker[];
    fcb1: Checker[];
    fcb2: Checker[];
    fcb3: Checker[];
    fcb4: Checker[];
    fcp0: Checker[];
    fcp1: Checker[];
    fcp2: Checker[];
    fcp3: Checker[];
    fcp4: Checker[];
};
type DataEntry = {
    w: number;
    b: number;
    p: number;
    x?: number;
    y?: number;
    pv?: number;
    bv?: number;
    card?: string;
};
type CalcRoadmapOptions = {
    data: DataEntry[];
    turnMode?: number;
    r0MaxCol?: number;
    r1MaxCol?: number;
    r2MaxCol?: number;
    r3MaxCol?: number;
    r4MaxCol?: number;
};
declare const createDataEntry: (w: number, b?: number, p?: number) => DataEntry;
declare const calcStats: (data: DataEntry[]) => {
    rounds: number;
    cntB: number;
    cntP: number;
    cntT: number;
    cntBp: number;
    cntPp: number;
    cntPpBp: number;
};
declare const calcRoadmap: ({ data, turnMode, r0MaxCol, r1MaxCol, r2MaxCol, r3MaxCol, r4MaxCol }: CalcRoadmapOptions) => Roadmap;
declare class CheckerGrid {
    items: Array<Checker>;
    maxRow: number;
    maxCol: number;
    turnMode: number;
    rtType?: number;
    constructor(maxCol: number, turnMode: number);
    getChecker(row: number, col: number): Checker | undefined;
    getOrCreate(row: number, col: number): Checker;
    plot(): string;
}
declare class ColumnInfo {
    idx: number;
    col: number;
    winner: number;
    firstTies: number;
    items: Checker[];
    constructor(col: number);
    getChecker(row: number): Checker | undefined;
    getOrCreateChecker(row: number): Checker;
    shiftCol(n: number): void;
    toString(): string;
}
declare class ColumnList {
    items: Array<ColumnInfo>;
    getColumn(col: number): ColumnInfo | undefined;
    getColumnByIdx(idx: number): ColumnInfo | undefined;
    getOrCreateColumn(col: number): ColumnInfo;
    shiftCol(fromCol: number, n: number): void;
}
declare function buildCheckers(input: DataEntry[], constraint?: number): Checker[];
declare function analyzeBeadRoad(input: DataEntry[], maxCol?: number): CheckerGrid;
declare function analyzeBigRoad(input: DataEntry[], maxCol?: number, turnMode?: number): [ColumnList, CheckerGrid];
declare function bigRoadFillColumns(columns: ColumnList, entries: Checker[]): void;
declare function analyze234Road(subrt: number, bidRoadColumns: ColumnList, maxCol?: number, turnMode?: number): [ColumnList, CheckerGrid];
declare function analyzeResult(columns: ColumnList, results: CheckerGrid): void;
/** 長庄 */
declare const grtLongBanker = "LONGB";
/** 長閒  */
declare const grtLongPlayer = "LONGP";
/** 拍拍黐 */
declare const grtLongBankerLongPlayer = "LONGBLONGP";
/** ? */
declare const grtLongToSingleJump = "LONGTSJ";
/** 大路單跳 */
declare const grtSingleJump = "SINGLEJ";
/** 一廳兩房 (庄) */
declare const grtOneHallTwoRoomBanker = "OHTRB";
/** 一廳兩房 (閒) */
declare const grtOneHallTwoRoomPlayer = "OHTRP";
/** 逢庄黐 */
declare const grtStickOnBanker = "STICKB";
/** 逢閒黐 */
declare const grtStickOnPlayer = "STICKP";
/** 隔黐庄 */
declare const grtSeparateFromBanker = "SEPB";
/** 隔黐閒 */
declare const grtSeparateFromPlayer = "SEPP";
/** ? */
declare const grtStickBottomBanker = "STKBTMB";
/** ? */
declare const grtStickBottomPlayer = "STKBTMP";
/** ? */
declare const grtOneThreeTwoFourBigEye = "OTTFRT2";
/** ? */
declare const grtLongCockroach = "LONGRT4";
/** 全部次序: 斜坡路 > 大路雙跳 > 大路單跳 > 拍拍黐 > 一廳兩房 (莊/閒)> 逢（莊/閒）跳 > 逢（莊/閒）連 > 長（莊/閒） */
/** 次序: 大路單跳 > 拍拍黐 > 一廳兩房 (莊/閒)> 逢（莊/閒）跳 > 逢（莊/閒）連 > 長（莊/閒） */
declare function analyzeGreatRoad(colrt1: ColumnList): string[];
/** get highest priority great road */
declare function calcGreatRoad(greatRoadOptions: string[] | undefined, colrt1: ColumnList): string;

declare const emptyBACard = "0,0,0,0,0,0";
declare const createBAEntry: (card: string) => DataEntry;
type BAStats = {
    rounds: number;
    cntB: number;
    cntP: number;
    cntT: number;
    cntBp: number;
    cntPp: number;
    cntPpBp: number;
};
declare const calcBAStats: (data: string[]) => BAStats;
declare const calcBARoadmap: ({ data, turnMode, r0MaxCol, r1MaxCol, r2MaxCol, r3MaxCol, r4MaxCol }: {
    data: string[];
    turnMode?: number | undefined;
    r0MaxCol?: number | undefined;
    r1MaxCol?: number | undefined;
    r2MaxCol?: number | undefined;
    r3MaxCol?: number | undefined;
    r4MaxCol?: number | undefined;
}) => {
    rt0: Checker[];
    rt1: Checker[];
    rt2: Checker[];
    rt3: Checker[];
    rt4: Checker[];
    fcb: (Checker | undefined)[];
    fcp: (Checker | undefined)[];
    fcb0: Checker[];
    fcb1: Checker[];
    fcb2: Checker[];
    fcb3: Checker[];
    fcb4: Checker[];
    fcp0: Checker[];
    fcp1: Checker[];
    fcp2: Checker[];
    fcp3: Checker[];
    fcp4: Checker[];
    cntB: number;
    cntP: number;
    cntT: number;
    cntBp: number;
    cntPp: number;
    cntPpBp: number;
    rounds: number;
};

declare const emptyDICard = "0,0,0";
declare const createDIDataEntry: (card: string, roadType: 'point' | 'bigSmall' | 'oddEven' | 'history') => DataEntry;
declare class DICheckerGrid extends CheckerGrid {
    constructor(maxCol: number, turnMode: number);
}
declare const calcDIRoadmap: ({ data, r0MaxCol }: {
    data: string[];
    r0MaxCol?: number | undefined;
}) => {
    rt0: Checker[];
    rt1: Checker[];
    rt2: Checker[];
    rt3: Checker[];
};
declare function analyzeDIBeadRoad(input: DataEntry[], maxCol?: number): CheckerGrid;
declare function analyzeDIBigRoad(input: DataEntry[], maxCol?: number, turnMode?: number): [ColumnList, CheckerGrid];
type DIStats = {
    rounds: number;
    cntBig: number;
    cntSmall: number;
    cntOdd: number;
    cntEven: number;
    cntTriple: number;
};
declare const calcDIStats: (data: string[]) => DIStats;
declare const calcDIStatsProbabilities: (data: string[]) => number[];

declare const emptyDTCard = "0,0";
declare const createDTEntry: (card: string) => DataEntry;
type DTStats = {
    rounds: number;
    cntB: number;
    cntP: number;
    cntT: number;
};
declare const calcDTStats: (data: string[]) => DTStats;
declare const calcDTRoadmap: ({ data, turnMode, r0MaxCol, r1MaxCol, r2MaxCol, r3MaxCol, r4MaxCol }: {
    data: string[];
    turnMode?: number | undefined;
    r0MaxCol?: number | undefined;
    r1MaxCol?: number | undefined;
    r2MaxCol?: number | undefined;
    r3MaxCol?: number | undefined;
    r4MaxCol?: number | undefined;
}) => {
    rt0: Checker[];
    rt1: Checker[];
    rt2: Checker[];
    rt3: Checker[];
    rt4: Checker[];
    fcb: (Checker | undefined)[];
    fcp: (Checker | undefined)[];
    fcb0: Checker[];
    fcb1: Checker[];
    fcb2: Checker[];
    fcb3: Checker[];
    fcb4: Checker[];
    fcp0: Checker[];
    fcp1: Checker[];
    fcp2: Checker[];
    fcp3: Checker[];
    fcp4: Checker[];
    cntB: number;
    cntP: number;
    cntT: number;
    rounds: number;
};

declare const emptyLWCard = "0";
declare const createLWDataEntry: (card: string) => DataEntry;
declare function analyzeLWBeadRoad(input: DataEntry[], maxCol: number): CheckerGrid;
declare const calcLWRoadmap: ({ data, r0MaxCol }: {
    data: string[];
    r0MaxCol: number;
}) => {
    rt0: Checker[];
};
type LWStats = {
    rounds: number;
    cntYellow: number;
    cntBlue: number;
    cntPink: number;
    cntGreen: number;
    cntPurple: number;
    cntOrange: number;
    cntRed: number;
};
declare const calcLWStats: (data: string[]) => LWStats;

declare const emptyOXCard = "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0";
type OXResult = {
    bankerCowType: number;
    player1CowType: number;
    player2CowType: number;
    player3CowType: number;
    player1Win: 1 | 2;
    player2Win: 1 | 2;
    player3Win: 1 | 2;
};
declare const createOXDataEntry: (card: string, winType: 'player1Win' | 'player2Win' | 'player3Win') => DataEntry;
declare const calcOXRoadmap: ({ data }: {
    data: string[];
}) => {
    rt0: OXResult[];
    rt1: Checker[];
    rt2: Checker[];
    rt3: Checker[];
};
declare function analyzeOXBigRoad(input: DataEntry[], maxCol?: number, turnMode?: number): [ColumnList, CheckerGrid];
declare const OX_CHECKER_SIZE_MAP: {
    SIZE_36_24: {
        width: number;
        height: number;
    };
    SIZE_28_14: {
        width: number;
        height: number;
    };
};
type OXCheckerSize = keyof typeof OX_CHECKER_SIZE_MAP;
type OXStats = {
    rounds: number;
    cntP1: number;
    cntP2: number;
    cntP3: number;
    cntB1: number;
    cntB2: number;
    cntB3: number;
    cntBAll: number;
};
declare const calcOXStats: (data: string[]) => OXStats;

declare const emptyROCard = "-1";
declare const createRODataEntry: (card: string, roadType: 'redBlack' | 'oddEven' | 'bigSmall' | 'bead' | 'dozenCol') => DataEntry;
declare function analyzeROBigRoad(input: DataEntry[], maxCol?: number, turnMode?: number): [ColumnList, CheckerGrid];
declare function analyzeROBeadRoad(input: DataEntry[], maxCol?: number): CheckerGrid;
declare const calcRORoadmap: ({ data, r0MaxCol }: {
    data: string[];
    r0MaxCol?: number | undefined;
}) => {
    rt0: Checker[];
    rt1: Checker[];
    rt2: Checker[];
    rt3: Checker[];
    rt4: Checker[];
};
type ROStats = {
    rounds: number;
    cntRed: number;
    cntBlack: number;
    cntOdd: number;
    cntEven: number;
    cntBig: number;
    cntSmall: number;
    cntZero: number;
};
declare const calcROStats: (data: string[]) => ROStats;

declare const emptyFANCard = "0";
declare const createFANDataEntry: (card: string) => DataEntry;
declare function analyzeFANBigRoad(input: DataEntry[], maxCol?: number, turnMode?: number): [ColumnList, CheckerGrid];
declare const calcFANRoadmap: ({ data }: {
    data: string[];
    r0MaxCol?: number | undefined;
}) => {
    rt0: Checker[];
};
type FANStats = {
    rounds: number;
    cntOdd: number;
    cntEven: number;
    cnt1: number;
    cnt2: number;
    cnt3: number;
    cnt4: number;
};
declare const calcFANStats: (data: string[]) => FANStats;

declare const emptyZJHCard = "0,0,0,0,0,0";
declare const createZJHDataEntry: (card: string) => DataEntry;
declare function analyzeZJHBigRoad(input: DataEntry[], maxCol?: number, turnMode?: number): [ColumnList, CheckerGrid];
declare const calcZJHRoadmap: ({ data, r0MaxCol, r1MaxCol }: {
    data: string[];
    r0MaxCol?: number | undefined;
    r1MaxCol?: number | undefined;
}) => {
    rt0: Checker[];
    rt1: Checker[];
};
type ZJHStats = {
    rounds: number;
    cntDragon: number;
    cntPhoenix: number;
    cntTie: number;
    cntPair8Above: number;
    cntStraight: number;
    cntFlush: number;
    cntStraightFlush: number;
    cntLeopard: number;
};
declare const calcZJHStats: (data: string[]) => ZJHStats;

declare const emptyCGCard = "0,0,0,0";
declare const createCGDataEntry: (card: string) => DataEntry;
declare function analyzeCGBeadRoad(input: DataEntry[], maxCol: number): CheckerGrid;
declare const calcCGRoadmap: ({ data, r0MaxCol }: {
    data: string[];
    r0MaxCol: number;
}) => {
    rt0: Checker[];
};
type CGStats = {
    rounds: number;
    cntYellow: number;
    cntBlue: number;
    cntPink: number;
    cntGreen: number;
    cntRed: number;
    cntWhite: number;
};
declare const calcCGStats: (data: string[]) => CGStats;

declare const emptyDBCard = "0,0,0";
declare const createDBDataEntry: (card: string) => DataEntry;
declare function analyzeDBBeadRoad(input: DataEntry[], maxCol: number): CheckerGrid;
declare const calcDBRoadmap: ({ data, r0MaxCol }: {
    data: string[];
    r0MaxCol: number;
}) => {
    rt0: Checker[];
};
type DBStats = {
    rounds: number;
    cntHeart9: number;
    cntHeart10: number;
    cntHeartJ: number;
    cntHeartQ: number;
    cntHeartK: number;
    cntHeartA: number;
};
declare const calcDBStats: (data: string[]) => DBStats;

type Lang = 'en' | 'zh' | 'cn';
type PlotOption = {
    /** standard mode display result, point mode display point of cards */
    mode?: 'standard' | 'point';
    /** @deprecated use pointFn instead. display bead points when mode set to point */
    points?: number[];
    /** display bead points when mode set to point and use this fn to return point value needed */
    pointFn?: (c: Checker) => number;
    /** background color of svg */
    backgroundColor?: string;
    /** display grid between checker */
    hasBorder?: boolean;
    /** grid border color */
    borderColor?: string;
    /** display dots between checker */
    hasDots?: boolean;
    /** dot color */
    dotColor?: string;
    /** dot opacity, default: 0.1 */
    dotOpacity?: number;
    /** checker padding inside a frame */
    checkerPadding?: number;
    /** checker spacing (for OX bead) inside a frame */
    spacingX?: number;
    spacingY?: number;
    /** variant game type: ba, dt */
    gameType?: 'BA' | 'DT' | 'ZJH' | 'BAL';
    /** lang */
    lang?: Lang;
    /** ba only */
    baBeadDotStrokeColor?: string;
    /** ba only */
    withOnClickEvent?: boolean;
    /** di only */
    columnSpacing?: number;
    /** di only */
    rowSpacing?: number;
};
declare const plotSymDefs: (plotOption?: PlotOption) => string;
declare const plotBegin: (vw: number, vh: number, w: number | string | undefined, h: number | string | undefined, withoutSymDefs?: boolean, plotOption?: PlotOption) => string;
declare const plotEnd: () => string;
declare const plotGrid: (visibleCol: number, visibleRow: number, w: number | string, h: number | string, locX: number | undefined, locY: number | undefined, plotOption?: PlotOption) => string;
declare const plotEmptyDots: (data: Checker[], col: number, row: number, multipler?: number, plotOption?: PlotOption, offsetCol?: number, isHorizontal?: boolean, cellDimX?: number, cellDimY?: number, offsetY?: number) => string;
declare const shiftData: (data: Checker[], visibleCol: number, visibleRow: number) => [Checker[], number];
declare const plotBeadRoad: (data: Checker[], visibleCol: number, visibleRow: number, w: number | string, h: number | string, locX: number | undefined, locY: number | undefined, multipler?: number | undefined, plotOption?: PlotOption) => string;
declare const plotFcHorm: (data: Checker[] | undefined) => string;
declare const plotBigRoad: (data: Checker[], visibleCol: number, visibleRow: number, w: number | string, h: number | string, locX: number | undefined, locY: number | undefined, multipler?: number, plotOption?: PlotOption) => string;
declare const plotR234Road: (data: Checker[], x: number, visibleCol: number, visibleRow: number, w: number | string, h: number | string, locX: number | undefined, locY: number | undefined, multipler?: number, plotOption?: PlotOption) => string;
declare const plotStandardFull: (rm: Roadmap, w: number | string | undefined, h: number | string | undefined, withoutSymDefs: boolean | undefined, plotOption?: PlotOption) => string;
declare const plotWaterfallFull: (rm: Roadmap, w: number | string | undefined, h: number | string | undefined, plotOption?: PlotOption) => string;
declare const plotDIBeadRoad: (data: Checker[], visibleCol: number, visibleRow: number, w: number | string, h: number | string, locX: number | undefined, locY: number | undefined, multipler?: number | undefined, plotOption?: PlotOption) => string;
declare const plotDIHistoryRoad: (data: Checker[], visibleCol: number, visibleRow: number, w: number | string, h: number | string, mode: 'oddEven' | 'bigSmall', plotOption?: PlotOption, isAnimate?: boolean, isCompactMode?: boolean) => string;
declare const plotDIBegin: (vw: number, vh: number, w: number | string | undefined, h: number | string | undefined, withoutSymDefs?: boolean, plotOption?: PlotOption) => string;
declare const plotDIBigRoad: (data: Checker[], visibleCol: number, visibleRow: number, w: number | string, h: number | string, locX: number | undefined, locY: number | undefined, multipler?: number, plotOption?: PlotOption) => string;
declare const plotDIOddEvenRoad: (data: Checker[], visibleCol: number, visibleRow: number, w: number | string, h: number | string, locX: number | undefined, locY: number | undefined, multipler?: number, plotOption?: PlotOption) => string;
declare const plotLWBegin: (vw: number, vh: number, w: number | string | undefined, h: number | string | undefined, withoutSymDefs?: boolean, plotOption?: PlotOption) => string;
declare const shiftDataLW: (data: Checker[], visibleCol: number, visibleRow: number) => [Checker[], number];
declare const plotLWBeadRoad: (data: Checker[], visibleCol: number, visibleRow: number, w: number | string, h: number | string, locX: number | undefined, locY: number | undefined, type: 'classic' | 'rainbow', multipler?: number | undefined, plotOption?: PlotOption) => string;
declare const plotOXBegin: (vw: number, vh: number, w: number | string | undefined, h: number | string | undefined, withoutSymDefs?: boolean, plotOption?: PlotOption) => string;
declare const plotOXBigBegin: (vw: number, vh: number, w: number | string | undefined, h: number | string | undefined, withoutSymDefs?: boolean, plotOption?: PlotOption) => string;
declare const plotOXBeadRoad: (data: OXResult[], visibleCol: number, w: number | string, h: number | string, locX: number | undefined, locY: number | undefined, size?: OXCheckerSize | undefined, multipler?: number | undefined, plotOption?: PlotOption) => string;
declare const sliceDataRO: (data: Checker[], visibleCol: number, visibleRow: number) => Checker[];
declare const plotROBegin: (vw: number, vh: number, w: number | string | undefined, h: number | string | undefined, isROL: boolean, withoutSymDefs?: boolean, plotOption?: PlotOption) => string;
declare const plotROBigRoad: (data: Checker[], visibleCol: number, visibleRow: number, w: number | string, h: number | string, locX: number | undefined, locY: number | undefined, type: 'bigSmall' | 'redBlack' | 'oddEven' | 'point' | 'dozenCol', multipler?: number, plotOption?: PlotOption) => string;
declare const plotROBeadRoad: (data: Checker[], visibleCol: number, visibleRow: number, w: number | string, h: number | string, locX: number | undefined, locY: number | undefined, multipler?: number, plotOption?: PlotOption) => string;
declare const plotRODozenColRoad: (data: Checker[], visibleCol: number, visibleRow: number, w: number | string, h: number | string, locX: number | undefined, locY: number | undefined, plotOption?: PlotOption & {
    backgroundMode: 'light' | 'dark';
}) => string;
declare const plotROLBeadRoad: (data: Checker[], visibleCol: number, visibleRow: number, w: number | string, h: number | string, locX: number | undefined, locY: number | undefined, multipler?: number, plotOption?: PlotOption) => string;
declare const plotFANBegin: (vw: number, vh: number, w: number | string | undefined, h: number | string | undefined, withoutSymDefs?: boolean, plotOption?: PlotOption) => string;
declare const plotFANBigRoad: (data: Checker[], visibleCol: number, visibleRow: number, w: number | string, h: number | string, locX: number | undefined, locY: number | undefined, multipler?: number, plotOption?: PlotOption) => string;
declare const plotZJHBigRoad: (data: Checker[], visibleCol: number, visibleRow: number, w: number | string, h: number | string, locX: number | undefined, locY: number | undefined, multipler?: number, plotOption?: PlotOption) => string;
declare const plotCGBegin: (vw: number, vh: number, w: number | string | undefined, h: number | string | undefined, withoutSymDefs?: boolean, plotOption?: PlotOption) => string;
declare const shiftDataCG: (data: Checker[], visibleCol: number) => [Checker[], number];
declare const plotCGBeadRoad: (data: Checker[], visibleCol: number, visibleRow: number, w: number | string, h: number | string, locX: number | undefined, locY: number | undefined, emptyEndCols?: number, rowSpacing?: number, isAnimated?: boolean, isShowSuperGameResult?: boolean, plotOption?: PlotOption) => string;
declare const plotCGv2Begin: (vw: number, vh: number, w: number | string | undefined, h: number | string | undefined, withoutSymDefs?: boolean, plotOption?: PlotOption) => string;
declare const plotCGv2eadRoad: (data: Checker[], visibleCol: number, visibleRow: number, w: number, h: number, locX: number | undefined, locY: number | undefined, emptyEndCols?: number, rowSpacing?: number, isAnimated?: boolean, isShowSuperGameResult?: boolean, plotOption?: PlotOption) => string;
declare const plotDBBegin: (vw: number, vh: number, w: number | string | undefined, h: number | string | undefined, withoutSymDefs?: boolean, plotOption?: PlotOption) => string;
declare const plotDBBeadRoad: (data: Checker[], visibleCol: number, visibleRow: number, w: number | string, h: number | string, locX: number | undefined, locY: number | undefined, emptyEndCols?: number, rowSpacing?: number, isAnimated?: boolean, plotOption?: PlotOption) => string;
declare const plotDBBegin_V2: (vw: number, vh: number, w: number | string | undefined, h: number | string | undefined, withoutSymDefs?: boolean, plotOption?: PlotOption) => string;
declare const plotDBBeadRoad_V2: (data: Checker[], visibleCol: number, visibleRow: number, w: number | string, h: number | string, locX: number | undefined, locY: number | undefined, emptyEndCols?: number, rowSpacing?: number, isAnimated?: boolean, plotOption?: PlotOption) => string;

declare const cellDim = 50;
declare const buildSymbolBeadAll: (baBeadDotStrokeColor?: string) => string;
declare const buildSymbolBeadAllDT: () => string;
declare const buildSymbolBead: (w: number, b: number, p: number, isLucky: boolean, baBeadDotStrokeColor?: string) => string;
declare const buildSymbolBeadDT: (w: number) => string;
declare const buildGroupBead: (w: number, b: number, p: number, isLucky: boolean, baBeadDotStrokeColor?: string) => string;
declare const buildGroupBead_zh: (w: number, b: number, p: number, isLucky: boolean, baBeadDotStrokeColor?: string) => string;
declare const buildGroupBead_cn: (w: number, b: number, p: number, isLucky: boolean, baBeadDotStrokeColor?: string) => string;
declare const buildGroupBeadDT_en: (w: number) => string;
declare const parseSymbolBead: (w: number, b: number, p: number, isLucky: boolean, lang?: Lang) => string;
declare const parseSymbolBeadDT: (w: number, lang?: Lang) => string;
declare const buildSymbolBeadNumAll: (isLucky: boolean) => string;
declare const buildSymbolBeadNum: (w: number, n: number, isLucky: boolean) => string;
declare const buildGroupBeadNum: (w: number, n?: number, isLucky?: boolean) => string;
declare const parseSymbolBeadNum: (w: number, n: number, isLucky?: boolean) => string;
declare const buildSymbolBigAll: (baBeadDotStrokeColor?: string) => string;
declare const buildSymbolBig: (w: number, b: number, p: number, baBeadDotStrokeColor?: string, isLucky?: boolean) => string;
declare const buildGroupBig: (w: number, b: number, p: number, baBeadDotStrokeColor?: string, isLucky?: boolean) => string;
declare const buildGroupBigNum: (w: number, n: number) => string;
declare const parseSymbolBig: (w: number, b: number, p: number, isLucky?: boolean) => string;
declare const buildSymbolR234All: () => string;
declare const buildSymbolR234: (x: number, w: number) => string;
declare const buildGroupR234: (x: number, w: number) => string;
declare const parseSymbolR234: (x: number, w: number) => string;
declare const buildDefsGrids: (borderColor?: string) => string;
declare const buildGrid50Pattern: (borderColor?: string) => string;
declare const buildDefsROLGrids: (borderColor?: string) => string;
declare const buildGridROLBeadPattern: (borderColor?: string) => string;
declare const buildSymbolDIBigAll: () => string;
declare const buildSymbolDIBig: (w: number) => string;
declare const buildSymbolDIOddEven: (w: number) => string;
declare const buildSymbolDIDice: (w: number) => string;
declare const buildGroupDIDice: (w: number) => string;
declare const buildDIHistoryNum: (w: number, mode: 'oddEven' | 'bigSmall', isTriple?: boolean) => string;
declare const buildDIHistoryBig: (lang: 'zh' | 'en' | 'cn') => string;
declare const buildDIHistoryTriple: (lang: 'zh' | 'en' | 'cn') => string;
declare const buildDIHistorySmall: (lang: 'zh' | 'en' | 'cn') => string;
declare const buildDIHistoryOdd: (lang: 'zh' | 'en' | 'cn') => string;
declare const buildDIHistoryEven: (lang: 'zh' | 'en' | 'cn') => string;
declare const buildGroupDIBig: (w: number) => string;
declare const buildGroupDIBigEn: (w: number) => string;
declare const buildGroupDIBigCn: (w: number) => string;
declare const buildGroupDIOddEven: (w: number) => string;
declare const buildGroupDIOddEvenEn: (w: number) => string;
declare const buildGroupDIOddEvenCn: (w: number) => string;
declare const parseSymbolDIBig: (w: number, lang?: Lang) => string;
declare const parseSymbolDIOddEven: (w: number, lang?: Lang) => string;
declare const parseSymbolDIDice: (w: number, lang?: Lang) => string;
declare const buildGroupDIBeadNum: (w: number, mode: 'light' | 'dark') => string;
declare const buildDefsLWColors: () => string;
declare const buildGroupLWBead: (w: number, last: boolean | undefined, mode: string) => string;
declare const parseSymbolLW: (w: number) => string;
declare const buildSymboLWAll: () => string;
declare const buildSymbolOXBigAll: () => string;
declare const buildSymbolOX: (fillColor: string, fillOpacity?: number) => string;
declare const buildGroupOXBead: (w: number, type: number, winnerType: number, mode: 'dark' | 'light', size?: OXCheckerSize) => string;
declare const buildGroupOXBeadLabel: (spacingY: number, lang?: Lang, size?: OXCheckerSize) => string;
declare const parseSymbolROBigSmall: (w: number, lang?: Lang) => string;
declare const parseSymbolRORedBlack: (w: number, lang?: Lang) => string;
declare const parseSymbolROOddEven: (w: number, lang?: Lang) => string;
declare const parseSymbolRODozenRow: (w: number) => string[];
declare const parseSymbolROBeadNum: (w: number) => string;
declare const parseSymbolROLBeadNum: (w: number, luckyOdds: number, bgMode: string) => string;
declare const buildSymbolROAll: () => string;
declare const buildGroupROZero: () => string;
declare const buildGroupROBigSmall: (w: number) => string;
declare const buildGroupROBigSmallEn: (w: number) => string;
declare const buildGroupROBigSmallCn: (w: number) => string;
declare const buildSymbolROBigSmall: (w: number) => string;
declare const buildGroupRORedBlack: (w: number) => string;
declare const buildGroupRORedBlackEn: (w: number) => string;
declare const buildGroupRORedBlackCn: (w: number) => string;
declare const buildSymbolRORedBlack: (w: number) => string;
declare const buildGroupROOddEven: (w: number) => string;
declare const buildGroupROOddEvenCn: (w: number) => string;
declare const buildGroupROOddEvenEn: (w: number) => string;
declare const buildSymbolROOddEven: (w: number) => string;
declare const buildSymbolRODozenRow: () => string;
declare const parseSymbolFAN: (w: number, lang?: Lang) => string;
declare const parseSymbolFANNum: (w: number, n: number) => string;
declare const buildSymbolFAN: (w: number) => string;
declare const buildGroupFAN: (w: number) => string;
declare const buildGroupFANEn: (w: number) => string;
declare const buildGroupFANCn: (w: number) => string;
declare const buildSymbolFANNum: () => string;
declare const buildSymbolFANAll: () => string;
declare const buildSymbolBeadAllZJH: () => string;
declare const buildSymbolBeadZJH: (w: number) => string;
declare const parseSymbolBeadZJH: (w: number, lang?: Lang) => string;
declare const parseSymbolBigZJH: (w: number) => string;
declare const buildDefsZJHGradients: () => string;
declare const buildGroupBeadZJHText: (w: number, lang: Lang) => string;
declare const buildGroupBeadZJH: (w: number, lang: Lang) => string;
declare const buildSymbolBigZJHAll: () => string;
declare const buildSymbolBigZJH: (w: number) => string;
declare const buildGroupBigZJH: (w: number) => string;
declare const buildDefsCGColors: () => string;
declare const buildGroupCGBead: (w: number) => string;
declare const CG_COLORS_V2: string[];
declare const parseSymbolDB: (w: string) => string;
declare const buildSymbolDBAll: () => string;
declare const buildGroupDBBead: (winner: string) => string;
declare const parseSymbolDB_V2: (w: string) => string;
declare const buildSymbolDBAll_V2: () => string;
declare const buildGroupDBBead_V2: (winner: string) => string;

declare const cardEmpty: (card: number) => boolean;
declare const cardPoint$4: (card: number) => number;
declare const cardValue$1: (card: number) => number;
declare const cardSuit$1: (card: number) => number;
declare const sumOfTwoCardValues: (c1: number, c2: number) => number;
declare const sumOfThreeCardValues: (c1: number, c2: number, c3: number) => number;
declare const pairOfTwoCardPoints: (c1: number, c2: number) => number;
declare const pairOfThreeCardPoints: (c1: number, c2: number, c3: number) => number;
declare const decomposeCardResult$9: (roundCard: string) => number[];
/** decompose roundLucky result */
declare const decomposeRoundLuckyResult$2: (roundLucky: string) => {
    [x: string]: number;
};
/** decompose accumCards lucky result */
declare const decomposeRoundCardLuckyResult$2: (roundCard: string) => {
    [x: string]: number;
};
declare const calcGameResult$9: (roundCard: string) => {
    w: number;
    b: number;
    p: number;
    x: number;
    y: number;
    bv: number;
    pv: number;
};
declare const calcWinResult$9: (roundCard: string) => string;
declare const calcWinBetCodes$9: (roundCard: string, roundNum: number) => string[];
declare const calcRoundMiss$9: (accumCards: string[], roundNum: number) => {
    [x: string]: number;
};
declare const randGameResult$9: () => string;
declare const randGameLuckyResult$1: () => string;
declare const randGameResultWithLucky$1: () => string;

declare const index$b_cardEmpty: typeof cardEmpty;
declare const index$b_pairOfThreeCardPoints: typeof pairOfThreeCardPoints;
declare const index$b_pairOfTwoCardPoints: typeof pairOfTwoCardPoints;
declare const index$b_sumOfThreeCardValues: typeof sumOfThreeCardValues;
declare const index$b_sumOfTwoCardValues: typeof sumOfTwoCardValues;
declare namespace index$b {
  export { calcGameResult$9 as calcGameResult, calcRoundMiss$9 as calcRoundMiss, calcWinBetCodes$9 as calcWinBetCodes, calcWinResult$9 as calcWinResult, index$b_cardEmpty as cardEmpty, cardPoint$4 as cardPoint, cardSuit$1 as cardSuit, cardValue$1 as cardValue, decomposeCardResult$9 as decomposeCardResult, decomposeRoundCardLuckyResult$2 as decomposeRoundCardLuckyResult, decomposeRoundLuckyResult$2 as decomposeRoundLuckyResult, index$b_pairOfThreeCardPoints as pairOfThreeCardPoints, index$b_pairOfTwoCardPoints as pairOfTwoCardPoints, randGameLuckyResult$1 as randGameLuckyResult, randGameResult$9 as randGameResult, randGameResultWithLucky$1 as randGameResultWithLucky, index$b_sumOfThreeCardValues as sumOfThreeCardValues, index$b_sumOfTwoCardValues as sumOfTwoCardValues };
}

declare const cardPoint$3: (card: number) => number;
declare const decomposeCardResult$8: (roundCard: string) => number[];
declare const calcGameResult$8: (roundCard: string) => {
    w: number;
    tp: number;
    dp: number;
};
declare const calcWinResult$8: (roundCard: string) => string;
declare const calcWinBetCodes$8: (roundCard: string, roundNum: number) => string[];
declare const calcRoundMiss$8: (accumCards: string[], roundNum: number) => {
    [x: string]: number;
};
declare const randGameResult$8: () => string;

declare namespace index$a {
  export { calcGameResult$8 as calcGameResult, calcRoundMiss$8 as calcRoundMiss, calcWinBetCodes$8 as calcWinBetCodes, calcWinResult$8 as calcWinResult, cardPoint$3 as cardPoint, decomposeCardResult$8 as decomposeCardResult, randGameResult$8 as randGameResult };
}

declare const decomposeCardResult$7: (roundCard: string) => number[];
declare const decomposeRoundLuckyResult$1: (roundCard: string) => {
    [x: string]: number;
};
/** decompose accumCards lucky result */
declare const decomposeRoundCardLuckyResult$1: (roundCard: string) => {
    [x: string]: number;
};
declare const cardPoint$2: (card: number) => number;
declare const sumOfThreeCardPoints: (d1: number, d2: number, d3: number) => number;
declare const calcGameResult$7: (roundCard: string) => {
    d1: number;
    d2: number;
    d3: number;
    pv: number;
    y: number;
    isOdd: boolean;
    isEven: boolean;
    isTriple: boolean;
    isSmall: boolean;
    isBig: boolean;
};
declare const findDouble: (d1: number, d2: number, d3: number) => number;
declare const isTriple$1: (d1: number, d2: number, d3: number) => boolean;
declare const calcWinResult$7: (roundCard: string) => string;
declare const calcWinBetCodes$7: (roundCard: string, roundNum: number) => string[];
declare const calcRoundMiss$7: (accumCards: string[], roundNum: number) => {
    [x: string]: number;
};
declare const randGameResult$7: () => string;

declare const index$9_findDouble: typeof findDouble;
declare const index$9_sumOfThreeCardPoints: typeof sumOfThreeCardPoints;
declare namespace index$9 {
  export { calcGameResult$7 as calcGameResult, calcRoundMiss$7 as calcRoundMiss, calcWinBetCodes$7 as calcWinBetCodes, calcWinResult$7 as calcWinResult, cardPoint$2 as cardPoint, decomposeCardResult$7 as decomposeCardResult, decomposeRoundCardLuckyResult$1 as decomposeRoundCardLuckyResult, decomposeRoundLuckyResult$1 as decomposeRoundLuckyResult, index$9_findDouble as findDouble, isTriple$1 as isTriple, randGameResult$7 as randGameResult, index$9_sumOfThreeCardPoints as sumOfThreeCardPoints };
}

declare const trackNums: number[];
declare const redNums: number[];
declare const blackNums: number[];
declare const smallNums: number[];
declare const bigNums: number[];
declare const evenNums: number[];
declare const oddNums: number[];
declare const dozen1Nums: number[];
declare const dozen2Nums: number[];
declare const dozen3Nums: number[];
declare const row1Nums: number[];
declare const row2Nums: number[];
declare const row3Nums: number[];
declare const calcGameResult$6: (roundCard: string) => {
    pv: number;
    y: number;
    isRed: boolean;
    isBlack: boolean;
    isSmall: boolean;
    isBig: boolean;
    isEven: boolean;
    isOdd: boolean;
    isRow1: boolean;
    isRow2: boolean;
    isRow3: boolean;
};
declare const decomposeCardResult$6: (roundCard: string) => number;
/** decompose roundLucky result */
declare const decomposeRoundLuckyResult: (roundLucky: string) => {
    [x: string]: number;
};
/** decompose accumCards lucky result */
declare const decomposeRoundCardLuckyResult: (roundCard: string) => {
    [x: string]: number;
};
declare const calcWinResult$6: (roundCard: string) => string;
declare const calcWinBetCodes$6: (roundCard: string, roundNum: number) => string[];
declare const calcRoundMiss$6: (accumCards: string[], roundNum: number) => {
    [x: string]: number;
};
declare const randGameResult$6: () => string;
declare const randGameLuckyResult: () => string;
declare const randGameResultWithLucky: () => string;

declare const index$8_bigNums: typeof bigNums;
declare const index$8_blackNums: typeof blackNums;
declare const index$8_decomposeRoundCardLuckyResult: typeof decomposeRoundCardLuckyResult;
declare const index$8_decomposeRoundLuckyResult: typeof decomposeRoundLuckyResult;
declare const index$8_dozen1Nums: typeof dozen1Nums;
declare const index$8_dozen2Nums: typeof dozen2Nums;
declare const index$8_dozen3Nums: typeof dozen3Nums;
declare const index$8_evenNums: typeof evenNums;
declare const index$8_oddNums: typeof oddNums;
declare const index$8_randGameLuckyResult: typeof randGameLuckyResult;
declare const index$8_randGameResultWithLucky: typeof randGameResultWithLucky;
declare const index$8_redNums: typeof redNums;
declare const index$8_row1Nums: typeof row1Nums;
declare const index$8_row2Nums: typeof row2Nums;
declare const index$8_row3Nums: typeof row3Nums;
declare const index$8_smallNums: typeof smallNums;
declare const index$8_trackNums: typeof trackNums;
declare namespace index$8 {
  export { index$8_bigNums as bigNums, index$8_blackNums as blackNums, calcGameResult$6 as calcGameResult, calcRoundMiss$6 as calcRoundMiss, calcWinBetCodes$6 as calcWinBetCodes, calcWinResult$6 as calcWinResult, decomposeCardResult$6 as decomposeCardResult, index$8_decomposeRoundCardLuckyResult as decomposeRoundCardLuckyResult, index$8_decomposeRoundLuckyResult as decomposeRoundLuckyResult, index$8_dozen1Nums as dozen1Nums, index$8_dozen2Nums as dozen2Nums, index$8_dozen3Nums as dozen3Nums, index$8_evenNums as evenNums, index$8_oddNums as oddNums, index$8_randGameLuckyResult as randGameLuckyResult, randGameResult$6 as randGameResult, index$8_randGameResultWithLucky as randGameResultWithLucky, index$8_redNums as redNums, index$8_row1Nums as row1Nums, index$8_row2Nums as row2Nums, index$8_row3Nums as row3Nums, index$8_smallNums as smallNums, index$8_trackNums as trackNums };
}

declare const BetCode_LW_0 = "LW_0";
declare const BetCode_LW_1 = "LW_1";
declare const BetCode_LW_2 = "LW_2";
declare const BetCode_LW_3 = "LW_3";
declare const BetCode_LW_4 = "LW_4";
declare const BetCode_LW_5 = "LW_5";
declare const BetCode_LW_6 = "LW_6";
declare const calcGameResult$5: (roundCard: string) => {
    pv: number;
};
declare const decomposeCardResult$5: (roundCard: string) => number;
declare const calcWinResult$5: (roundCard: string) => string;
declare const calcWinBetCodes$5: (roundCard: string, roundNum: number) => string[];
declare const calcRoundMiss$5: (accumCards: string[], roundNum: number) => {
    [x: string]: number;
};
declare const randGameResult$5: () => string;

declare const index$7_BetCode_LW_0: typeof BetCode_LW_0;
declare const index$7_BetCode_LW_1: typeof BetCode_LW_1;
declare const index$7_BetCode_LW_2: typeof BetCode_LW_2;
declare const index$7_BetCode_LW_3: typeof BetCode_LW_3;
declare const index$7_BetCode_LW_4: typeof BetCode_LW_4;
declare const index$7_BetCode_LW_5: typeof BetCode_LW_5;
declare const index$7_BetCode_LW_6: typeof BetCode_LW_6;
declare namespace index$7 {
  export { index$7_BetCode_LW_0 as BetCode_LW_0, index$7_BetCode_LW_1 as BetCode_LW_1, index$7_BetCode_LW_2 as BetCode_LW_2, index$7_BetCode_LW_3 as BetCode_LW_3, index$7_BetCode_LW_4 as BetCode_LW_4, index$7_BetCode_LW_5 as BetCode_LW_5, index$7_BetCode_LW_6 as BetCode_LW_6, calcGameResult$5 as calcGameResult, calcRoundMiss$5 as calcRoundMiss, calcWinBetCodes$5 as calcWinBetCodes, calcWinResult$5 as calcWinResult, decomposeCardResult$5 as decomposeCardResult, randGameResult$5 as randGameResult };
}

declare const COW_PATTERN_TYPE: {
    PATTERN_TYPE_FIVE_FLOWER: number;
    PATTERN_TYPE_COW_COW: number;
    PATTERN_TYPE_COW_NINE: number;
    PATTERN_TYPE_COW_EIGHT: number;
    PATTERN_TYPE_COW_SEVEN: number;
    PATTERN_TYPE_COW_SIX: number;
    PATTERN_TYPE_COW_FIVE: number;
    PATTERN_TYPE_COW_FOUR: number;
    PATTERN_TYPE_COW_THREE: number;
    PATTERN_TYPE_COW_TWO: number;
    PATTERN_TYPE_COW_ONE: number;
    PATTERN_TYPE_NO_COW: number;
};
declare const isFiveFlower: (cards: number[]) => boolean;
declare const maxCardRank: (cards: number[]) => number;
declare const lookForCow: (cards: number[]) => {
    hasCow: boolean;
    sum: number;
};
declare const determineCowType: (cards: number[]) => 0 | 17 | 18 | 19 | 20 | 15 | 16 | 30 | 11 | 14 | 13 | 12;
declare const calcGameResult$4: (roundCard: string) => {
    bankerCowType: number;
    player1CowType: number;
    player2CowType: number;
    player3CowType: number;
    player1Win: number;
    player2Win: number;
    player3Win: number;
};
declare const decomposeCardResult$4: (roundCard: string) => number[];
declare const calcWinResult$4: (roundCard: string) => string;
declare const calcWinBetCodes$4: (roundCard: string, roundNum: number) => string[];
declare const calcRoundMiss$4: (accumCards: string[], roundNum: number) => {
    [x: string]: number;
};
declare const randGameResult$4: () => string;

declare const index$6_COW_PATTERN_TYPE: typeof COW_PATTERN_TYPE;
declare const index$6_determineCowType: typeof determineCowType;
declare const index$6_isFiveFlower: typeof isFiveFlower;
declare const index$6_lookForCow: typeof lookForCow;
declare const index$6_maxCardRank: typeof maxCardRank;
declare namespace index$6 {
  export { index$6_COW_PATTERN_TYPE as COW_PATTERN_TYPE, calcGameResult$4 as calcGameResult, calcRoundMiss$4 as calcRoundMiss, calcWinBetCodes$4 as calcWinBetCodes, calcWinResult$4 as calcWinResult, decomposeCardResult$4 as decomposeCardResult, index$6_determineCowType as determineCowType, index$6_isFiveFlower as isFiveFlower, index$6_lookForCow as lookForCow, index$6_maxCardRank as maxCardRank, randGameResult$4 as randGameResult };
}

declare const calcGameResult$3: (roundCard: string) => {
    pv: number;
};
declare const decomposeCardResult$3: (roundCard: string) => number;
declare const calcWinResult$3: (roundCard: string) => string;
declare const calcWinBetCodes$3: (roundCard: string, roundNum: number) => string[];
declare const calcRoundMiss$3: (accumCards: string[], roundNum: number) => {
    [x: string]: number;
};
declare const randGameResult$3: () => string;

declare namespace index$5 {
  export { calcGameResult$3 as calcGameResult, calcRoundMiss$3 as calcRoundMiss, calcWinBetCodes$3 as calcWinBetCodes, calcWinResult$3 as calcWinResult, decomposeCardResult$3 as decomposeCardResult, randGameResult$3 as randGameResult };
}

declare const CardRank_NONE = 0;
declare const CardRank_PAIR = 1;
declare const CardRank_STRAIGHT = 2;
declare const CardRank_FLUSH = 3;
declare const CardRank_STRAIGHT_FLUSH = 4;
declare const CardRank_LEOPARD = 5;
declare const CardRank_LEOPARD_KILLER = 6;
declare const cardPoint$1: (card: number) => number;
declare const cardValue: (card: number) => number;
declare const cardSuit: (card: number) => number;
declare const analyzeHand: (c1: number, c2: number, c3: number) => {
    arr: number[];
    maxRank: number;
    maxSingle: number;
    maxPair: number;
};
declare const calcGameResult$2: (roundCard: string) => {
    w: number;
    rank: number;
    pv: number;
    dRank: number;
    dPv: number;
    dPair8Above: boolean;
    pRank: number;
    pPv: number;
    pPair8Above: boolean;
};
declare const decomposeCardResult$2: (roundCard: string) => number[];
declare const calcWinResult$2: (roundCard: string) => string;
declare const calcWinBetCodes$2: (roundCard: string, roundNum: number) => string[];
declare const calcRoundMiss$2: (accumCards: string[], roundNum: number) => {
    [x: string]: number;
};
declare const randGameResult$2: () => string;

declare const index$4_CardRank_FLUSH: typeof CardRank_FLUSH;
declare const index$4_CardRank_LEOPARD: typeof CardRank_LEOPARD;
declare const index$4_CardRank_LEOPARD_KILLER: typeof CardRank_LEOPARD_KILLER;
declare const index$4_CardRank_NONE: typeof CardRank_NONE;
declare const index$4_CardRank_PAIR: typeof CardRank_PAIR;
declare const index$4_CardRank_STRAIGHT: typeof CardRank_STRAIGHT;
declare const index$4_CardRank_STRAIGHT_FLUSH: typeof CardRank_STRAIGHT_FLUSH;
declare const index$4_analyzeHand: typeof analyzeHand;
declare const index$4_cardSuit: typeof cardSuit;
declare const index$4_cardValue: typeof cardValue;
declare namespace index$4 {
  export { index$4_CardRank_FLUSH as CardRank_FLUSH, index$4_CardRank_LEOPARD as CardRank_LEOPARD, index$4_CardRank_LEOPARD_KILLER as CardRank_LEOPARD_KILLER, index$4_CardRank_NONE as CardRank_NONE, index$4_CardRank_PAIR as CardRank_PAIR, index$4_CardRank_STRAIGHT as CardRank_STRAIGHT, index$4_CardRank_STRAIGHT_FLUSH as CardRank_STRAIGHT_FLUSH, index$4_analyzeHand as analyzeHand, calcGameResult$2 as calcGameResult, calcRoundMiss$2 as calcRoundMiss, calcWinBetCodes$2 as calcWinBetCodes, calcWinResult$2 as calcWinResult, cardPoint$1 as cardPoint, index$4_cardSuit as cardSuit, index$4_cardValue as cardValue, decomposeCardResult$2 as decomposeCardResult, randGameResult$2 as randGameResult };
}

declare const decomposeCardResult$1: (roundCard: string) => number[];
declare const cardPoint: (card: number) => number;
declare const calcGameResult$1: (roundCard: string) => {
    d1: number;
    d2: number;
    d3: number;
    d4: number;
    isTriple: boolean;
};
declare const isTriple: (d1: number, d2: number, d3: number) => boolean;
declare const calcWinResult$1: (roundCard: string) => string;
declare const calcWinBetCodes$1: (roundCard: string) => string[];
declare const calcRoundMiss$1: (accumCards: string[], roundNum: number) => {
    [x: string]: number;
};
declare const randGameResult$1: () => string;

declare const index$3_cardPoint: typeof cardPoint;
declare const index$3_isTriple: typeof isTriple;
declare namespace index$3 {
  export { calcGameResult$1 as calcGameResult, calcRoundMiss$1 as calcRoundMiss, calcWinBetCodes$1 as calcWinBetCodes, calcWinResult$1 as calcWinResult, index$3_cardPoint as cardPoint, decomposeCardResult$1 as decomposeCardResult, index$3_isTriple as isTriple, randGameResult$1 as randGameResult };
}

declare const DB_EMPTY_CARD = "0";
declare const DB_CARDS: string[];
declare const decomposeCardResult: (roundCard: string) => number[];
declare const calcGameResult: (roundCard: string) => {
    c1: string;
    c2: string;
    c3: string;
};
declare const calcWinResult: (roundCard: string) => string;
declare const calcWinBetCodes: (roundCard: string, roundNum: number) => string[];
declare const calcRoundMiss: (accumCards: string[], roundNum: number) => {
    [x: string]: number;
};
declare const randGameResult: () => string;

declare const index$2_DB_CARDS: typeof DB_CARDS;
declare const index$2_DB_EMPTY_CARD: typeof DB_EMPTY_CARD;
declare const index$2_calcGameResult: typeof calcGameResult;
declare const index$2_calcRoundMiss: typeof calcRoundMiss;
declare const index$2_calcWinBetCodes: typeof calcWinBetCodes;
declare const index$2_calcWinResult: typeof calcWinResult;
declare const index$2_decomposeCardResult: typeof decomposeCardResult;
declare const index$2_randGameResult: typeof randGameResult;
declare namespace index$2 {
  export { index$2_DB_CARDS as DB_CARDS, index$2_DB_EMPTY_CARD as DB_EMPTY_CARD, index$2_calcGameResult as calcGameResult, index$2_calcRoundMiss as calcRoundMiss, index$2_calcWinBetCodes as calcWinBetCodes, index$2_calcWinResult as calcWinResult, index$2_decomposeCardResult as decomposeCardResult, index$2_randGameResult as randGameResult };
}

declare const _default: {
    calcGameResult: (roundCard: string, isHit: boolean) => {
        w: number;
        b: number;
        p: number;
        x: number;
        y: number;
        bv: number;
        pv: number;
    };
    calcWinResult: (roundCard: string, isHit: boolean) => string;
    calcWinBetCodes: (roundCard: string) => string[];
    calcRoundMiss: (accumCards: string[], roundNum: number) => {
        [x: string]: number;
    };
    randGameResult: () => string;
    cardEmpty: (card: number) => boolean;
    cardPoint: (card: number) => number;
    cardValue: (card: number) => number;
    cardSuit: (card: number) => number;
    sumOfTwoCardValues: (c1: number, c2: number) => number;
    sumOfThreeCardValues: (c1: number, c2: number, c3: number) => number;
    pairOfTwoCardPoints: (c1: number, c2: number) => number;
    pairOfThreeCardPoints: (c1: number, c2: number, c3: number) => number;
    decomposeCardResult: (roundCard: string) => number[];
    decomposeRoundLuckyResult: (roundLucky: string) => {
        [x: string]: number;
    };
    decomposeRoundCardLuckyResult: (roundCard: string) => {
        [x: string]: number;
    };
    randGameLuckyResult: () => string;
    randGameResultWithLucky: () => string;
};

declare namespace index$1 {
  export { index$b as ba, index$3 as cg, index$2 as db, index$9 as di, index$a as dt, index$5 as fan, index$7 as lw, _default as oln, index$6 as ox, index$8 as ro, index$4 as zjh };
}

declare function genWidgetToken(operCode: string, appKey: string): string;

declare const index_genWidgetToken: typeof genWidgetToken;
declare namespace index {
  export { index_genWidgetToken as genWidgetToken };
}

export { type BAStats, type CGStats, CG_COLORS_V2, type CalcRoadmapOptions, type Checker, CheckerGrid, ColumnInfo, ColumnList, type DBStats, DICheckerGrid, type DIStats, type DTStats, type DataEntry, DefaultMaxCalcCol, DefaultMaxCol, DefaultMaxRow, DefaultTurnMode, type FANStats, type LWStats, type Lang, type OXCheckerSize, type OXResult, type OXStats, OX_CHECKER_SIZE_MAP, type PlotOption, type ROStats, type Roadmap, TurnModeLeftAndRight, TurnModeProhibitLeft, TurnModeSimpleRight, type ZJHStats, analyze234Road, analyzeBeadRoad, analyzeBigRoad, analyzeCGBeadRoad, analyzeDBBeadRoad, analyzeDIBeadRoad, analyzeDIBigRoad, analyzeFANBigRoad, analyzeGreatRoad, analyzeLWBeadRoad, analyzeOXBigRoad, analyzeROBeadRoad, analyzeROBigRoad, analyzeResult, analyzeZJHBigRoad, bigRoadFillColumns, buildCheckers, buildDIHistoryBig, buildDIHistoryEven, buildDIHistoryNum, buildDIHistoryOdd, buildDIHistorySmall, buildDIHistoryTriple, buildDefsCGColors, buildDefsGrids, buildDefsLWColors, buildDefsROLGrids, buildDefsZJHGradients, buildGrid50Pattern, buildGridROLBeadPattern, buildGroupBead, buildGroupBeadDT_en, buildGroupBeadNum, buildGroupBeadZJH, buildGroupBeadZJHText, buildGroupBead_cn, buildGroupBead_zh, buildGroupBig, buildGroupBigNum, buildGroupBigZJH, buildGroupCGBead, buildGroupDBBead, buildGroupDBBead_V2, buildGroupDIBeadNum, buildGroupDIBig, buildGroupDIBigCn, buildGroupDIBigEn, buildGroupDIDice, buildGroupDIOddEven, buildGroupDIOddEvenCn, buildGroupDIOddEvenEn, buildGroupFAN, buildGroupFANCn, buildGroupFANEn, buildGroupLWBead, buildGroupOXBead, buildGroupOXBeadLabel, buildGroupR234, buildGroupROBigSmall, buildGroupROBigSmallCn, buildGroupROBigSmallEn, buildGroupROOddEven, buildGroupROOddEvenCn, buildGroupROOddEvenEn, buildGroupRORedBlack, buildGroupRORedBlackCn, buildGroupRORedBlackEn, buildGroupROZero, buildSymboLWAll, buildSymbolBead, buildSymbolBeadAll, buildSymbolBeadAllDT, buildSymbolBeadAllZJH, buildSymbolBeadDT, buildSymbolBeadNum, buildSymbolBeadNumAll, buildSymbolBeadZJH, buildSymbolBig, buildSymbolBigAll, buildSymbolBigZJH, buildSymbolBigZJHAll, buildSymbolDBAll, buildSymbolDBAll_V2, buildSymbolDIBig, buildSymbolDIBigAll, buildSymbolDIDice, buildSymbolDIOddEven, buildSymbolFAN, buildSymbolFANAll, buildSymbolFANNum, buildSymbolOX, buildSymbolOXBigAll, buildSymbolR234, buildSymbolR234All, buildSymbolROAll, buildSymbolROBigSmall, buildSymbolRODozenRow, buildSymbolROOddEven, buildSymbolRORedBlack, calcBARoadmap, calcBAStats, calcCGRoadmap, calcCGStats, calcDBRoadmap, calcDBStats, calcDIRoadmap, calcDIStats, calcDIStatsProbabilities, calcDTRoadmap, calcDTStats, calcFANRoadmap, calcFANStats, calcGreatRoad, calcLWRoadmap, calcLWStats, calcOXRoadmap, calcOXStats, calcRORoadmap, calcROStats, calcRoadmap, calcStats, calcZJHRoadmap, calcZJHStats, cellDim, createBAEntry, createCGDataEntry, createDBDataEntry, createDIDataEntry, createDTEntry, createDataEntry, createFANDataEntry, createLWDataEntry, createOXDataEntry, createRODataEntry, createZJHDataEntry, emptyBACard, emptyCGCard, emptyDBCard, emptyDICard, emptyDTCard, emptyFANCard, emptyLWCard, emptyOXCard, emptyROCard, emptyZJHCard, index$1 as gameRules, grtLongBanker, grtLongBankerLongPlayer, grtLongCockroach, grtLongPlayer, grtLongToSingleJump, grtOneHallTwoRoomBanker, grtOneHallTwoRoomPlayer, grtOneThreeTwoFourBigEye, grtSeparateFromBanker, grtSeparateFromPlayer, grtSingleJump, grtStickBottomBanker, grtStickBottomPlayer, grtStickOnBanker, grtStickOnPlayer, parseSymbolBead, parseSymbolBeadDT, parseSymbolBeadNum, parseSymbolBeadZJH, parseSymbolBig, parseSymbolBigZJH, parseSymbolDB, parseSymbolDB_V2, parseSymbolDIBig, parseSymbolDIDice, parseSymbolDIOddEven, parseSymbolFAN, parseSymbolFANNum, parseSymbolLW, parseSymbolR234, parseSymbolROBeadNum, parseSymbolROBigSmall, parseSymbolRODozenRow, parseSymbolROLBeadNum, parseSymbolROOddEven, parseSymbolRORedBlack, plotBeadRoad, plotBegin, plotBigRoad, plotCGBeadRoad, plotCGBegin, plotCGv2Begin, plotCGv2eadRoad, plotDBBeadRoad, plotDBBeadRoad_V2, plotDBBegin, plotDBBegin_V2, plotDIBeadRoad, plotDIBegin, plotDIBigRoad, plotDIHistoryRoad, plotDIOddEvenRoad, plotEmptyDots, plotEnd, plotFANBegin, plotFANBigRoad, plotFcHorm, plotGrid, plotLWBeadRoad, plotLWBegin, plotOXBeadRoad, plotOXBegin, plotOXBigBegin, plotR234Road, plotROBeadRoad, plotROBegin, plotROBigRoad, plotRODozenColRoad, plotROLBeadRoad, plotStandardFull, plotSymDefs, plotWaterfallFull, plotZJHBigRoad, shiftData, shiftDataCG, shiftDataLW, sliceDataRO, index as widgets, winResultBanker, winResultPlayer, winResultTie };
