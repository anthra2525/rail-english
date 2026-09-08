// Deterministic Service Worker tests. Cache/fetch/worker lifecycle are simulated.
// No claim of a real installed-PWA or iPhone offline test is made by this suite.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const ROOT=path.resolve(__dirname,'..');
const SOURCE=fs.readFileSync(path.join(ROOT,'sw.js'),'utf8');
const SCOPE='https://example.test/rail-english/';
let offline=false,networkCalls=0,failPath='';
const result=[];
function pass(s){result.push(s);console.log('PASS',s);}
const stores=new Map();
const keyOf=k=>typeof k==='string'?k:k.url;
async function network(request){
 networkCalls++;if(offline)throw Error('Offline');
 const url=new URL(keyOf(request));
 if(url.pathname.endsWith(failPath)&&failPath)return new Response('Missing',{status:404});
 const rel=url.pathname.replace('/rail-english/','');
 try{return new Response(fs.readFileSync(path.join(ROOT,rel)),{status:200});}
 catch(e){return new Response('Not found',{status:404});}
}
class MockCache{
 constructor(){this.data=new Map();}
 async match(key){const v=this.data.get(keyOf(key));return v?.clone();}
 async put(key,response){this.data.set(keyOf(key),response.clone());}
 async addAll(requests){
  const responses=await Promise.all(requests.map(network));
  if(responses.some(r=>!r.ok))throw Error('Cache addAll failed');
  for(let i=0;i<requests.length;i++)await this.put(requests[i],responses[i]);
 }
}
const caches={async open(name){if(!stores.has(name))stores.set(name,new MockCache());return stores.get(name);},async keys(){return [...stores.keys()];},async delete(name){return stores.delete(name);}};
function worker(source=SOURCE){
 const listeners={};let claimed=false;
 const self={registration:{scope:SCOPE},clients:{claim:async()=>{claimed=true;}},skipWaiting:async()=>{},addEventListener:(name,cb)=>listeners[name]=cb};
 vm.runInNewContext(source,{self,caches,fetch:network,Request,Response,URL,Promise,console});
 return {listeners,claimed:()=>claimed};
}
async function lifecycle(w,name){let job;w.listeners[name]({waitUntil:p=>job=p});await job;}
async function request(w,url,mode='navigate'){
 let response;w.listeners.fetch({request:{url,method:'GET',mode},respondWith:p=>response=p});return response?await response:null;
}
async function check(w){let job,msg;w.listeners.message({data:{type:'CHECK_CACHE'},ports:[{postMessage:data=>msg=data}],waitUntil:p=>job=p});await job;return msg;}
(async()=>{
 const w=worker();await lifecycle(w,'install');
 const cache=await caches.open('rail-english::'+SCOPE+'::1.0.0');
 assert.equal(cache.data.size,5);pass('Initial install caches all five required assets');
 await caches.open('another-application-v1');
 await lifecycle(w,'activate');assert(w.claimed());assert(stores.has('another-application-v1'));pass('Activation claims clients and preserves other application caches');
 assert((await check(w)).ready);pass('Ready status requires all required cached files');
 offline=true;const before=networkCalls;
 let response=await request(w,SCOPE);assert.equal(response.status,200);assert((await response.text()).includes('Rail English'));
 response=await request(w,SCOPE+'index.html?source=homescreen');assert.equal(response.status,200);
 response=await request(w,SCOPE+'icons/icon-192.png','no-cors');assert.equal(response.status,200);
 assert.equal(networkCalls,before);pass('Offline navigation, query strings and icons are served without network calls');
 const restarted=worker();response=await request(restarted,SCOPE);assert.equal(response.status,200);assert((await check(restarted)).ready);pass('Simulated worker cold start uses existing offline cache');
 assert.equal(await request(w,'https://other.test/rail-english/'),null);
 assert.equal(await request(w,'https://example.test/other/'),null);
 assert.equal(await request(w,SCOPE+'unrelated.txt','no-cors'),null);pass('Fetch handling is limited to same-origin app assets and scope');
 cache.data.delete(SCOPE+'icons/icon-192.png');assert.equal((await check(w)).ready,false);pass('Incomplete cache is not falsely reported ready while offline');
 offline=false;assert.equal((await check(w)).ready,true);pass('Missing assets are repaired when the network returns');
 failPath='apple-touch-icon.png';const failed=worker(SOURCE.replace("VERSION='1.0.0'","VERSION='1.0.1'"));
 await assert.rejects(lifecycle(failed,'install'));assert(stores.has('rail-english::'+SCOPE+'::1.0.0'));pass('Failed update install leaves previous release cache intact');
 failPath='';const updated=worker(SOURCE.replace("VERSION='1.0.0'","VERSION='1.0.1'"));
 await lifecycle(updated,'install');await lifecycle(updated,'activate');assert(!stores.has('rail-english::'+SCOPE+'::1.0.0'));assert(stores.has('another-application-v1'));assert((await check(updated)).ready);pass('Successful update deletes only previous cache for this app scope');
 fs.writeFileSync(path.join(__dirname,'sw-results.json'),JSON.stringify({method:'Node VM with simulated Cache API, fetch and worker lifecycle; not actual browser offline mode',passed:result},null,2));
 console.log('ALL SW TESTS PASSED',result.length);
})().catch(e=>{console.error(e);process.exitCode=1;});
