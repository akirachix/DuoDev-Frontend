if(!self.define){let e,s={};const t=(t,a)=>(t=new URL(t+".js",a).href,s[t]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=s,document.head.appendChild(e)}else e=t,importScripts(t),s()})).then((()=>{let e=s[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(a,n)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let c={};const r=e=>t(e,i),d={module:{uri:i},exports:c,require:r};s[i]=Promise.all(a.map((e=>d[e]||r(e)))).then((e=>(n(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"7ed6140a7baa932e9e3d7ce0a3f80857"},{url:"/_next/static/chunks/138-425185afe98b9ad2.js",revision:"kX09Uj43-XYtdZRdPV-O2"},{url:"/_next/static/chunks/173-d85d8bdae0aeaff4.js",revision:"kX09Uj43-XYtdZRdPV-O2"},{url:"/_next/static/chunks/23-d53d442a41c0cbac.js",revision:"kX09Uj43-XYtdZRdPV-O2"},{url:"/_next/static/chunks/311-2567289a43c89aad.js",revision:"kX09Uj43-XYtdZRdPV-O2"},{url:"/_next/static/chunks/53c13509-92796e0f209f3628.js",revision:"kX09Uj43-XYtdZRdPV-O2"},{url:"/_next/static/chunks/789-08f9e03d690f0875.js",revision:"kX09Uj43-XYtdZRdPV-O2"},{url:"/_next/static/chunks/8e1d74a4-cd24ba27203a866e.js",revision:"kX09Uj43-XYtdZRdPV-O2"},{url:"/_next/static/chunks/9c4e2130-bdb16daf2d97a43c.js",revision:"kX09Uj43-XYtdZRdPV-O2"},{url:"/_next/static/chunks/app/(public)/layout-b65d1ce45e27ae5a.js",revision:"kX09Uj43-XYtdZRdPV-O2"},{url:"/_next/static/chunks/app/(public)/publicUsers/marketplace/page-8baa9d4bc8368965.js",revision:"kX09Uj43-XYtdZRdPV-O2"},{url:"/_next/static/chunks/app/_not-found/page-0cc4858ce7ae42a0.js",revision:"kX09Uj43-XYtdZRdPV-O2"},{url:"/_next/static/chunks/app/auth/layout-204a4cc4a758eb15.js",revision:"kX09Uj43-XYtdZRdPV-O2"},{url:"/_next/static/chunks/app/auth/role/page-e7f1d1921f8af0f9.js",revision:"kX09Uj43-XYtdZRdPV-O2"},{url:"/_next/static/chunks/app/auth/signIn/page-4e4bd2be386a6ac6.js",revision:"kX09Uj43-XYtdZRdPV-O2"},{url:"/_next/static/chunks/app/auth/signUp/page-67ab2515098bf58f.js",revision:"kX09Uj43-XYtdZRdPV-O2"},{url:"/_next/static/chunks/app/layout-c7dd3a9cf53a1d0c.js",revision:"kX09Uj43-XYtdZRdPV-O2"},{url:"/_next/static/chunks/app/page-c5b72f185b29baca.js",revision:"kX09Uj43-XYtdZRdPV-O2"},{url:"/_next/static/chunks/fc2f6fa8-c4c3fa46e63befc6.js",revision:"kX09Uj43-XYtdZRdPV-O2"},{url:"/_next/static/chunks/fd9d1056-2737f78bfff3f6bf.js",revision:"kX09Uj43-XYtdZRdPV-O2"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"kX09Uj43-XYtdZRdPV-O2"},{url:"/_next/static/chunks/main-app-b7ffc0b0333442c7.js",revision:"kX09Uj43-XYtdZRdPV-O2"},{url:"/_next/static/chunks/main-d9baa905bf5a407f.js",revision:"kX09Uj43-XYtdZRdPV-O2"},{url:"/_next/static/chunks/pages/_app-6a626577ffa902a4.js",revision:"kX09Uj43-XYtdZRdPV-O2"},{url:"/_next/static/chunks/pages/_error-1be831200e60c5c0.js",revision:"kX09Uj43-XYtdZRdPV-O2"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-381e057135e17746.js",revision:"kX09Uj43-XYtdZRdPV-O2"},{url:"/_next/static/css/5a56e3c1761e58ad.css",revision:"5a56e3c1761e58ad"},{url:"/_next/static/css/f14c0949ba782f58.css",revision:"f14c0949ba782f58"},{url:"/_next/static/kX09Uj43-XYtdZRdPV-O2/_buildManifest.js",revision:"2ec694eb52ae4f523f265a46bae4d768"},{url:"/_next/static/kX09Uj43-XYtdZRdPV-O2/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/4473ecc91f70f139-s.p.woff",revision:"78e6fc13ea317b55ab0bd6dc4849c110"},{url:"/_next/static/media/463dafcda517f24f-s.p.woff",revision:"cbeb6d2d96eaa268b4b5beb0b46d9632"},{url:"/logo.jpeg",revision:"33eff28ae453f1360b83fe907d295d0e"},{url:"/logo.png",revision:"aaef5556b1456531622b79185961b211"},{url:"/manifest.json",revision:"9a8255d0ed0140531763c1534e3c5d05"},{url:"/picture2.jpeg",revision:"6acb57874a2c18189528f25ff86c0611"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:t,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
