"use strict";var y=Object.defineProperty;var E=Object.getOwnPropertyDescriptor;var Z=Object.getOwnPropertyNames;var K=Object.prototype.hasOwnProperty;var V=(n,t)=>{for(var e in t)y(n,e,{get:t[e],enumerable:!0})},j=(n,t,e,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Z(t))!K.call(n,s)&&s!==e&&y(n,s,{get:()=>t[s],enumerable:!(o=E(t,s))||o.enumerable});return n};var q=n=>j(y({},"__esModule",{value:!0}),n),c=(n,t,e,o)=>{for(var s=o>1?void 0:o?E(t,e):t,a=n.length-1,i;a>=0;a--)(i=n[a])&&(s=(o?i(t,e,s):i(s))||s);return o&&s&&y(t,e,s),s};var vt={};V(vt,{WeClient:()=>U,WeGamePreview:()=>d,WeSpacer:()=>h});module.exports=q(vt);var B=require("immer"),T=require("zustand/vanilla"),J=()=>({language:"en",footer:{}}),Y=(0,T.createStore)(n=>({...J(),updateFooterConfig:t=>{n(e=>(0,B.produce)(e,o=>{o.footer={...o.footer,...t}}))},setLanguage:t=>{n(e=>(0,B.produce)(e,o=>{o.language=t}))}})),b=Y;var R=require("immer"),$=require("zustand/vanilla"),W=()=>({gameCodes:[],games:{}}),X=(0,$.createStore)(n=>({...W(),updateGameCode:t=>{n(e=>(0,R.produce)(e,o=>{let s=o.gameCodes.filter(a=>a!==t);o.gameCodes=[...s,t]}))},updateGames:t=>{n(e=>(0,R.produce)(e,o=>{let s=t.reduce((a,i)=>i.gameInfo?.gameCode?{...a,[i.gameInfo?.gameCode]:i}:a,{});o.games={...o.games,...s}}))},updateGameInfos:t=>{n(e=>(0,R.produce)(e,o=>{let s=t.reduce((a,i)=>{let r=i?.gameCode;if(!r)return a;let g={...a[r],gameInfo:i};return{...a,[r]:g}},e.games);o.games={...o.games,...s}}))},updateGameRounds:t=>{n(e=>(0,R.produce)(e,o=>{let s=t.reduce((a,i)=>{let r=i?.gameCode;if(!r)return a;let g={...a[r],gameRound:i};return{...a,[r]:g}},e.games);o.games={...o.games,...s}}))}})),v=X;var L=require("js-sha3");function O(n,t){let e=`${Date.now().valueOf()}`,o=L.sha3_256.hex(`${t}_${e}`);return`wgs.${n}.${e}_${o}`}var Q="wss://uat-weg-gdsapi.wehosts247.com/widgetws",tt="wss://nc-gdsapi.worldonlinegame.com/widgetws",M=class{constructor(t){this._cfg=t}listenGameUpdates(t){console.info("listenGameUpdates",t)}updateFooterConifg(t){b.getState().updateFooterConfig(t)}setLanguage(t){b.getState().setLanguage(t)}connect(){this._connect()}close(){this._close}_close(){this._ws?.close(),this._ws=void 0,this._rcIntv&&clearInterval(this._rcIntv),this._rcIntv=void 0}_connect(){if(this._ws)return;let t=this._cfg.token||O(this._cfg.operCode,this._cfg.appKey),e=this._cfg.dataUrl||(this._cfg.sandbox?Q:tt),o=new WebSocket(`${e}?token=${t}`);this._ws=o;let s=this;o.onopen=()=>{s._cfg.onOpen?.(),this._rcIntv&&clearInterval(this._rcIntv),this._rcIntv=void 0},o.onmessage=a=>{a.data&&s._handleData(a.data)},o.onerror=a=>{s._cfg.onError?.(a)},o.onclose=a=>{s._cfg.onClose?.(a),s._cfg.reconnectDelay&&(s._rcIntv=setInterval(()=>{s._close(),s._connect()},s._cfg.reconnectDelay))}}_handleData(t){let e=JSON.parse(t);if(e.gameInfos){let o=e.gameInfos;v.getState().updateGameInfos(o)}if(e.gameRounds){let o=e.gameRounds;v.getState().updateGameRounds(o)}}},U=M;var x=require("lit"),S=require("lit/decorators.js");var h=class extends x.LitElement{constructor(){super(...arguments);this.flex=0;this.width="";this.height=""}getSizeStyles(){return this.flex&&this.flex>0?"flex:1;":this.width?`width:${this.width};height:auto;min-height:auto`:`height:${this.height};width:auto;min-width:auto`}render(){let e=this.getSizeStyles();return x.html`<div style="${e}"></div>`}};c([(0,S.property)({type:Number})],h.prototype,"flex",2),c([(0,S.property)()],h.prototype,"width",2),c([(0,S.property)()],h.prototype,"height",2),h=c([(0,S.customElement)("we-spacer")],h);var C=require("lit"),f=require("lit/decorators.js"),I=require("lit/directives/class-map.js"),F=require("lit/directives/style-map.js");var H="./maintenance-icon-F3OM3KPW.svg";var P=require("@wecasino/weroadmap");var l={SHUFFLE:"shuffle",NEW_SHOE:"newshoe",START:"start",STOP:"stop",CARD:"card",RESULT:"result",CANCEL:"cancel"},ot=n=>[l.NEW_SHOE,l.SHUFFLE].includes(n),at=n=>!n||n.startsWith("http")||n.startsWith("https")?n:`https://${n}`,k=class{set gameCode(t){this._gameCode=t,v.getState().updateGameCode(this._gameCode)}get gameCode(){return this._gameCode}constructor(t){(this.host=t).addController(this)}hostConnected(){}hostDisconnected(){}subScribeConfigstore(){this.host.requestUpdate()}subScribeGametore(){this.host.requestUpdate()}connectStore(){this._unsubConfigStore=b.subscribe(this.subScribeConfigstore.bind(this)),this._unsubGameStore=v.subscribe(this.subScribeGametore.bind(this))}disconnectStore(){this._unsubConfigStore?.(),this._unsubGameStore?.()}get game(){return v.getState().games[this.gameCode]||{}}getGameInfos(){let t=this.game,e=this.getConfig().language,o=t?.gameInfo?.gameDescr?.[e||""]||t?.gameInfo?.gameDescr?.zh||"-",s=(0,P.calcBAStats)(t?.gameRound?.accumCards?.slice(-999)||[]),a=t?.gameRound?.roundState||"",i=a===l.RESULT,r=[l.CARD,l.RESULT].includes(a),u=a===l.START,g=this.game?.gameRound?.roundCard||"0,0,0,0,0,0",G=this.game?.gameRound?.accumCards||[],w=t?.gameRound?.gameState,z=at(t?.gameInfo?.gameMeta?.dealerImage||""),_="";a===l.SHUFFLE||a===l.NEW_SHOE?_="new_shoe":a===l.RESULT?_="settling":a===l.STOP||a===l.CARD?_="card_dealing":a===l.START&&(_="betting");let N=w==="maintenance"||w==="disable";return{title:o,stats:s,gameState:w,roundState:a,roundCard:g,accumCards:G,isChangingShoe:ot(a),isShowCardResult:r,isShowResult:i,isStart:u,isMaintenance:N,coverImageUrl:z,gameStateFlag:_}}getConfig(){return b.getState()}};var m=require("@wecasino/weroadmap"),nt=(n="dark")=>n==="light"?{hasBorder:!0,borderColor:"#BDC6D4",checkerPadding:2,baBeadDotStrokeColor:"#FFFFFF"}:{hasDots:!0,dotColor:"white",dotOpacity:.1,checkerPadding:2,baBeadDotStrokeColor:"#000000"};var A=({cols:n,data:t,gameType:e,backgroundMode:o})=>{let a=50*n,i=50*6,u=(e==="DT"?m.calcDTRoadmap:m.calcBARoadmap)({data:t,r0MaxCol:n}),g={...nt(o)},G=u.rt1,w=(0,m.plotBegin)(a,i,a,i,!1,g);return w+=(0,m.plotBigRoad)(G,n,6,a,i,0,0,1,g),w+=(0,m.plotEnd)(),w};var st={"status.sitting":"Already on this table","status.new_shoe":"Shuffling","status.settling":"Settling","status.card_dealing":"Result","common.state.maintenance":"Under maintenance"},it={"status.sitting":"\u5DF2\u5728\u6B64\u6AAF","status.new_shoe":"\u63DB\u9774\u4E2D","status.settling":"\u7D50\u7B97\u4E2D","status.card_dealing":"\u958B\u724C\u4E2D","common.state.maintenance":"\u7DAD\u8B77\u4E2D"},rt={"status.sitting":"\u5DF2\u5728\u6B64\u53F0","status.new_shoe":"\u6362\u9774\u4E2D","status.settling":"\u7ED3\u7B97\u4E2D","status.card_dealing":"\u5F00\u724C\u4E2D","common.state.maintenance":"\u7EF4\u62A4\u4E2D"},dt={"status.sitting":"Ya en esta mesa","status.new_shoe":"Barajando","status.settling":"Resolviendo","status.card_dealing":"Resultado","common.state.maintenance":"En mantenimiento"},ct={"status.sitting":"Kamu di sini","status.new_shoe":"Mengocok","status.settling":"Pembayaran","status.card_dealing":"Membuka","common.state.maintenance":"Dalam perbaikan"},gt={"status.sitting":"\u0907\u0938 \u091F\u0947\u092C\u0932 \u092A\u0930 \u092A\u0939\u0932\u0947 \u0938\u0947 \u0939\u0940","status.new_shoe":"\u0936\u092B\u0932 \u0915\u0930 \u0930\u0939\u093E \u0939\u0948","status.settling":"\u0938\u0947\u091F\u093F\u0932\u093F\u0902\u0917","status.card_dealing":"\u092A\u0930\u093F\u0923\u093E\u092E","common.state.maintenance":"\u0905\u0902\u0924\u0930\u094D\u0935\u093E\u0930\u094D\u0924\u093E \u092E\u0947\u0902"},mt={"status.sitting":"\u65E2\u306B\u3053\u306E\u30C6\u30FC\u30D6\u30EB\u3067","status.new_shoe":"\u30B7\u30E3\u30C3\u30D5\u30EB\u4E2D","status.settling":"\u6C7A\u6E08\u4E2D","status.card_dealing":"\u7D50\u679C","common.state.maintenance":"\u30E1\u30F3\u30C6\u30CA\u30F3\u30B9\u4E2D"},lt={"status.sitting":"\uC774\uBBF8 \uCC45\uC0C1\uC5D0 \uC62C\uB824\uC838 \uC788\uC74C","status.new_shoe":"\uC154\uD50C\uC911","status.settling":"\uC815\uC0B0\uC911","status.card_dealing":"\uACB0\uACFC","common.state.maintenance":"\uC810\uAC80\uC911"},ut={"status.sitting":"\u1012\u102E\u1005\u102C\u1038\u1015\u103D\u1032\u1015\u1031\u102B\u103A \u101B\u1031\u102C\u1000\u103A\u1014\u1031\u1015\u103C\u102E","status.new_shoe":"\u101B\u103E\u1015\u103A\u101B\u103E\u1015\u103A","status.settling":"\u1016\u103C\u1031\u101B\u103E\u1004\u103A\u1038\u1015\u102B","status.card_dealing":"\u101B\u101C\u1012\u103A","common.state.maintenance":"\u1019\u102D\u1014\u103A\u1010\u102D\u1014\u103A\u1014\u1000\u103A"},pt={"status.sitting":"J\xE1 nesta mesa","status.new_shoe":"Embaralhando","status.settling":"Liquida\xE7\xE3o","status.card_dealing":"Resultado","common.state.maintenance":"Manuten\xE7\xE3o"},ht={"status.sitting":"\u0E04\u0E38\u0E13\u0E2D\u0E22\u0E39\u0E48\u0E42\u0E15\u0E4A\u0E30\u0E19\u0E35\u0E49","status.new_shoe":"\u0E01\u0E33\u0E25\u0E31\u0E07\u0E2A\u0E31\u0E1A\u0E44\u0E1E\u0E48","status.settling":"\u0E01\u0E33\u0E25\u0E31\u0E07\u0E0A\u0E33\u0E23\u0E30","status.card_dealing":"\u0E01\u0E33\u0E25\u0E31\u0E07\u0E40\u0E1B\u0E34\u0E14\u0E44\u0E1E\u0E48","common.state.maintenance":"\u0E04\u0E38\u0E13\u0E2D\u0E22\u0E39\u0E48\u0E42\u0E15\u0E4A\u0E30\u0E19\u0E35\u0E49"},ft={"status.sitting":"Nasa mesa na ito","status.new_shoe":"Binabalasa","status.settling":"Inaayos","status.card_dealing":"Resulta","common.state.maintenance":"Isinasaayos pa"},bt={"status.sitting":"Bu Masada Zaten Var","status.new_shoe":"Kar\u0131\u015Ft\u0131rma","status.settling":"Yerle\u015Ftirme","status.card_dealing":"Sonu\xE7","common.state.maintenance":"Bak\u0131mda"},Ct={"status.sitting":"\u0111\xE3 \u1EDF b\xE0n n\xE0y","status.new_shoe":"Thay b\xE0i","status.settling":"\u0110ang thanh to\xE1n","status.card_dealing":"\u0110ang m\u1EDF b\xE0i","common.state.maintenance":"\u0111\xE3 \u1EDF b\xE0n n\xE0y"},wt={en:st,zh:it,cn:rt,es:dt,id:ct,in:gt,ja:mt,ko:lt,my:ut,pt,th:ht,tl:ft,tr:bt,vi:Ct},D=n=>{let t=b.getState().language||"";return wt[t]?.[n]||n};var d=class extends C.LitElement{constructor(){super(...arguments);this.gameCode="";this.footerPadding="";this.footerColor="";this.footerBackground="";this.width="";this.withFooter="true";this.title="";this.ctrl=new k(this)}connectedCallback(){super.connectedCallback(),this.ctrl.gameCode=this.gameCode,this.ctrl.connectStore()}disconnectedCallback(){super.disconnectedCallback(),this.ctrl.disconnectStore()}updated(e){e.has("gameCode")&&!e.get("gameCode")&&this.gameCode&&(this.ctrl.gameCode=this.gameCode)}getRoadmapContent({accumCards:e}){return A({cols:15,gameType:"BA",data:e,mode:"standard",backgroundMode:"light"})}renderFooter(){if(!(this.withFooter==="true"))return C.html``;let{title:o}=this.ctrl.getGameInfos(),s=this.ctrl.getConfig(),a=this.footerBackground||s.footer.backgroundColor||"",i=this.footerColor||s.footer.textColor||"",r={};a&&(r.background=a),this.footerPadding&&(r.padding=this.footerPadding);let u={};i&&(u.color=i);let g=this.title||o;return C.html`<div class="footer" style=${(0,F.styleMap)(r)}>
      <div class="game-name-container">
        <div class="game-name" style=${(0,F.styleMap)(u)}>
          ${g}
        </div>
      </div>
    </div>`}render(){let{accumCards:e,coverImageUrl:o,gameStateFlag:s,isMaintenance:a}=this.ctrl.getGameInfos(),i=this.getRoadmapContent({accumCards:e}),r=["sitting","new_shoe","settling","card_dealing"].indexOf(s)>-1?D(`status.${s}`):"",u={"status-flag":!0,hidden:!r},g={};return this.width&&(g.width=this.width),C.html`
    <div class="container" style=${(0,F.styleMap)(g)}>
      <div class="cover">
        <div class="cover-image">
          <div
            class="bg-image"
            style="background-image: url(${o});"
          ></div>
        </div>
        <div class=${(0,I.classMap)(u)}>${r}</div>
      </div>
      <div class="roadmap-container">
        <div class="roadmap-content">
          <div class="roadmap">
            <img
              class="image" 
              alt="roadmap"
              src=${`data:image/svg+xml;utf8,${encodeURIComponent(i)}`}
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <div class=${(0,I.classMap)({"maintence-container":!0,hidden:!a})}>
        <div class="icon"><img class="image" src=${H}></img></div>
        <div class="text">${D("common.state.maintenance")}</div>
      </div>
      ${this.renderFooter()}
      <div class=${(0,I.classMap)({"maintence-cover":!0,hidden:!a})}></div>
    </div>`}};d.styles=C.css`
    .container {
      position: relative;
      width: 9.75rem;
      height: auto;
      background: #0e1328;
      border-radius: 0.25rem;
    }

    .cover {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 55.128%;
    }

    .cover-image {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: black;
    }

    .bg-image {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: inherit;
      background-repeat: no-repeat;
      background-position: top center;
      background-size: 130% 130%;
    }

    .status-flag {
      position: absolute;
      left: 50%;
      bottom: 0.25rem;
      background: #0e121e99;
      padding: 0.375rem 1rem;
      font-size: 12px;
      line-height: 16px;
      color: white;
      border-radius: 0.375rem;
      transform: translateX(-50%);
      font-weight: 700;
    }

    we-countdown-timer {
      position: absolute;
      top: 0.5rem;
      left: 0.5rem;
      width: 1.5rem;
      height: 1.5rem;
    }

    .roadmap-container {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 42.3077%;
      display: flex;
      align-items: center;
      background: white;
    }

    .roadmap-content {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 0.1875rem;
    }

    .roadmap {
      width: 100%;
      height: 100%;
    }

    .bet-pool-bar {
      width: 100%;
      height: 0.125rem;
      display: flex;
      flex-direction: row;
      background-color: rgba(255, 255, 255, 0.1);
    }

    .bet-pool-bar-player {
      height: 100%;
      border-bottom-left-radius: 0.125rem;
      border-top-left-radius: 0.125rem;
      background-color: #1468dc;
    }

    .bet-pool-bar-banker {
      height: 100%;
      border-bottom-right-radius: 0.125rem;
      border-top-right-radius: 0.125rem;
      background-color: #d92d20;
      margin-left: 0.125rem;
    }

    .footer {
      display: flex;
      flex-direction: column;
      background: #0e1328;
      padding: 0.25rem;
    }

    .game-name-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .game-name {
      color: white;
      font-size: 0.875rem;
      line-height: 1.25rem;
    }

    .maintence-container {
      width: 100%;
      height: 4.7rem;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      z-index: 1;
    }

    .icon {
      width: 1.25rem;
      height: 1.25rem;
    }

    .image {
      width: 100%;
      height: 100%;
    }

    .text {
      margin-top: 0.375rem;
      font-size: 0.75rem;
      color: #bb7eff;
    }

    .maintence-cover {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 0.25rem;
      background-color: rgba(14, 18, 30, 0.6);
    }

    .hidden {
      display: none;
    }
  `,c([(0,f.property)()],d.prototype,"gameCode",2),c([(0,f.property)({attribute:"footer-padding"})],d.prototype,"footerPadding",2),c([(0,f.property)({attribute:"footer-color"})],d.prototype,"footerColor",2),c([(0,f.property)({attribute:"footer-background"})],d.prototype,"footerBackground",2),c([(0,f.property)({attribute:"width"})],d.prototype,"width",2),c([(0,f.property)({attribute:"with-footer"})],d.prototype,"withFooter",2),c([(0,f.property)()],d.prototype,"title",2),d=c([(0,f.customElement)("we-game-preview")],d);0&&(module.exports={WeClient,WeGamePreview,WeSpacer});
//# sourceMappingURL=index.cjs.map