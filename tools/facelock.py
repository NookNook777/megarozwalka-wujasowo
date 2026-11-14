#!/usr/bin/env python3
"""Blokada twarzy w arkuszu animacji (generator animacji „pływa” z oczami i fryzurą między klatkami).

    python3 tools/facelock.py arkusz.png --frames 8 [--ref 0] [--rows 26] [--x0 6 --x1 50] [-o wynik.png]

Bierze głowę (wiersze 0..rows, kolumny x0..x1) z klatki referencyjnej, dopasowuje jej położenie
do każdej klatki (przesunięcie ±3 px po sylwetce włosów) i wkleja na wierzch.
Piksele dłoni/rękawiczki bieżącej klatki (zielonkawe + 2 px otoczki) zostają nietknięte,
więc gest zasłaniający twarz (np. buziak) nadal jest widoczny.
"""
import argparse
import numpy as np
from PIL import Image
from scipy import ndimage

def glove(a):
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    return (g > r) & (g > b + 5) & (a[..., 3] > 0)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('sheet'); ap.add_argument('--frames', type=int, required=True)
    ap.add_argument('--ref', type=int, default=0); ap.add_argument('--rows', type=int, default=26)
    ap.add_argument('--x0', type=int, default=6); ap.add_argument('--x1', type=int, default=50)
    ap.add_argument('-o', '--out')
    a = ap.parse_args()
    s = np.array(Image.open(a.sheet).convert('RGBA')).astype(int)
    fw = s.shape[1] // a.frames
    fr = [s[:, i * fw:(i + 1) * fw].copy() for i in range(a.frames)]
    ref = fr[a.ref]; out = []
    for i, f in enumerate(fr):
        if i == a.ref: out.append(f); continue
        best = None
        for dy in range(-3, 4):
            for dx in range(-3, 4):
                sh = np.roll(np.roll(ref, dy, 0), dx, 1)
                d = np.abs(sh[:16, :, :3] - f[:16, :, :3]).sum() + 300 * np.abs((sh[:16, :, 3] > 0).astype(int) - (f[:16, :, 3] > 0)).sum()
                if best is None or d < best[0]: best = (d, dx, dy)
        _, dx, dy = best
        sh = np.roll(np.roll(ref, dy, 0), dx, 1)
        hand = ndimage.binary_dilation(glove(f), iterations=2)
        m = np.zeros(f.shape[:2], bool); m[:a.rows + dy, a.x0:a.x1] = True
        m &= ~hand & ((sh[..., 3] > 0) | (f[..., 3] > 0))
        g = f.copy(); g[m] = sh[m]; out.append(g)
    Image.fromarray(np.concatenate(out, axis=1).astype(np.uint8)).save(a.out or a.sheet)

if __name__ == '__main__':
    main()
