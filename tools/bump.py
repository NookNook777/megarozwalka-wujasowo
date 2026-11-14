#!/usr/bin/env python3
"""Podbija numer wersji widoczny w prawym dolnym rogu ekranu tytułowego.

    python3 tools/bump.py            -> pokazuje obecną wersję
    python3 tools/bump.py patch      -> 0.12.0 -> 0.12.1
    python3 tools/bump.py minor      -> 0.12.0 -> 0.13.0
    python3 tools/bump.py 1.0.0      -> ustawia dokładnie
Pamiętaj o wpisie w CHANGELOG.md.
"""
import pathlib, re, sys
f = pathlib.Path(__file__).resolve().parent.parent / 'index.html'
s = f.read_text(encoding='utf-8')
m = re.search(r'<div id="ver">v(\d+)\.(\d+)\.(\d+)</div>', s)
cur = tuple(map(int, m.groups()))
if len(sys.argv) < 2:
    print('v%d.%d.%d' % cur); sys.exit()
a = sys.argv[1]
new = {'patch': (cur[0], cur[1], cur[2] + 1), 'minor': (cur[0], cur[1] + 1, 0),
       'major': (cur[0] + 1, 0, 0)}.get(a) or tuple(map(int, a.lstrip('v').split('.')))
f.write_text(s.replace(m.group(0), '<div id="ver">v%d.%d.%d</div>' % new), encoding='utf-8')
print('v%d.%d.%d -> v%d.%d.%d' % (cur + new))
