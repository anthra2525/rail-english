const http=require('http'),fs=require('fs'),path=require('path');
const app=path.resolve(process.argv[2]||__dirname),port=Number(process.argv[3]||4173);
const types={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.webmanifest':'application/manifest+json','.png':'image/png','.json':'application/json'};
const server=http.createServer((req,res)=>{
 const name=decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\/rail-english\//,'/');
 const file=path.resolve(app,'.'+(name==='/'?'/index.html':name));
 if(!file.startsWith(app+path.sep)){res.writeHead(403).end();return;}
 fs.readFile(file,(err,data)=>{if(err){res.writeHead(404).end('Not found');return;}res.writeHead(200,{'Content-Type':types[path.extname(file)]||'text/plain','Cache-Control':'no-cache'});res.end(data);});
});
server.listen(port,'127.0.0.1',()=>console.log('Rail English: http://127.0.0.1:'+port+'/rail-english/'));


