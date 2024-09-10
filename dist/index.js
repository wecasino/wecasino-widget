var T=Object.defineProperty;var $=Object.getOwnPropertyDescriptor;var d=(s,t,o,a)=>{for(var n=a>1?void 0:a?$(t,o):t,e=s.length-1,i;e>=0;e--)(i=s[e])&&(n=(a?i(t,o,n):i(n))||n);return a&&n&&T(t,o,n),n};import{produce as F}from"immer";import{createStore as L}from"zustand/vanilla";var O=()=>({language:"en",footer:{}}),U=L(s=>({...O(),updateFooterConfig:t=>{s(o=>F(o,a=>{a.footer={...a.footer,...t}}))},setLanguage:t=>{s(o=>F(o,a=>{a.language=t}))}})),p=U;import{produce as w}from"immer";import{createStore as H}from"zustand/vanilla";var P=()=>({gameCodes:[],games:{}}),A=H(s=>({...P(),updateGameCode:t=>{s(o=>w(o,a=>{let n=a.gameCodes.filter(e=>e!==t);a.gameCodes=[...n,t]}))},updateGames:t=>{s(o=>w(o,a=>{let n=t.reduce((e,i)=>i.gameInfo?.gameCode?{...e,[i.gameInfo?.gameCode]:i}:e,{});a.games={...a.games,...n}}))},updateGameInfos:t=>{s(o=>w(o,a=>{let n=t.reduce((e,i)=>{let r=i?.gameCode;if(!r)return e;let g={...e[r],gameInfo:i};return{...e,[r]:g}},o.games);a.games={...a.games,...n}}))},updateGameRounds:t=>{s(o=>w(o,a=>{let n=t.reduce((e,i)=>{let r=i?.gameCode;if(!r)return e;let g={...e[r],gameRound:i};return{...e,[r]:g}},o.games);a.games={...a.games,...n}}))}})),f=A;import{sha3_256 as z}from"js-sha3";function G(s,t){let o=`${Date.now().valueOf()}`,a=z.hex(`${t}_${o}`);return`wgs.${s}.${o}_${a}`}var N="wss://uat-weg-gdsapi.wehosts247.com/widgetws",Z="wss://nc-gdsapi.worldonlinegame.com/widgetws",_=class{constructor(t){this._cfg=t}listenGameUpdates(t){console.info("listenGameUpdates",t)}updateFooterConifg(t){p.getState().updateFooterConfig(t)}setLanguage(t){p.getState().setLanguage(t)}connect(){this._connect()}close(){this._close}_close(){this._ws?.close(),this._ws=void 0,this._rcIntv&&clearInterval(this._rcIntv),this._rcIntv=void 0}_connect(){if(this._ws)return;let t=this._cfg.token||G(this._cfg.operCode,this._cfg.appKey),o=this._cfg.dataUrl||(this._cfg.sandbox?N:Z),a=new WebSocket(`${o}?token=${t}`);this._ws=a;let n=this;a.onopen=()=>{n._cfg.onOpen?.(),this._rcIntv&&clearInterval(this._rcIntv),this._rcIntv=void 0},a.onmessage=e=>{e.data&&n._handleData(e.data)},a.onerror=e=>{n._cfg.onError?.(e)},a.onclose=e=>{n._cfg.onClose?.(e),n._cfg.reconnectDelay&&(n._rcIntv=setInterval(()=>{n._close(),n._connect()},n._cfg.reconnectDelay))}}_handleData(t){let o=JSON.parse(t);if(o.gameInfos){let a=o.gameInfos;f.getState().updateGameInfos(a)}if(o.gameRounds){let a=o.gameRounds;f.getState().updateGameRounds(a)}}},K=_;import{LitElement as V,html as j}from"lit";import{customElement as q,property as R}from"lit/decorators.js";var u=class extends V{constructor(){super(...arguments);this.flex=0;this.width="";this.height=""}getSizeStyles(){return this.flex&&this.flex>0?"flex:1;":this.width?`width:${this.width};height:auto;min-height:auto`:`height:${this.height};width:auto;min-width:auto`}render(){let o=this.getSizeStyles();return j`<div style="${o}"></div>`}};d([R({type:Number})],u.prototype,"flex",2),d([R()],u.prototype,"width",2),d([R()],u.prototype,"height",2),u=d([q("we-spacer")],u);import{LitElement as vt,html as x,css as St}from"lit";import{customElement as _t,property as b}from"lit/decorators.js";import{classMap as k}from"lit/directives/class-map.js";import{styleMap as I}from"lit/directives/style-map.js";var B="./maintenance-icon-F3OM3KPW.svg";import{calcBAStats as Y}from"@wegdevio/roadmap-ts-lib";var m={SHUFFLE:"shuffle",NEW_SHOE:"newshoe",START:"start",STOP:"stop",CARD:"card",RESULT:"result",CANCEL:"cancel"},W=s=>[m.NEW_SHOE,m.SHUFFLE].includes(s),X=s=>!s||s.startsWith("http")||s.startsWith("https")?s:`https://${s}`,v=class{set gameCode(t){this._gameCode=t,f.getState().updateGameCode(this._gameCode)}get gameCode(){return this._gameCode}constructor(t){(this.host=t).addController(this)}hostConnected(){}hostDisconnected(){}subScribeConfigstore(){this.host.requestUpdate()}subScribeGametore(){this.host.requestUpdate()}connectStore(){this._unsubConfigStore=p.subscribe(this.subScribeConfigstore.bind(this)),this._unsubGameStore=f.subscribe(this.subScribeGametore.bind(this))}disconnectStore(){this._unsubConfigStore?.(),this._unsubGameStore?.()}get game(){return f.getState().games[this.gameCode]||{}}getGameInfos(){let t=this.game,o=this.getConfig().language,a=t?.gameInfo?.gameDescr?.[o||""]||t?.gameInfo?.gameDescr?.zh||"-",n=Y(t?.gameRound?.accumCards?.slice(-999)||[]),e=t?.gameRound?.roundState||"",i=e===m.RESULT,r=[m.CARD,m.RESULT].includes(e),l=e===m.START,g=this.game?.gameRound?.roundCard||"0,0,0,0,0,0",S=this.game?.gameRound?.accumCards||[],h=t?.gameRound?.gameState,D=X(t?.gameInfo?.gameMeta?.dealerImage||""),C="";e===m.SHUFFLE||e===m.NEW_SHOE?C="new_shoe":e===m.RESULT?C="settling":e===m.STOP||e===m.CARD?C="card_dealing":e===m.START&&(C="betting");let E=h==="maintenance"||h==="disable";return{title:a,stats:n,gameState:h,roundState:e,roundCard:g,accumCards:S,isChangingShoe:W(e),isShowCardResult:r,isShowResult:i,isStart:l,isMaintenance:E,coverImageUrl:D,gameStateFlag:C}}getConfig(){return p.getState()}};import{calcBARoadmap as Q,calcDTRoadmap as tt,plotBeadRoad as jt,plotBegin as et,plotBigRoad as ot,plotEnd as at,plotGrid as qt,plotR234Road as Jt}from"@wegdevio/roadmap-ts-lib";var nt=(s="dark")=>s==="light"?{hasBorder:!0,borderColor:"#BDC6D4",checkerPadding:2,baBeadDotStrokeColor:"#FFFFFF"}:{hasDots:!0,dotColor:"white",dotOpacity:.1,checkerPadding:2,baBeadDotStrokeColor:"#000000"};var M=({cols:s,data:t,gameType:o,backgroundMode:a})=>{let e=50*s,i=50*6,l=(o==="DT"?tt:Q)({data:t,r0MaxCol:s}),g={...nt(a)},S=l.rt1,h=et(e,i,e,i,!1,g);return h+=ot(S,s,6,e,i,0,0,1,g),h+=at(),h};var st={"status.sitting":"Already on this table","status.new_shoe":"Shuffling","status.settling":"Settling","status.card_dealing":"Result","common.state.maintenance":"Under maintenance"},it={"status.sitting":"\u5DF2\u5728\u6B64\u6AAF","status.new_shoe":"\u63DB\u9774\u4E2D","status.settling":"\u7D50\u7B97\u4E2D","status.card_dealing":"\u958B\u724C\u4E2D","common.state.maintenance":"\u7DAD\u8B77\u4E2D"},rt={"status.sitting":"\u5DF2\u5728\u6B64\u53F0","status.new_shoe":"\u6362\u9774\u4E2D","status.settling":"\u7ED3\u7B97\u4E2D","status.card_dealing":"\u5F00\u724C\u4E2D","common.state.maintenance":"\u7EF4\u62A4\u4E2D"},dt={"status.sitting":"Ya en esta mesa","status.new_shoe":"Barajando","status.settling":"Resolviendo","status.card_dealing":"Resultado","common.state.maintenance":"En mantenimiento"},ct={"status.sitting":"Kamu di sini","status.new_shoe":"Mengocok","status.settling":"Pembayaran","status.card_dealing":"Membuka","common.state.maintenance":"Dalam perbaikan"},gt={"status.sitting":"\u0907\u0938 \u091F\u0947\u092C\u0932 \u092A\u0930 \u092A\u0939\u0932\u0947 \u0938\u0947 \u0939\u0940","status.new_shoe":"\u0936\u092B\u0932 \u0915\u0930 \u0930\u0939\u093E \u0939\u0948","status.settling":"\u0938\u0947\u091F\u093F\u0932\u093F\u0902\u0917","status.card_dealing":"\u092A\u0930\u093F\u0923\u093E\u092E","common.state.maintenance":"\u0905\u0902\u0924\u0930\u094D\u0935\u093E\u0930\u094D\u0924\u093E \u092E\u0947\u0902"},mt={"status.sitting":"\u65E2\u306B\u3053\u306E\u30C6\u30FC\u30D6\u30EB\u3067","status.new_shoe":"\u30B7\u30E3\u30C3\u30D5\u30EB\u4E2D","status.settling":"\u6C7A\u6E08\u4E2D","status.card_dealing":"\u7D50\u679C","common.state.maintenance":"\u30E1\u30F3\u30C6\u30CA\u30F3\u30B9\u4E2D"},lt={"status.sitting":"\uC774\uBBF8 \uCC45\uC0C1\uC5D0 \uC62C\uB824\uC838 \uC788\uC74C","status.new_shoe":"\uC154\uD50C\uC911","status.settling":"\uC815\uC0B0\uC911","status.card_dealing":"\uACB0\uACFC","common.state.maintenance":"\uC810\uAC80\uC911"},ut={"status.sitting":"\u1012\u102E\u1005\u102C\u1038\u1015\u103D\u1032\u1015\u1031\u102B\u103A \u101B\u1031\u102C\u1000\u103A\u1014\u1031\u1015\u103C\u102E","status.new_shoe":"\u101B\u103E\u1015\u103A\u101B\u103E\u1015\u103A","status.settling":"\u1016\u103C\u1031\u101B\u103E\u1004\u103A\u1038\u1015\u102B","status.card_dealing":"\u101B\u101C\u1012\u103A","common.state.maintenance":"\u1019\u102D\u1014\u103A\u1010\u102D\u1014\u103A\u1014\u1000\u103A"},pt={"status.sitting":"J\xE1 nesta mesa","status.new_shoe":"Embaralhando","status.settling":"Liquida\xE7\xE3o","status.card_dealing":"Resultado","common.state.maintenance":"Manuten\xE7\xE3o"},ht={"status.sitting":"\u0E04\u0E38\u0E13\u0E2D\u0E22\u0E39\u0E48\u0E42\u0E15\u0E4A\u0E30\u0E19\u0E35\u0E49","status.new_shoe":"\u0E01\u0E33\u0E25\u0E31\u0E07\u0E2A\u0E31\u0E1A\u0E44\u0E1E\u0E48","status.settling":"\u0E01\u0E33\u0E25\u0E31\u0E07\u0E0A\u0E33\u0E23\u0E30","status.card_dealing":"\u0E01\u0E33\u0E25\u0E31\u0E07\u0E40\u0E1B\u0E34\u0E14\u0E44\u0E1E\u0E48","common.state.maintenance":"\u0E04\u0E38\u0E13\u0E2D\u0E22\u0E39\u0E48\u0E42\u0E15\u0E4A\u0E30\u0E19\u0E35\u0E49"},ft={"status.sitting":"Nasa mesa na ito","status.new_shoe":"Binabalasa","status.settling":"Inaayos","status.card_dealing":"Resulta","common.state.maintenance":"Isinasaayos pa"},bt={"status.sitting":"Bu Masada Zaten Var","status.new_shoe":"Kar\u0131\u015Ft\u0131rma","status.settling":"Yerle\u015Ftirme","status.card_dealing":"Sonu\xE7","common.state.maintenance":"Bak\u0131mda"},Ct={"status.sitting":"\u0111\xE3 \u1EDF b\xE0n n\xE0y","status.new_shoe":"Thay b\xE0i","status.settling":"\u0110ang thanh to\xE1n","status.card_dealing":"\u0110ang m\u1EDF b\xE0i","common.state.maintenance":"\u0111\xE3 \u1EDF b\xE0n n\xE0y"},wt={en:st,zh:it,cn:rt,es:dt,id:ct,in:gt,ja:mt,ko:lt,my:ut,pt,th:ht,tl:ft,tr:bt,vi:Ct},y=s=>{let t=p.getState().language||"";return wt[t]?.[s]||s};var c=class extends vt{constructor(){super(...arguments);this.gameCode="";this.footerPadding="";this.footerColor="";this.footerBackground="";this.width="";this.withFooter="true";this.title="";this.ctrl=new v(this)}connectedCallback(){super.connectedCallback(),this.ctrl.gameCode=this.gameCode,this.ctrl.connectStore()}disconnectedCallback(){super.disconnectedCallback(),this.ctrl.disconnectStore()}updated(o){o.has("gameCode")&&!o.get("gameCode")&&this.gameCode&&(this.ctrl.gameCode=this.gameCode)}getRoadmapContent({accumCards:o}){return M({cols:15,gameType:"BA",data:o,mode:"standard",backgroundMode:"light"})}renderFooter(){if(!(this.withFooter==="true"))return x``;let{title:a}=this.ctrl.getGameInfos(),n=this.ctrl.getConfig(),e=this.footerBackground||n.footer.backgroundColor||"",i=this.footerColor||n.footer.textColor||"",r={};e&&(r.background=e),this.footerPadding&&(r.padding=this.footerPadding);let l={};i&&(l.color=i);let g=this.title||a;return x`<div class="footer" style=${I(r)}>
      <div class="game-name-container">
        <div class="game-name" style=${I(l)}>
          ${g}
        </div>
      </div>
    </div>`}render(){let{accumCards:o,coverImageUrl:a,gameStateFlag:n,isMaintenance:e}=this.ctrl.getGameInfos(),i=this.getRoadmapContent({accumCards:o}),r=["sitting","new_shoe","settling","card_dealing"].indexOf(n)>-1?y(`status.${n}`):"",l={"status-flag":!0,hidden:!r},g={};return this.width&&(g.width=this.width),x`
    <div class="container" style=${I(g)}>
      <div class="cover">
        <div class="cover-image">
          <div
            class="bg-image"
            style="background-image: url(${a});"
          ></div>
        </div>
        <div class=${k(l)}>${r}</div>
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
      <div class=${k({"maintence-container":!0,hidden:!e})}>
        <div class="icon"><img class="image" src=${B}></img></div>
        <div class="text">${y("common.state.maintenance")}</div>
      </div>
      ${this.renderFooter()}
      <div class=${k({"maintence-cover":!0,hidden:!e})}></div>
    </div>`}};c.styles=St`
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
  `,d([b()],c.prototype,"gameCode",2),d([b({attribute:"footer-padding"})],c.prototype,"footerPadding",2),d([b({attribute:"footer-color"})],c.prototype,"footerColor",2),d([b({attribute:"footer-background"})],c.prototype,"footerBackground",2),d([b({attribute:"width"})],c.prototype,"width",2),d([b({attribute:"with-footer"})],c.prototype,"withFooter",2),d([b()],c.prototype,"title",2),c=d([_t("we-game-preview")],c);export{K as WeClient,c as WeGamePreview,u as WeSpacer};
