(this.webpackJsonptheia=this.webpackJsonptheia||[]).push([[0],{14:function(e,t,n){},16:function(e,t,n){},19:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n.n(r),c=n(8),o=n.n(c),s=(n(14),n(2)),u=n.n(s),l=n(4),i=n(9),f=n(3),p=(n.p,n(16),[{label:"Yieldwatch (BSC)",method:function(e){return j.apply(this,arguments)}},{label:"Kraken",value:m},{label:"Binance",value:m}]);function d(e){return b.apply(this,arguments)}function b(){return(b=Object(l.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(void 0!=(n=p.find((function(e){return e.label==t.type})))){e.next=4;break}throw console.log("ERROR FETCH FROM UNDEFINED ",t),"Error undefined source";case 4:return e.next=6,n.method(t.key);case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function j(){return(j=Object(l.a)(u.a.mark((function e(t){var n,r,a,c,o,s;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("YieldWatch fetching"),n=["beefy","pancake","auto","bunny"].join(","),e.next=5,fetch("https://www.yieldwatch.net/api/all/".concat(t,"?platforms=").concat(n));case 5:return r=e.sent,e.next=8,r.json();case 8:if("0"!=(a=e.sent).status){e.next=11;break}throw"Invalid request (maybe invalid address?";case 11:return c=a.result,s={bunny:[o=function(e){return c[e].vaults.vaults.map((function(t){var n=t.priceInUSDDepositToken,r=t.priceInUSDRewardToken,a=n*t.currentTokens+r*t.pendingRewards;return{platform:e,token:t.depositToken.toLowerCase(),usd:a}}))},function(e){return c[e].staking.vaults.map((function(t){var n=t.priceInUSDDepositToken*(t.depositedTokens+t.pendingRewards);return{platform:e,token:t.depositToken,usd:n}}))}],Autofarm:[o]},e.abrupt("return",Object.entries(s).map((function(e){var t=Object(f.a)(e,2),n=t[0];return t[1].map((function(e){return e(n)})).flat()})).flat());case 16:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function m(){return h.apply(this,arguments)}function h(){return(h=Object(l.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("NOT IMPLEMENTED YET"),e.abrupt("return",[]);case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var v=n(0),O=function(e,t){return e.type==t.type&&e.key==t.key},g=function(e,t){return{type:e,key:t}},E=g("","");function y(e){var t=e.entry,n=e.onSubmit,a=e.onDelete,c=function(){return void 0==t||""==t.type?(console.log("DEFAULT VALUE EMPTY ",t," => replace by ",p[0].label),p[0].label):t.type},o=Object(r.useState)(c()),s=Object(f.a)(o,2),u=s[0],l=s[1],i=Object(r.useState)(t.key),d=Object(f.a)(i,2),b=d[0],j=d[1],m=function(){return g(u,b)};console.log("NEW RENDER : type",u,c(),t);var h=O(t,E)?"Add Source":"Update";return Object(v.jsx)("div",{className:"row",children:Object(v.jsx)("form",{className:"form-inline well",role:"form",onSubmit:function(e){e.preventDefault();var r=m();console.log("OLD ENTRY ",t," => NEW ENTRY (type",u,") : ",r),n(t,r),l(""),j("")},children:Object(v.jsxs)("div",{className:"form-group",children:[Object(v.jsx)("label",{className:"col-md-1",children:"Source"}),Object(v.jsx)("select",{className:"form-control col-md-3",value:u,defaultValue:p[0].label,onChange:function(e){return l(e.target.value)},children:p.map((function(e){return Object(v.jsx)("option",{value:e.label,children:e.label.toUpperCase()})}))}),Object(v.jsx)("input",{value:b,onChange:function(e){return j(e.target.value)},type:"text",size:"50",className:"form-control col-md-5 col-md-offset-4",placeholder:"Enter API / Public key"}),Object(v.jsx)("button",{className:"btn btn-primary col-md-2",children:h}),Object(v.jsx)("button",{type:"button",onClick:function(){return a(m())},className:"close col-md-1","aria-label":"Delete",children:Object(v.jsx)("span",{"aria-hidden":"true",children:"\xd7"})})]})})})}var x="sources";function N(e){var t=e.newConfigCallback,n=Object(r.useState)([]),a=Object(f.a)(n,2),c=a[0],o=a[1];Object(r.useEffect)((function(){var e=localStorage.getItem(x),t=JSON.parse(e);t&&(console.log("LOADED entries from storage ",t),o(t))}),[]),Object(r.useEffect)((function(){var e=JSON.stringify(c);localStorage.setItem(x,e),t(c),console.log("SAVED entries to storage",c)}),[c]);var s=function(){var e=Object(i.a)(c);o(e)},u=function(e,t){var n=c.findIndex((function(t){return O(e,t)}));-1!=n?c[n]=t:(c.push(t),console.log("INSERTING new entry at ",n," => ",c)),s()},l=function(e){console.log("DELETE ENTRY ",e," ON ",c);var t=c.findIndex((function(t){return O(e,t)}));-1!=t&&(c.splice(t,1),console.log("DELETE ENTRY NEW STATE",c),s())};return console.log("ENTRIES SIZE: ",c.length," ==> ",c),Object(v.jsxs)("div",{className:"Config",children:[c.map((function(e){return Object(v.jsx)(y,{entry:e,onSubmit:u,onDelete:l},JSON.stringify(e))})),Object(v.jsx)(y,{entry:E,onSubmit:u,onDelete:l},JSON.stringify(E))]})}var S="results";function k(e){var t=e.results.reduce((function(e,t){return e+t.usd}),0);return Object(v.jsxs)("div",{children:["You got ",t.toFixed(2)," dollars in there !"]})}var T=function(){var e=Object(r.useState)([]),t=Object(f.a)(e,2),n=t[0],a=t[1];return Object(r.useEffect)((function(){var e=localStorage.getItem(S),t=JSON.parse(e);t&&a(t)}),[]),Object(r.useEffect)((function(){var e=JSON.stringify(n);localStorage.setItem(S,e)}),[n]),Object(v.jsx)("div",{className:"row",children:Object(v.jsxs)("div",{className:"col-md-8 mx-auto",children:[Object(v.jsx)("header",{className:"App-header",children:Object(v.jsx)("p",{children:"Crypto Summary"})}),Object(v.jsx)(N,{newConfigCallback:function(e){console.log("NEW ENTRIES SETUP: ",e),function(){var t=Object(l.a)(u.a.mark((function t(n){var r;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n=e,c=d,Promise.all(n.map(c));case 2:r=t.sent.flat(),console.log("NEW RESULTS",r),a(r);case 5:case"end":return t.stop()}var n,c}),t)})));return function(e){return t.apply(this,arguments)}}()(e)}}),Object(v.jsx)(k,{results:n})]})})},w=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,21)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,o=t.getTTFB;n(e),r(e),a(e),c(e),o(e)}))};n(18);o.a.render(Object(v.jsx)(a.a.StrictMode,{children:Object(v.jsx)(T,{})}),document.getElementById("root")),w()}},[[19,1,2]]]);
//# sourceMappingURL=main.e79a8e79.chunk.js.map