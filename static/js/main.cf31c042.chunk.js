(this.webpackJsonptheia=this.webpackJsonptheia||[]).push([[0],{18:function(e,t,n){},20:function(e,t,n){},29:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n.n(r),c=n(11),o=n.n(c),s=(n(18),n(2)),i=n.n(s),u=n(3),l=n(13),f=n(4),p=n(7),d=(n(20),[{label:"Yieldwatch (BSC)",method:function(e){return m.apply(this,arguments)}},{label:"Filfox (FIL)",method:function(e){return v.apply(this,arguments)}},{label:"Kraken",value:y},{label:"Binance",value:y}]),b=function(e,t,n){return{platform:e.toLowerCase(),token:t.toLowerCase(),usd:n}};function j(e){return h.apply(this,arguments)}function h(){return(h=Object(u.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(void 0!==(n=d.find((function(e){return e.label===t.type})))){e.next=3;break}throw new Error("Error undefined source",t);case 3:return e.next=5,n.method(t.key);case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function m(){return(m=Object(u.a)(i.a.mark((function e(t){var n,r,a,c,o,s;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("YieldWatch fetching"),n=["beefy","pancake","auto","bunny"].join(","),e.next=5,fetch("https://www.yieldwatch.net/api/all/".concat(t,"?platforms=").concat(n));case 5:return r=e.sent,e.next=8,r.json();case 8:if("0"!==(a=e.sent).status){e.next=11;break}throw new Error("Invalid request (maybe invalid address?");case 11:return c=a.result,s={bunny:[o=function(e){return c[e].vaults.vaults.map((function(t){var n=t.priceInUSDDepositToken,r=t.priceInUSDRewardToken,a=n*t.currentTokens+r*t.pendingRewards;return b(e,t.depositToken,a)}))},function(e){return c[e].staking.vaults.map((function(t){var n=t.priceInUSDDepositToken*(t.depositedTokens+t.pendingRewards);return b(e,t.depositToken,n)}))}],Autofarm:[o]},e.abrupt("return",Object.entries(s).map((function(e){var t=Object(f.a)(e,2),n=t[0];return t[1].map((function(e){return e(n)})).flat()})).flat());case 16:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function v(){return(v=Object(u.a)(i.a.mark((function e(t){var n,r,a,c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://filfox.info/api/v1/address/".concat(t));case 2:return n=e.sent,e.next=5,n.json();case 5:if(!(r=e.sent).statusCode){e.next=8;break}throw new Error("Invalid FIL request");case 8:return a=r.balance/Math.pow(10,18),e.next=11,O("filecoin");case 11:return c=e.sent,e.abrupt("return",b("FIL","FIL",a*c));case 13:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function O(e){return x.apply(this,arguments)}function x(){return(x=Object(u.a)(i.a.mark((function e(t){var n,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.coingecko.com/api/v3/coins/".concat(t,"?tickers=true&community_data=false&developer_data=false&sparkline=false"),{headers:{accept:"application/json"}});case 2:return n=e.sent,e.next=5,n.json();case 5:return r=e.sent,e.abrupt("return",r.market_data.current_price.usd);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function y(){return g.apply(this,arguments)}function g(){return(g=Object(u.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("NOT IMPLEMENTED YET"),e.abrupt("return",[]);case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var w=n(12),E=n(0),N=function(e,t){return e.type===t.type&&e.key===t.key},k={type:"",key:""},S=function(e){var t=e.entry,n=e.onChange;return Object(E.jsxs)(E.Fragment,{children:[Object(E.jsx)("label",{className:"col-md-1",children:"Source"}),Object(E.jsx)("select",{className:"form-control col-md-3",value:t.type,defaultValue:d[0].label,onChange:function(e){return n(e.target.value)},children:d.map((function(e){return Object(E.jsx)("option",{value:e.label,children:e.label.toUpperCase()})}))})]})};function I(e){var t=e.entry,n=e.onSubmit,a=e.onDelete,c=Object(r.useState)(function(){var e=Object(p.a)({},t);return void 0!==t&&""!==t.type||(e.type=d[0].label),e}()),o=Object(f.a)(c,2),s=o[0],i=o[1];console.log("NEW RENDER : type",s.type);var u=N(t,k)?"Add Source":"Update";return Object(E.jsx)("div",{className:"row",children:Object(E.jsx)("form",{className:"form-inline well",onSubmit:function(e){e.preventDefault();var r=s;console.log("OLD ENTRY ",t," => NEW ENTRY (type",t.type,") : ",r),n(t,r),i(r("",""))},children:Object(E.jsxs)("div",{className:"form-group",children:[Object(E.jsx)(S,{entry:s,onChange:function(e){s.type=e,i(Object(p.a)({},s))}}),Object(E.jsx)("input",{value:s.key,onChange:function(e){return function(e){s.key=e,i(Object(p.a)({},s))}(e.target.value)},type:"text",size:"50",className:"form-control col-md-5 col-md-offset-4",placeholder:"Enter API / Public key"}),Object(E.jsx)("button",{className:"btn btn-primary col-md-2",children:u}),Object(E.jsx)("button",{type:"button",onClick:function(){return a(t)},className:"close col-md-1","aria-label":"Delete",children:Object(E.jsx)("span",{"aria-hidden":"true",children:"\xd7"})})]})})})}var T="sources";function C(e){var t=e.newConfigCallback,n=Object(r.useState)([]),a=Object(f.a)(n,2),c=a[0],o=a[1];Object(r.useEffect)((function(){var e=localStorage.getItem(T),t=JSON.parse(e);t&&(console.log("LOADED entries from storage ",t),o(t))}),[]),Object(r.useEffect)((function(){var e=JSON.stringify(c);localStorage.setItem(T,e),t(c),console.log("SAVED entries to storage",c)}),[c]);var s=function(){var e=Object(l.a)(c);o(e)},i=function(e,t){var n=c.findIndex((function(t){return N(e,t)}));-1!==n?c[n]=t:(c.push(t),console.log("INSERTING new entry at ",n," => ",c)),s()},u=function(e){console.log("DELETE ENTRY ",e," ON ",c);var t=c.findIndex((function(t){return N(e,t)}));-1!==t&&(c.splice(t,1),console.log("DELETE ENTRY NEW STATE",c),s())};return console.log("ENTRIES SIZE: ",c.length," ==> ",c),Object(E.jsxs)("div",{className:"Config",children:[Object(E.jsx)("div",{className:"row",children:Object(E.jsx)("button",{className:"btc btn-danger",Click:function(){return localStorage.removeItem(T)},children:" Delete Config "})}),Object(E.jsxs)("div",{className:"row",children:[c.map((function(e){return Object(E.jsx)(I,{entry:e,onSubmit:i,onDelete:u},JSON.stringify(e))})),Object(E.jsx)(I,{entry:k,onSubmit:i,onDelete:u},JSON.stringify(k))]})]})}var D="results";function L(e){var t=e.results,n=t.reduce((function(e,t){return e+t.usd}),0);return Object(E.jsxs)("div",{children:[Object(E.jsxs)("div",{className:"row",children:["You got ",n.toFixed(2)," dollars in there !"]}),Object(E.jsxs)("div",{className:"row",children:[Object(E.jsx)(w.CSVLink,{data:t,children:"Download CSV results"}),";"]})]})}var R=function(){var e=Object(r.useState)([]),t=Object(f.a)(e,2),n=t[0],a=t[1];return Object(r.useEffect)((function(){var e=localStorage.getItem(D),t=JSON.parse(e);t&&a(t)}),[]),Object(r.useEffect)((function(){var e=JSON.stringify(n);localStorage.setItem(D,e)}),[n]),Object(E.jsx)("div",{className:"row",children:Object(E.jsxs)("div",{className:"col-md-8 mx-auto",children:[Object(E.jsx)("header",{className:"App-header",children:Object(E.jsx)("p",{children:"Crypto Summary"})}),Object(E.jsx)(C,{newConfigCallback:function(e){console.log("NEW ENTRIES SETUP: ",e),function(){var t=Object(u.a)(i.a.mark((function t(n){var r;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n=e,c=j,Promise.all(n.map(c));case 2:r=t.sent.flat(),console.log("NEW RESULTS",r),a(r);case 5:case"end":return t.stop()}var n,c}),t)})));return function(e){return t.apply(this,arguments)}}()(e)}}),Object(E.jsx)(L,{results:n})]})})},F=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,30)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,o=t.getTTFB;n(e),r(e),a(e),c(e),o(e)}))};n(28);o.a.render(Object(E.jsx)(a.a.StrictMode,{children:Object(E.jsx)(R,{})}),document.getElementById("root")),F()}},[[29,1,2]]]);
//# sourceMappingURL=main.cf31c042.chunk.js.map