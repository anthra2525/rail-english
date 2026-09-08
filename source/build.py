"""Build a self-contained HTML preview and an installable PWA without npm."""
from pathlib import Path
import json
from PIL import Image, ImageDraw
ROOT=Path(__file__).parent
for size,name in [(192,'icon-192.png'),(512,'icon-512.png'),(180,'apple-touch-icon.png')]:
    scale=4;im=Image.new('RGB',(size*scale,size*scale),'#087e83');d=ImageDraw.Draw(im);k=size*scale/512
    def box(b):return tuple(round(v*k) for v in b)
    def line(points,fill,width): d.line([(round(x*k),round(y*k)) for x,y in points],fill=fill,width=max(1,round(width*k)))
    d.rounded_rectangle(box((143,111,369,359)),radius=round(43*k),fill='#ffffff')
    d.rounded_rectangle(box((168,160,344,251)),radius=round(17*k),fill='#087e83')
    line([(231,137),(280,137)],'#087e83',9)
    for cx in [190,322]:d.ellipse(box((cx-12,295,cx+12,319)),fill='#087e83')
    line([(190,351),(165,394)],'#ffffff',15);line([(322,351),(347,394)],'#ffffff',15)
    im.resize((size,size),Image.Resampling.LANCZOS).save(ROOT/'icons'/name)
css=(ROOT/'styles.css').read_text()
js=(ROOT/'app.js').read_text()
pack=json.loads((ROOT/'questions.json').read_text())
data=json.dumps(pack,ensure_ascii=False,separators=(',',':')).replace('<','\\u003c')
html='''<!doctype html>
<html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#f5f7f9"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="default"><meta name="apple-mobile-web-app-title" content="Rail English"><meta name="description" content="730点から800点台へ。オフラインで続ける、通勤時間の英語学習。"><meta name="color-scheme" content="light"><meta name="referrer" content="no-referrer"><title>Rail English — 730から800点台へ</title><link rel="manifest" href="./manifest.webmanifest"><link rel="icon" type="image/png" href="./icons/icon-192.png"><link rel="apple-touch-icon" href="./icons/apple-touch-icon.png"><style>''' +css+'''</style></head><body><div class="hidden storage-warning" id="storage-warning" role="alert"></div><div class="app"><header class="topbar"><a class="brand" href="#" data-action="nav" data-route="home" aria-label="Rail English ホーム"><span class="brand-logo"></span><span>Rail English<small>LEARN ON THE MOVE</small></span></a><div class="top-tools"><button class="offline-pill" id="offline-status" data-action="nav" data-route="settings" aria-label="オフラインの保存状態と設定"><span class="dot"></span>準備中</button><span class="version">v1.0</span></div></header><main id="main" tabindex="-1"></main><noscript><p>学習画面を表示するには、ブラウザーでJavaScriptを有効にしてください。</p></noscript></div><nav id="bottom-nav" class="bottom-nav" aria-label="メインメニュー"></nav><div id="toast" class="toast hidden" role="status" aria-live="polite"></div><script type="application/json" id="question-data">'''+data+'''</script><script>'''+js+'''</script></body></html>'''
(ROOT/'index.html').write_text(html,encoding='utf-8')
print(f'Built index.html: {len(html.encode()):,} bytes')
