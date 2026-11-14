"""Pozy zwycięstwa robione 'chirurgicznie' na klatce idle (identyczna sylwetka, zmienia się tylko ręka/mimika)."""
from PIL import Image
import numpy as np
def load(p):return np.array(Image.open(p).convert('RGBA')).astype(int)
def rgba(c):return np.array(list(c)+[255])
def line(p0,p1):
    (x0,y0),(x1,y1)=p0,p1;n=max(abs(x1-x0),abs(y1-y0),1)
    return [(round(x0+(x1-x0)*t/n),round(y0+(y1-y0)*t/n)) for t in range(n+1)]
def erase(out,src,box,colors,fill):
    """box=(x0,y0,x1,y1); pixels with color in colors -> fill(x,y) result (rgba or None=transparent)"""
    x0,y0,x1,y1=box
    for y in range(y0,y1):
        for x in range(x0,x1):
            if src[y,x,3] and tuple(src[y,x,:3]) in colors:
                v=fill(x,y);out[y,x]=v if v is not None else [0,0,0,0]
def prune_outline(out,box,OUT):
    x0,y0,x1,y1=box
    for _ in range(3):
        for y in range(y0,y1):
            for x in range(x0,x1):
                if out[y,x,3] and tuple(out[y,x,:3])==OUT:
                    nb=[out[yy,xx] for yy,xx in ((y-1,x),(y+1,x),(y,x-1),(y,x+1))]
                    if not any(n[3] and tuple(n[:3])!=OUT for n in nb):out[y,x]=[0,0,0,0]
def arm(out,p0,p1,skin,shade,OUT,w=3):
    pts=line(p0,p1);horiz=abs(p1[0]-p0[0])>abs(p1[1]-p0[1])
    for x,y in pts:
        for d in (-1,w):
            xx,yy=(x,y+d) if horiz else (x+d,y)
            if out[yy,xx,3]==0:out[yy,xx]=rgba(OUT)
    for x,y in pts:
        for i in range(w):
            xx,yy=(x,y+i) if horiz else (x+i,y)
            out[yy,xx]=rgba(skin if i<w-1 else shade)
def stamp(out,art,x0,y0,pal):
    for r,row in enumerate(art):
        for c,ch in enumerate(row):
            if ch!='.':out[y0+r,x0+c]=rgba(pal[ch])
def sheet(frames,path,pad=1):
    bb=None
    for o in frames:
        b=Image.fromarray(o.astype(np.uint8)).getbbox();bb=b if bb is None else (min(bb[0],b[0]),min(bb[1],b[1]),max(bb[2],b[2]),max(bb[3],b[3]))
    bb=(bb[0]-pad,bb[1]-pad,bb[2]+pad,min(96,bb[3]+pad));fw,fh=bb[2]-bb[0],bb[3]-bb[1]
    s=Image.new('RGBA',(fw*len(frames),fh))
    for i,o in enumerate(frames):s.paste(Image.fromarray(o.astype(np.uint8)).crop(bb),(i*fw,0))
    s.save(path);return dict(fw=fw,fh=fh,n=len(frames),ox=bb[0]-44,oy=bb[1]-95)
