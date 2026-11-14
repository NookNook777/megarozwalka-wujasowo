from PIL import Image
import numpy as np, sys
f=np.array(Image.open(__import__('sys').argv[1] if len(__import__('sys').argv)>1 else 'idle0.png').convert('RGBA')).astype(int)
P={'F':(3,2,3),'C':(247,183,145),'E':(224,146,114),'G':(211,127,99),'D':(177,103,81),'L':(35,35,42),'N':(59,60,36),'O':(81,81,52),'P':(46,45,30),'B':(96,52,36),'K':(126,68,52),'M':(152,90,67),'T':(55,56,62),'H':(28,16,13)}
def col(c):return np.array(list(P[c])+[255])
skinlike={P[k] for k in 'CEGDMKNOP'}
def build(handdx=0,handdy=0,smirk=True):
    out=f.copy()
    for y in range(52,64):
        for x in range(44,63):
            p=tuple(f[y,x,:3])
            if f[y,x,3] and p in skinlike:
                if x<=47: out[y,x]=col('L')
                elif y>=60: out[y,x]=col('T')   # fingers wrapped on the handle -> handle metal
                else: out[y,x]=[0,0,0,0]
            if y>=61 and x>=52 and f[y,x,3] and tuple(f[y,x,:3]) in (P['H'],(60,29,22)): out[y,x]=col('T')
    for _ in range(3):
        for y in range(50,62):
            for x in range(46,64):
                if out[y,x,3] and tuple(out[y,x,:3])==P['F']:
                    nb=[out[yy,xx] for yy,xx in ((y-1,x),(y+1,x),(y,x-1),(y,x+1))]
                    if not any(n[3] and tuple(n[:3])!=P['F'] for n in nb): out[y,x]=[0,0,0,0]
    def put(x,y,c):out[y,x]=col(c)
    # forearm elbow -> wrist, outlined
    x0,y0=45,53;x1,y1=58+handdx,48+handdy
    n=max(abs(x1-x0),abs(y1-y0));pts=[(round(x0+(x1-x0)*t/n),round(y0+(y1-y0)*t/n)) for t in range(n+1)]
    for x,y in pts:
        for dy in (-2,3):
            if out[y+dy,x,3]==0:put(x,y+dy,'F')
    for x,y in pts:
        put(x,y-1,'C');put(x,y,'C');put(x,y+1,'C');put(x,y+2,'E')
    HAND=["...F...",
          "..FCF..",
          "..FCF..",
          "..FCF..",
          "..FCF..",
          "FFFCFFF",
          "FCFEFCF",
          "FECCCEF",
          "FNOOOOF",
          "FNOOONF",
          ".FNNNF."]
    hx,hy=56+handdx,37+handdy
    for r,row in enumerate(HAND):
        for c,ch in enumerate(row):
            if ch!='.':put(hx+c,hy+r,ch)
    if smirk:
        out[45,47]=col('E');out[45,48]=col('K');out[45,49]=col('B');out[44,50]=col('B')
        # half-lidded, nasty look: upper lid drops one row
        for x in range(44,49):
            if tuple(f[39,x,:3])==(203,209,214) or tuple(f[39,x,:3])==P['F']: out[39,x]=col('F')
    return out
if __name__=='__main__':
    o=build();Image.fromarray(o.astype(np.uint8)).save('pose0.png')
