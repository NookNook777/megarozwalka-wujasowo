'use strict';
/* Manifest zasobów: ścieżki do grafik + metadane klatek.
   tools/build.py zamienia ścieżki na data-URI przy budowaniu jednego pliku HTML. */
const A={
 "far": "assets/level/far.webp",
 "wall": "assets/level/wall.webp",
 "wall2": "assets/level/wall2.webp",
 "wall3": "assets/level/wall3.webp",
 "lodz": {"far": "assets/level/lodz/far.webp", "a1": "assets/level/lodz/a1.webp", "a2": "assets/level/lodz/a2.webp", "a3": "assets/level/lodz/a3.webp", "a4": "assets/level/lodz/a4.webp", "b1": "assets/level/lodz/b1.webp", "b2": "assets/level/lodz/b2.webp", "c1": "assets/level/lodz/c1.webp", "c2": "assets/level/lodz/c2.webp"},
 "farma": {"far":"assets/level/farma/far.webp","a1":"assets/level/farma/a1.webp","a2":"assets/level/farma/a2.webp","b1":"assets/level/farma/b1.webp","b2":"assets/level/farma/b2.webp","c1":"assets/level/farma/c1.webp","c2":"assets/level/farma/c2.webp"},
 "tiles": "assets/level/tiles.png",
 "plat": "assets/level/platform.png",
 "propsL": {"toksyk": "assets/props/lodz/toksyk.png", "robot": "assets/props/lodz/robot.png", "automat": "assets/props/lodz/automat.png", "auto": "assets/props/lodz/auto.png", "holo": "assets/props/lodz/holo.png", "smieci": "assets/props/lodz/smieci.png", "hulajnoga": "assets/props/lodz/hulajnoga.png", "serwery": "assets/props/lodz/serwery.png", "wozek": "assets/props/lodz/wozek.png", "wlaz": "assets/props/lodz/wlaz.png", "strzalka": "assets/props/lodz/strzalka.png", "kosz": "assets/props/lodz/kosz.png", "sciek": "assets/props/lodz/sciek.png", "plat_hover": "assets/props/lodz/plat_hover.png", "plat_rusztowanie": "assets/props/lodz/plat_rusztowanie.png", "plat_skrzynie": "assets/props/lodz/plat_skrzynie.png", "plat_klimy": "assets/props/lodz/plat_klimy.png"},
 "propsF": {"kapusta": "assets/props/farma/kapusta.png", "ul": "assets/props/farma/ul.png", "tv": "assets/props/farma/tv.png", "strach": "assets/props/farma/strach.png", "krasnal": "assets/props/farma/krasnal.png", "labedz": "assets/props/farma/labedz.png", "wanna": "assets/props/farma/wanna.png", "butla": "assets/props/farma/butla.png", "gasior": "assets/props/farma/gasior.png", "buda": "assets/props/farma/buda.png", "rower": "assets/props/farma/rower.png", "wiadro": "assets/props/farma/wiadro.png", "placek1": "assets/props/farma/placek1.png", "placek2": "assets/props/farma/placek2.png", "placek3": "assets/props/farma/placek3.png", "plat_siano": "assets/props/farma/plat_siano.png", "plat_palety": "assets/props/farma/plat_palety.png", "gnojowka": "assets/props/farma/gnojowka.png", "bryzg": "assets/props/farma/bryzg.png", "bryzg2": "assets/props/farma/bryzg2.png", "babel": "assets/props/farma/babel.png", "babel_pek": "assets/props/farma/babel_pek.png", "smrod": "assets/props/farma/smrod.png"},
 "props": {
  "slimebarrel": "assets/props/slimebarrel.png",
  "car": "assets/props/car.png",
  "tires": "assets/props/tires.png",
  "cabinet": "assets/props/cabinet.png",
  "can": "assets/props/can.png",
  "shelf": "assets/props/shelf.png",
  "rubble": "assets/props/rubble.png",
  "pallet": "assets/props/pallet.png",
  "barrel": "assets/props/barrel.png"
 },
 "boss": "assets/boss/brs_static.png",
 "FW": 96,
 "heroes": {
  "b": {
   "meta": {
    "idle": {
     "n": 8,
     "muz": [
      [
       72,
       64
      ],
      [
       72,
       64
      ],
      [
       71,
       64
      ],
      [
       71,
       64
      ],
      [
       71,
       64
      ],
      [
       71,
       64
      ],
      [
       72,
       64
      ],
      [
       72,
       64
      ]
     ],
     "order": [
      6,
      7,
      0,
      1,
      0,
      7
     ]
    },
    "run": {
     "n": 8,
     "muz": [
      [
       71,
       65
      ],
      [
       70,
       65
      ],
      [
       70,
       64
      ],
      [
       70,
       63
      ],
      [
       70,
       65
      ],
      [
       70,
       64
      ],
      [
       70,
       64
      ],
      [
       70,
       65
      ]
     ],
     "order": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
     ]
    },
    "jump": {
     "n": 8,
     "muz": [
      [
       72,
       64
      ],
      [
       72,
       65
      ],
      [
       70,
       67
      ],
      [
       70,
       64
      ],
      [
       69,
       63
      ],
      [
       70,
       63
      ],
      [
       71,
       63
      ],
      [
       70,
       64
      ]
     ],
     "order": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
     ]
    },
    "shoot": {
     "n": 4,
     "muz": [
      [
       72,
       64
      ],
      [
       70,
       62
      ],
      [
       68,
       60
      ],
      [
       72,
       64
      ]
     ],
     "order": [
      0,
      1,
      2,
      3
     ]
    },
    "up": {
     "n": 8,
     "muz": [
      [
       71,
       47
      ],
      [
       72,
       46
      ],
      [
       72,
       45
      ],
      [
       72,
       46
      ],
      [
       72,
       47
      ],
      [
       73,
       46
      ],
      [
       72,
       44
      ],
      [
       71,
       45
      ]
     ],
     "order": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
     ]
    },
    "down": {
     "n": 8,
     "muz": [
      [
       74,
       86
      ],
      [
       74,
       84
      ],
      [
       74,
       82
      ],
      [
       74,
       85
      ],
      [
       74,
       87
      ],
      [
       74,
       84
      ],
      [
       75,
       84
      ],
      [
       75,
       86
      ]
     ],
     "order": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
     ]
    },
    "hit": {
     "n": 4,
     "muz": [
      [
       70,
       60
      ],
      [
       70,
       60
      ],
      [
       70,
       60
      ],
      [
       70,
       60
      ]
     ],
     "order": [
      0,
      1,
      2,
      3
     ],
     "fw": 96
    },
    "die": {
     "n": 8,
     "muz": [
      [
       70,
       60
      ],
      [
       70,
       60
      ],
      [
       70,
       60
      ],
      [
       70,
       60
      ],
      [
       70,
       60
      ],
      [
       70,
       60
      ],
      [
       70,
       60
      ],
      [
       70,
       60
      ]
     ],
     "order": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
     ],
     "fw": 128
    },
    "victory": {
     "fw": 63,
     "fh": 85,
     "n": 8,
     "flash": [
      58,
      30,
      4
     ]
    }
   },
   "idle": "assets/heroes/badziejek/idle.png",
   "run": "assets/heroes/badziejek/run.png",
   "jump": "assets/heroes/badziejek/jump.png",
   "shoot": "assets/heroes/badziejek/shoot.png",
   "up": "assets/heroes/badziejek/up.png",
   "down": "assets/heroes/badziejek/down.png",
   "hit": "assets/heroes/badziejek/hit.png",
   "die": "assets/heroes/badziejek/die.png",
   "victory": "assets/heroes/badziejek/victory.png"
  },
  "m": {
   "meta": {
    "idle": {
     "n": 8,
     "muz": [
      [
       73,
       64
      ],
      [
       73,
       64
      ],
      [
       73,
       64
      ],
      [
       73,
       65
      ],
      [
       73,
       65
      ],
      [
       73,
       65
      ],
      [
       73,
       64
      ],
      [
       73,
       64
      ]
     ],
     "order": [
      0,
      1,
      2,
      3,
      6,
      7,
      6,
      3,
      2,
      1
     ]
    },
    "run": {
     "n": 8,
     "muz": [
      [
       72,
       64
      ],
      [
       72,
       62
      ],
      [
       72,
       61
      ],
      [
       72,
       64
      ],
      [
       72,
       64
      ],
      [
       72,
       62
      ],
      [
       72,
       61
      ],
      [
       72,
       65
      ]
     ],
     "order": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
     ]
    },
    "jump": {
     "n": 8,
     "muz": [
      [
       72,
       61
      ],
      [
       72,
       57
      ],
      [
       72,
       58
      ],
      [
       71,
       58
      ],
      [
       72,
       59
      ],
      [
       72,
       59
      ],
      [
       72,
       58
      ],
      [
       72,
       62
      ]
     ],
     "order": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
     ]
    },
    "shoot": {
     "n": 4,
     "muz": [
      [
       73,
       64
      ],
      [
       73,
       64
      ],
      [
       69,
       67
      ],
      [
       69,
       66
      ]
     ],
     "order": [
      0,
      1,
      2,
      3
     ]
    },
    "up": {
     "n": 8,
     "muz": [
      [
       72,
       40
      ],
      [
       73,
       37
      ],
      [
       73,
       37
      ],
      [
       73,
       39
      ],
      [
       72,
       38
      ],
      [
       73,
       35
      ],
      [
       72,
       38
      ],
      [
       72,
       42
      ]
     ],
     "order": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
     ]
    },
    "down": {
     "n": 8,
     "muz": [
      [
       70,
       82
      ],
      [
       71,
       84
      ],
      [
       70,
       81
      ],
      [
       71,
       83
      ],
      [
       71,
       82
      ],
      [
       70,
       80
      ],
      [
       70,
       82
      ],
      [
       71,
       84
      ]
     ],
     "order": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
     ]
    },
    "hit": {
     "n": 4,
     "muz": [
      [
       70,
       60
      ],
      [
       70,
       60
      ],
      [
       70,
       60
      ],
      [
       70,
       60
      ]
     ],
     "order": [
      0,
      1,
      2,
      3
     ],
     "fw": 96
    },
    "die": {
     "n": 8,
     "muz": [
      [
       70,
       60
      ],
      [
       70,
       60
      ],
      [
       70,
       60
      ],
      [
       70,
       60
      ],
      [
       70,
       60
      ],
      [
       70,
       60
      ],
      [
       70,
       60
      ],
      [
       70,
       60
      ]
     ],
     "order": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
     ],
     "fw": 128
    },
    "victory": {
     "fw": 51,
     "fh": 76,
     "n": 4,
     "ox": -20,
     "oy": -75
    }
   },
   "idle": "assets/heroes/marewik/idle.png",
   "run": "assets/heroes/marewik/run.png",
   "jump": "assets/heroes/marewik/jump.png",
   "shoot": "assets/heroes/marewik/shoot.png",
   "up": "assets/heroes/marewik/up.png",
   "down": "assets/heroes/marewik/down.png",
   "hit": "assets/heroes/marewik/hit.png",
   "die": "assets/heroes/marewik/die.png",
   "victory": "assets/heroes/marewik/victory.png"
  },
  "l": {
   "meta": {
    "idle": {
     "n": 8,
     "muz": [
      [
       72,
       64
      ],
      [
       72,
       64
      ],
      [
       72,
       64
      ],
      [
       72,
       64
      ],
      [
       72,
       64
      ],
      [
       72,
       64
      ],
      [
       72,
       64
      ],
      [
       72,
       64
      ]
     ],
     "order": [
      0,
      1,
      2,
      3,
      5,
      6,
      7,
      6,
      5,
      3,
      2,
      1
     ]
    },
    "run": {
     "n": 8,
     "muz": [
      [
       72,
       67
      ],
      [
       72,
       64
      ],
      [
       72,
       61
      ],
      [
       72,
       66
      ],
      [
       72,
       67
      ],
      [
       72,
       63
      ],
      [
       72,
       64
      ],
      [
       72,
       67
      ]
     ],
     "order": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
     ]
    },
    "jump": {
     "n": 8,
     "muz": [
      [
       73,
       67
      ],
      [
       73,
       68
      ],
      [
       73,
       58
      ],
      [
       72,
       65
      ],
      [
       72,
       62
      ],
      [
       72,
       59
      ],
      [
       73,
       57
      ],
      [
       73,
       64
      ]
     ],
     "order": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
     ]
    },
    "shoot": {
     "n": 4,
     "muz": [
      [
       72,
       67
      ],
      [
       70,
       71
      ],
      [
       69,
       65
      ],
      [
       70,
       71
      ]
     ],
     "order": [
      0,
      1,
      2,
      3
     ]
    },
    "up": {
     "n": 8,
     "muz": [
      [
       80,
       39
      ],
      [
       81,
       37
      ],
      [
       81,
       35
      ],
      [
       81,
       37
      ],
      [
       81,
       38
      ],
      [
       81,
       35
      ],
      [
       80,
       38
      ],
      [
       81,
       38
      ]
     ],
     "order": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
     ]
    },
    "down": {
     "n": 8,
     "muz": [
      [
       74,
       88
      ],
      [
       74,
       85
      ],
      [
       73,
       85
      ],
      [
       75,
       82
      ],
      [
       76,
       84
      ],
      [
       75,
       86
      ],
      [
       75,
       84
      ],
      [
       75,
       83
      ]
     ],
     "order": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
     ]
    },
    "hit": {
     "n": 4,
     "muz": [
      [
       70,
       60
      ],
      [
       70,
       60
      ],
      [
       70,
       60
      ],
      [
       70,
       60
      ]
     ],
     "order": [
      0,
      1,
      2,
      3
     ],
     "fw": 96
    },
    "die": {
     "n": 8,
     "muz": [
      [
       70,
       60
      ],
      [
       70,
       60
      ],
      [
       70,
       60
      ],
      [
       70,
       60
      ],
      [
       70,
       60
      ],
      [
       70,
       60
      ],
      [
       70,
       60
      ],
      [
       70,
       60
      ]
     ],
     "order": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
     ],
     "fw": 128
    },
    "victory": {
     "fw": 55,
     "fh": 75,
     "n": 4,
     "ox": -25,
     "oy": -74
    }
   },
   "idle": "assets/heroes/lysa/idle.png",
   "run": "assets/heroes/lysa/run.png",
   "jump": "assets/heroes/lysa/jump.png",
   "shoot": "assets/heroes/lysa/shoot.png",
   "up": "assets/heroes/lysa/up.png",
   "down": "assets/heroes/lysa/down.png",
   "hit": "assets/heroes/lysa/hit.png",
   "die": "assets/heroes/lysa/die.png",
   "victory": "assets/heroes/lysa/victory.png"
  }
 },
 "bul": {
  "b": "assets/bullets/badziejek.png",
  "m": "assets/bullets/marewik.png",
  "l": "assets/bullets/lysa.png"
 },
 "por": {
  "b": "assets/portraits/badziejek.png",
  "m": "assets/portraits/marewik.png",
  "l": "assets/portraits/lysa.png"
 },
 "pu": {
  "dopalka": "assets/pickups/dopalka.png",
  "kamizelka": "assets/pickups/kamizelka.png",
  "folia": "assets/pickups/folia.png",
  "zlotowka": "assets/pickups/zlotowka.png",
  "drugie_sniadanie": "assets/pickups/drugie_sniadanie.png",
  "energetyk": "assets/pickups/energetyk.png",
  "magnes": "assets/pickups/magnes.png",
  "klapki": "assets/pickups/klapki.png",
  "kapsula": "assets/pickups/kapsula.png",
  "kebab": "assets/pickups/kebab.png",
  "pierogi": "assets/pickups/pierogi.png",
  "smalec": "assets/pickups/smalec.png",
  "tuptus": "assets/pickups/tuptus.png",
  "kapsle": "assets/pickups/kapsle.png",
  "petardy": "assets/pickups/petardy.png",
  "kawa": "assets/pickups/kawa.png",
  "nalewka": "assets/pickups/nalewka.png"
 },
 "title": "assets/ui/title_bg.webp",
 "selbg": "assets/ui/select_bg.webp",
 "logo": "assets/ui/logo.webp",
 "music": "assets/music/maintheme.mp3",
 "musicLvl": "assets/music/piwnica.mp3",
 "musicBoss": "assets/music/boss.mp3",
 "musicWin": "assets/music/victory.mp3",
 "musicOver": "assets/music/gameover.mp3",
 "ult": {
  "b1": {
   "img": "assets/ult/badziejek_1.png",
   "ax": 26,
   "h": 72
  },
  "b2": {
   "img": "assets/ult/badziejek_2.png",
   "ax": 24,
   "h": 66
  },
  "m1": {
   "img": "assets/ult/marewik_1.png",
   "ax": 25,
   "h": 75
  },
  "m2": {
   "img": "assets/ult/marewik_2.png",
   "ax": 19,
   "h": 76
  },
  "l1": {
   "img": "assets/ult/lysa_1.png",
   "ax": 44,
   "h": 74
  },
  "gr": {
   "img": "assets/fx/grenade.png"
  },
  "bthrow": {
   "img": "assets/ult/badziejek_throw.png",
   "fw": 96,
   "n": 8
  },
  "arm_front": {
   "img": "assets/boss/arm_front.png"
  },
  "arm_back": {
   "img": "assets/boss/arm_back.png"
  },
  "teabag": {
   "img": "assets/boss/teabag.png"
  }
 },
 "enemies": {
  "szczur_run": {
   "img": "assets/enemies/szczur_run.png",
   "fw": 60,
   "fh": 60,
   "n": 8
  },
  "robol_walk": {
   "img": "assets/enemies/robol_walk.png",
   "fw": 92,
   "fh": 92,
   "n": 8
  },
  "beczka_hop": {
   "img": "assets/enemies/beczka_hop.png",
   "fw": 62,
   "fh": 62,
   "n": 8
  },
  "kanalarz_walk": {
   "img": "assets/enemies/kanalarz_walk.png",
   "fw": 106,
   "fh": 106,
   "n": 8
  },
  "robol_spit": {
   "img": "assets/enemies/robol_spit.png",
   "fw": 92,
   "fh": 92,
   "n": 4
  },
  "kanalarz_shoot": {
   "img": "assets/enemies/kanalarz_shoot.png",
   "fw": 106,
   "fh": 106,
   "n": 4
  }
 },
 "bossA": {
  "walk": {
   "img": "assets/boss/brs_walk.png",
   "n": 8,
   "ox": -11,
   "oy": -24
  },
  "shoot": {
   "img": "assets/boss/brs_shoot.png",
   "n": 4,
   "ox": -11,
   "oy": -24
  },
  "whistle": {
   "img": "assets/boss/brs_whistle.png",
   "n": 6,
   "ox": -11,
   "oy": -24
  },
  "die": {
   "img": "assets/boss/brs_die.png",
   "n": 8,
   "ox": -11,
   "oy": -24
  }
 }
};
