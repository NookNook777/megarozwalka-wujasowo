#!/usr/bin/env python3
"""Buduje jeden samodzielny plik HTML z wersji deweloperskiej.

    python3 tools/build.py            -> dist/index.html
    python3 tools/build.py out.html   -> out.html

Wkleja src/style.css, wszystkie src/*.js (w kolejności z index.html)
i zamienia ścieżki "assets/..." w src/data.js na data-URI (base64).
Bez zależności poza biblioteką standardową Pythona.
"""
import base64, mimetypes, pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
mimetypes.add_type('image/webp', '.webp')

def data_uri(rel):
    p = ROOT / rel
    mime = mimetypes.guess_type(p.name)[0] or 'application/octet-stream'
    return f'data:{mime};base64,' + base64.b64encode(p.read_bytes()).decode()

def inline_assets(js):
    return re.sub(r'"(assets/[^"]+)"', lambda m: '"' + data_uri(m.group(1)) + '"', js)

def main():
    out = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / 'dist' / 'index.html'
    html = (ROOT / 'index.html').read_text(encoding='utf-8')

    def css(m):
        return '<style>\n' + (ROOT / m.group(1)).read_text(encoding='utf-8') + '</style>'
    html = re.sub(r'<link rel="stylesheet" href="([^"]+)">', css, html)

    def script(m):
        src = m.group(1)
        js = (ROOT / src).read_text(encoding='utf-8')
        if src.endswith('data.js'):
            js = inline_assets(js)
        return f'<script>/* {src} */\n' + js.replace('</script', '<\\/script') + '</script>'
    html = re.sub(r'<script src="([^"]+)"></script>', script, html)
    html = re.sub(r'<!-- kolejność.*?-->\n', '', html)

    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(html, encoding='utf-8')
    print(f'{out}  ({out.stat().st_size/1024/1024:.2f} MB)')

if __name__ == '__main__':
    main()
