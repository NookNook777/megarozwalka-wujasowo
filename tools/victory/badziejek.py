from surgery import *
src=load('b_idle0.png')
B=(4,3,3);H=(251,166,135);J=(212,105,87);K=(235,140,116);I=(109,35,27);M=(149,60,47);S=(57,60,70);P=(95,99,109);O=(187,188,194);Q=(126,126,126)
SKIN={H,J,K}
def build(lift=0):
    out=src.copy()
    erase(out,src,(51,65,62,72),SKIN,lambda x,y: rgba(S) if y<=66 else None)
    prune_outline(out,(49,64,64,73),B)
    # forearm out to the right under the chin, a bit upward
    arm(out,(54,62),(68,61),H,J,B,w=3)
    PHONE=["BBBBB",
           "BPPPB",
           "BOOOB",
           "BOOOB",
           "BOOOB",
           "BPPPB",
           "BBBBB"]
    HAND=[".BBBB.",
          "BHHHHB",
          "BHHHJB",
          "BHHJJB",
          "BJJJJB",
          ".BBBB."]
    pal={'B':B,'P':P,'O':O,'H':H,'J':J}
    stamp(out,PHONE,70,48-lift,pal)
    stamp(out,HAND,68,55-lift,pal)
    return out
frames=[build(0),build(0),build(1),build(1)]
import json;print(json.dumps(sheet(frames,'b_victory.png')))
