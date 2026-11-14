from surgery import *
src=load('m_idle0.png')
C=(4,3,3);E=(242,164,124);F=(192,107,83);D=(206,124,94);I=(165,94,73);H=(127,72,56);L=(86,48,37);K=(251,250,249);G=(57,58,71)
SKIN={E,F,D,I,H,L}
def build(lift=0):
    out=src.copy()
    erase(out,src,(55,56,64,70),SKIN,lambda x,y: rgba(G) if 62<=y<=65 else None)
    prune_outline(out,(52,54,66,71),C)
    CUP=["CCCCCC",
         "CKKKKC",
         "CKKKKC",
         ".CKKC.",
         "..CC.."]
    HAND=["...C",
          "CCCE",
          "CEEC",
          "CEEC",
          "CFEC",
          ".CC."]
    pal={'C':C,'K':K,'E':E,'F':F}
    arm(out,(57,57),(58,47-lift),E,F,C,w=3)
    stamp(out,HAND,58,41-lift,pal)       # hand + raised pinky
    stamp(out,CUP,53,42-lift,pal)        # cup at the lips
    # eyes closed (blissful): whites -> skin, lid line
    for y in range(34,41):
        for x in range(44,60):
            if tuple(src[y,x,:3])==K:out[y,x]=rgba(E)
    out[38,46]=rgba(H);out[38,47]=rgba(H);out[38,48]=rgba(H)
    return out
frames=[build(0),build(0),build(1),build(1)]
import json;print(json.dumps(sheet(frames,'m_victory.png')))
