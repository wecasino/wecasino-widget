import {
  useWeClient,
  WeGameWidget,
  WeGameJackpot,
  useActivityUpdate,
  useJackpotTrigger,
} from "@wecasino/wewidget/react";

import React, { ReactNode, useEffect, useState } from "react";

const Item = ({
  style,
  children,
}: {
  style?: React.CSSProperties;
  children: ReactNode;
}) => (
  <div
    style={{
      margin: 6,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderRadius: 8,
      padding: 4,
      background: "#eeeeee",
      boxShadow: "2px 2px 4px 2px #888888",
      ...style,
    }}
  >
    {children}
  </div>
);

const Labels = ({
  style,
  points,
}: {
  style?: React.CSSProperties;
  points: string[];
}) => (
  <div
    style={{
      fontWeight: 500,
      ...style,
    }}
  >
    {points.map((pt) => (
      <React.Fragment key={pt}>
        {pt}
        <br />
      </React.Fragment>
    ))}
  </div>
);

const App = () => {
  const [env, setEnv] = useState("snd");
  const [lang, setLang] = useState("en");
  const { connectClient, setLanguage, closeClient } = useWeClient();
  const handleChange = (e: any) => {
    const value = e?.target?.value;
    setEnv(value);
  };

  const jpTrigger = useJackpotTrigger();
  useEffect(() => {
    if (jpTrigger) {
      console.log("jackpot trigger", jpTrigger);
    }
  }, [jpTrigger]);

  const actUpdate = useActivityUpdate();

  useEffect(() => {
    if (actUpdate) {
      console.log("activity update", actUpdate);
    }
  }, [actUpdate]);

  const handleLangChange = (e: any) => {
    const value = e?.target?.value;
    setLang(value);
    setLanguage(value);
  };
  const handleSubmit = () => {
    closeClient();
    connectClient({
      operCode: env === "snd" ? "weguest_ag3nP0D" : "weguest_agqJgF5",
      language: lang,
      appKey:
        env === "snd"
          ? "v1_FQdU97c4vihZxR2BKSEUuNmSJNRDZUwj1ss5tMfHfMig"
          : "v1_81qFsUWYEfMgJaYtwjVDTbyFyXE5J4NpaTZDdDaq1HsL",
      sandbox: env === "snd",
      reconnectDelay: 10000,
    });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "black",
      }}
    >
      <h1>React WeGameWidget Demo</h1>
      <div style={{ margin: 6 }}>
        ENV:
        <select value={env} onChange={handleChange}>
          <option value="snd">sandbox</option>
          <option value="prd">production</option>
        </select>
      </div>
      <div style={{ margin: 6 }}>
        Language:
        <select id="language" onChange={handleLangChange}>
          <option value="en">en</option>
          <option value="cn">cn</option>
          <option value="zh">zh</option>
          <option value="es">es</option>
          <option value="id">id</option>
          <option value="in">in</option>
          <option value="ja">ja</option>
          <option value="ko">ko</option>
          <option value="my">my</option>
          <option value="pt">pt</option>
          <option value="th">th</option>
          <option value="tl">tl</option>
          <option value="tr">tr</option>
          <option value="vi">vi</option>
        </select>
      </div>
      <button onClick={handleSubmit}>Connect </button>
      <Item>
        <Labels
          points={["WeGameJackpot Text Demo", "Game Code: STUDIO-OLN-OLN001"]}
        />
        <WeGameJackpot gameCode="STUDIO-OLN-OLN001" />
      </Item>
      <Item>
        <Labels points={["Game Code: STUDIO-BAA-1"]} />
        <WeGameWidget gameCode="STUDIO-BAA-1" />
      </Item>
      <Item>
        <Labels
          points={[
            "Game Code: STUDIO-BAA-4",
            "titleColor: black",
            "backgroundColor: blue",
            "roadmapBackgroundColor: gray",
            "borderRadius: 0",
          ]}
        />
        <WeGameWidget
          gameCode="STUDIO-BAA-4"
          titleColor="black"
          backgroundColor="blue"
          roadmapBackgroundColor="gray"
          borderRadius="0"
        />
      </Item>
      <Item>
        <Labels
          points={[
            "Game Code: STUDIO-BAA-15",
            "title: Override title",
            "width: 600px",
            "roadmapMode: dark",
          ]}
        />
        <WeGameWidget
          gameCode="STUDIO-BAA-15"
          title="Override title"
          width="600px"
          roadmapMode="dark"
        />
      </Item>
      <Item style={{ width: "100%" }}>
        <Labels
          points={[
            "Game Code: STUDIO-BAA-15",
            "width: 100%",
            "item container width: 100%",
          ]}
        />
        <WeGameWidget gameCode="STUDIO-BAA-15" width="100%" />
      </Item>
      <Item>
        <Labels points={["Game Code: STUDIO-BBA-5"]} />
        <WeGameWidget gameCode="STUDIO-BAA-5" />
      </Item>
      <Item style={{ width: "100%" }}>
        <Labels
          points={[
            "Game Code: STUDIO-CG-CGC001",
            "roadmapBackgroundColor: transparent",
            "width: 100%",
            "item container width: 100%",
          ]}
        />
        <WeGameWidget
          gameCode="STUDIO-CG-CGC001"
          roadmapBackgroundColor="transparent"
          width="100%"
        />
      </Item>
      <Item>
        <Labels
          points={[
            "Game Code: STUDIO-CG-CGC001",
            "roadmapBackgroundColor: transparent",
          ]}
        />
        <WeGameWidget
          gameCode="STUDIO-CG-CGC001"
          roadmapBackgroundColor="transparent"
        />
      </Item>
    </div>
  );
};

export default App;
