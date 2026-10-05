/* One cache per app scope and release; never delete other apps' caches. */
'use strict';
const VERSION='1.2.0';
const PREFIX=`rail-english::${self.registration.scope}::`;
const CACHE_NAME=PREFIX+VERSION;
const ASSETS=['index.html','vocabulary-data.js','vocabulary-core.js','vocabulary-ui.js','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','icons/apple-touch-icon.png'].map(p=>new URL(p,self.registration.scope).href);
const INDEX=ASSETS[0];
self.addEventListener('install',event=>{
 event.waitUntil((async()=>{const cache=await caches.open(CACHE_NAME);await cache.addAll(ASSETS.map(url=>new Request(url,{cache:'reload'})));})());
});
self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{const names=await caches.keys();await Promise.all(names.filter(n=>n.startsWith(PREFIX)&&n!==CACHE_NAME).map(n=>caches.delete(n)));await self.clients.claim();})());
});
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url),scope=new URL(self.registration.scope);
 if(event.request.method!=='GET'||url.origin!==scope.origin||!url.pathname.startsWith(scope.pathname))return;
 const launch=event.request.mode==='navigate'&&(url.pathname===scope.pathname||url.pathname===new URL(INDEX).pathname);
 if(!launch&&!ASSETS.includes(url.origin+url.pathname))return;
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE_NAME);const key=launch?INDEX:url.origin+url.pathname;const saved=await cache.match(key);if(saved)return saved;
  try{const response=await fetch(event.request);if(response.ok)await cache.put(key,response.clone());return response;}
  catch(e){return new Response('オフライン用データがありません。通信できる場所でアプリを一度開いてください。',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});}
 })());
});
self.addEventListener('message',event=>{
 if(event.data?.type==='SKIP_WAITING'){self.skipWaiting();return;}
 if(event.data?.type==='CHECK_CACHE')event.waitUntil((async()=>{
  try{
   const cache=await caches.open(CACHE_NAME);
   const missing=[];for(const url of ASSETS)if(!(await cache.match(url)))missing.push(url);
   if(missing.length){try{await cache.addAll(missing.map(url=>new Request(url,{cache:'reload'})));}catch(e){}}
   const checks=await Promise.all(ASSETS.map(url=>cache.match(url)));
   event.ports[0]?.postMessage({ready:checks.every(Boolean),version:VERSION});
  }catch(e){event.ports[0]?.postMessage({ready:false,version:VERSION});}
 })());
});
