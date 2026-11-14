# Changelog

Format oparty na [Keep a Changelog](https://keepachangelog.com/pl/1.1.0/), numeracja [SemVer](https://semver.org/lang/pl/).
Numer wersji widać w prawym dolnym rogu ekranu tytułowego (`tools/bump.py`).

## [Unreleased]
### Dodane
- Repozytorium: podział kodu na moduły (`src/`), grafiki jako osobne pliki (`assets/`),
  skrypt budujący jeden plik HTML (`tools/build.py`), deploy na GitHub Pages.

## [0.13.0] — 2026-11-14
### Dodane
- Nowy ult Łysej — **plazmowy promień**: 4 s ciągłego promienia przez cały ekran (można się obracać, nie można chodzić).
  Przebija wszystko, kasuje wrogie pociski, Łysa w tym czasie nietykalna.
  Balans: ~40 HP bossa (25% — tyle co granat Badziejka), ramionom ~36 HP (samo nie rozwala ramienia), zwykłych wrogów topi.
### Zmienione
- Wolniejsze ładowanie ulta na bossie: ~60–70 s ostrzału na broni poz. 1, ~25–28 s na poz. 3 (wcześniej ~11 s → ult prawie non stop).
  W walce z bossem pasek dodatkowo ładuje się powoli sam (0,5%/s).
### Usunięte
- Stary ult Łysej (szybszy ogień + broń poz. 3), który dublował dopałkę.

## [0.12.9] — 2026-11-14
### Poprawione
- „Nieskończony” ult Łysej: w trakcie działania ulta pasek ULT już się nie ładuje.
- Ładowanie ulta na bossie liczone od zadanych obrażeń, a nie od liczby trafień — wcześniej postacie z wieloma pociskami (Łysa, Badziejek) ładowały się dużo szybciej niż Marewik.
  Teraz tempo zależy od siły ognia (poz. 1: ~30 s ostrzału, poz. 3: ~11 s).
- Zniszczenie ramienia bossa daje ult tylko raz (przez obrażenia), bez dodatkowego bonusu.

## [0.12.8] — 2026-11-14
### Poprawione
- Ściana tła kończyła się 6 px nad podłogą (widać było czarną szczelinę, zwłaszcza nad dziurami) — dodany kamienny cokół domykający ścianę do linii podłogi.

## [0.12.7] — 2026-11-14
### Zmienione
- Monety leżą nieruchomo (bez kołysania), także te wypadające z wrogów po wylądowaniu.

## [0.12.6] — 2026-11-14
### Dodane
- Liczby obrażeń przy bossie (sumowane w serii): różowe = ciało, żółte = głowa, pomarańczowe = ramię.
- Paski HP bossa i ramion z białym „śladem” ubytku, bez zaokrąglania do pełnych pikseli.
### Poprawione
- Wrażenie, że część trafień nie zadaje obrażeń (Marewik bez ulepszeń: 0.4 HP na trafienie w ciało przesuwało pasek co 2–3 strzały).

## [0.12.5] — 2026-11-14
### Poprawione
- Marewik, broń poz. 3: wcześniej dawała tylko przebijanie, które w praktyce nic nie zmieniało (poz. 3 = poz. 2), a przy bossie pocisk przebijający „zużywał się” na ramieniu i nie trafiał w ciało.
### Zmienione
- Marewik poz. 3: ciężkie pociski przebijające (+1.2 obrażeń, większe, z pomarańczową smugą); przebijają ramię bossa i trafiają dalej w ciało.

## [0.12.4] — 2026-11-14
### Poprawione
- Agent B.R.S nie dostawał obrażeń w trakcie chodzenia i dymków — „niewidzialna ściana”:
  - opancerzone ramiona pochłaniały pociski lecące w nogi i tułów; teraz pociski przelatują przez ramię w spoczynku i trafiają w ciało, a ramię da się ranić tylko podczas ataku / świecącego stawu;
  - hitbox ciała obejmował tylko dolne 128 px, więc strzały z górnej platformy (szczególnie Marewika, który trzyma karabin wysoko) przelatywały nad nim; teraz obejmuje całą postać (głowa ×3 nadal tylko przy gwizdku i zachwianiu).

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

[Unreleased]: ../../compare/v0.13.0...HEAD
[0.13.0]: ../../releases/tag/v0.13.0
[0.12.9]: ../../releases/tag/v0.12.9
[0.12.8]: ../../releases/tag/v0.12.8
[0.12.7]: ../../releases/tag/v0.12.7
[0.12.6]: ../../releases/tag/v0.12.6
[0.12.5]: ../../releases/tag/v0.12.5
[0.12.4]: ../../releases/tag/v0.12.4
[0.12.3]: ../../releases/tag/v0.12.3
[0.12.2]: ../../releases/tag/v0.12.2
[0.12.1]: ../../releases/tag/v0.12.1
[0.12.0]: ../../releases/tag/v0.12.0
