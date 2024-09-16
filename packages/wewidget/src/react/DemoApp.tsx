import useWeClient from "./hooks/useWeClient";
import WeGameWidget from "./components/WeGameWidget";
import React, { ReactNode, useState } from "react";

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
  const { connectClient, setLanguage } = useWeClient();
  const handleChange = (e: any) => {
    const value = e?.target?.value;
    setEnv(value);
  };

  const handleLangChange = (e: any) => {
    const value = e?.target?.value;
    setLang(value);
    setLanguage(value);
  };
  const handleSubmit = () => {
    const operCode = env === "snd" ? "weguest_ag3nP0D" : "weguest_agqJgF5";
    connectClient({
      operCode,
      language: lang,
      appKey: "v1_81qFsUWYEfMgJaYtwjVDTbyFyXE5J4NpaTZDdDaq1HsL",
      sandbox: env === "snd",
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
      <h1>React App Demo</h1>
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
      <Item>
        <Labels points={["Game Code: STUDIO-BBA-5"]} />
        <WeGameWidget gameCode="STUDIO-BAA-5" />
      </Item>
    </div>
  );
};

export default App;
