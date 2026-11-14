# Changelog

Format oparty na [Keep a Changelog](https://keepachangelog.com/pl/1.1.0/), numeracja [SemVer](https://semver.org/lang/pl/).
Numer wersji widać w prawym dolnym rogu ekranu tytułowego (`tools/bump.py`).

## [Unreleased]
### Dodane
- Repozytorium: podział kodu na moduły (`src/`), grafiki jako osobne pliki (`assets/`),
  skrypt budujący jeden plik HTML (`tools/build.py`), deploy na GitHub Pages.

## [0.12.3] — 2026-11-14
### Poprawione
- Krawędzie dziur: klinowate, „szarpane” kafle (wyglądały jak błąd, bo pod nimi zaczynała się pełna ściana) zastąpione czystą pionową krawędzią urwiska.

## [0.12.2] — 2026-11-14
### Zmienione
- Dziury w podłodze czytelniejsze: ciemna przepaść, ściany skały, falujący ślim z bąblami na dnie, kapanie z krawędzi (testerzy brali je za błąd grafiki).

## [0.12.1] — 2026-11-14
### Zmienione
- Ekran wyboru: nagłówek „SELEKT YOUR WUJAS OR CIOTKA” zamiast „WYBIERZ BOHATERA” (sugestia testerów).

## [0.12.0] — 2026-11
### Zmienione
- Agent B.R.S mocniejszy i dłuższa walka (~60–90 s), bez robienia z tego Dark Soulsów.
- Fazy bossa: zachwianie przy 2/3 i 1/3 HP z dymkami pilota, skok z falami uderzeniowymi,
  faza 3 — szał i szczury wzywane gwizdkiem.
- Ciało bossa otrzymuje ×0.2 obrażeń, głowa ×3 w trakcie gwizdania i zachwiania.

## [0.11.0] — 2026-11
### Zmienione
- Robole strzelają od razu, gdy gracz pojawi się na ekranie, i częściej (cd 90).
- Mechaniczne ramiona bossa twardsze: opancerzone poza atakiem + okno podatności ze świecącym stawem.
### Usunięte
- Czerwony baner bossa (słaba czytelność) — zastąpiony zwykłym komunikatem.

## [0.10.0] — 2026-11
### Zmienione
- Nowy ekran tytułowy: logo zostaje, złota trójka maszeruje przez Piwnicę (paralaksa).
- Numer wersji w prawym dolnym rogu ekranu tytułowego.

## Przed numeracją (prototypy)
- Nowy, spójny styl bohaterów (SpriteCook Pixel Engine): Badziejek (przygarbiony, uśmiech à la Joker/Junkrat),
  Marewik (umięśniony, krótkie włosy), Łysa (chłopczyca z grzywką, minigun oburącz).
- Animacje: idle, bieg, skok, strzał, bieg ze skosem w górę/dół, trafienie, śmierć + czaszka w dymku.
- Pociski per postać, znajdźki (dopałka, kamizelka, folia, złotówka, drugie śniadanie, energetyk, magnes, klapki, kapsuła).
- Ekran wyboru bohatera z portretami i animowanym idle.
- Ulty z komiksowymi przerywnikami (granat Badziejka, mrugnięcie i pstryk Marewika, furia Łysej).
- Wrogowie Piwnicy: szczur, robol, beczka, kanalarz (moździerz) — telegrafowanie strzałów,
  celowanie w gracza na platformach.
- Długi poziom Piwnica (7500 px), dziury, platformy, checkpointy, kontynuacja po GAME OVER.
- HP 100 + 3 życia, kamizelka, mikroeksplozje pocisków, cienie kontaktowe, sterowanie dotykowe i pad.
- Arena bossa z platformami, Agent B.R.S z animacjami (chód, strzał, gwizdek, śmierć) i mechanicznymi ramionami.

[Unreleased]: ../../compare/v0.12.3...HEAD
[0.12.3]: ../../releases/tag/v0.12.3
[0.12.2]: ../../releases/tag/v0.12.2
[0.12.1]: ../../releases/tag/v0.12.1
[0.12.0]: ../../releases/tag/v0.12.0
