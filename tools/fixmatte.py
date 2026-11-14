"""Usuwa szare łaty tła (matte #808080) uwięzione między ręką a bronią w arkuszach animacji."""
from PIL import Image
import numpy as np
from scipy import ndimage
def is_dark(rgb):return rgb.max(-1)<30
def fix_frame(a,band=7,maxsize=40):
    a=a.copy();rgb=a[...,:3].astype(int);al=a[...,3]>0
    dark=al&is_dark(rgb)
    # górna krawędź broni: wiersz z najdłuższym ciągiem ciemnego obrysu w środkowej części klatki
    best=(0,None)
    H,W=al.shape
    for y in range(int(H*.5),int(H*.8)):
        run=m=0
        for x in range(int(W*.35),int(W*.8)):
            run=run+1 if dark[y,x] else 0;m=max(m,run)
        if m>best[0]:best=(m,y)
    if best[0]<8:return a,0
    top=best[1]
    mx=rgb.max(-1);mn=rgb.min(-1)
    gray=al&(mx-mn<16)&(mx>=50)&(mx<190)
    band_m=np.zeros_like(al);band_m[max(0,top-band):top,:]=True
    cand=gray&band_m
    lab,n=ndimage.label(cand);removed=0
    metal=gray&~cand
    for i in range(1,n+1):
        c=lab==i
        if c.sum()>maxsize:continue
        ring=ndimage.binary_dilation(c)&~c
        if (ring&metal).any():continue        # przyklejone do metalu broni powyżej/obok -> to część broni
        if not (ring&(~al|dark)).all() and not ((ring&~al).any() or (ring&dark).sum()>=ring.sum()*0.4):continue
        a[c]=[0,0,0,0];removed+=int(c.sum())
    return a,removed
def fix_sheet(path,fw=96,out=None):
    s=np.array(Image.open(path).convert('RGBA'));n=s.shape[1]//fw;tot=[]
    for i in range(n):
        fr,r=fix_frame(s[:,i*fw:(i+1)*fw]);s[:,i*fw:(i+1)*fw]=fr;tot.append(r)
    Image.fromarray(s).save(out or path);return tot
