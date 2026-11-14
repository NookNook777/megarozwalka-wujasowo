# Pozy zwycięstwa

Każda poza powstaje z klatki 0 animacji idle danej postaci (`assets/heroes/<postać>/idle.png`).
Skrypty zmieniają tylko przednią rękę i mimikę, reszta sylwetki zostaje piksel w piksel taka sama,
dzięki czemu poza „wskakuje” w miejsce idle bez przeskoku.

- `surgery.py` — wspólne funkcje (wymazanie ręki, rysowanie przedramienia, stemple pikselowe, składanie arkusza)
- `badziejek.py` — selfie z telefonem (flesz rysuje gra)
- `marewik.py` — filiżanka kawy przy ustach, zamknięte oczy
- `lysa.py` — środkowy palec, wredny uśmieszek

Wynik: `<x>_victory.png` (4 klatki) + metadane `fw/fh/n/ox/oy` do wpisania w `src/data.js`.
Uruchamiaj w katalogu z klatką `<x>_idle0.png` (wycinek 96×96 klatki 0 z idle.png).
