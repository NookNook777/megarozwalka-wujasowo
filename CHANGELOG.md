# Changelog

Format oparty na [Keep a Changelog](https://keepachangelog.com/pl/1.1.0/), numeracja [SemVer](https://semver.org/lang/pl/).
Numer wersji widać w prawym dolnym rogu ekranu tytułowego (`tools/bump.py`).

## [Unreleased]
### Dodane
- Repozytorium: podział kodu na moduły (`src/`), grafiki jako osobne pliki (`assets/`),
  skrypt budujący jeden plik HTML (`tools/build.py`), deploy na GitHub Pages.

## [0.18.0] — 2026-11-14
### Dodane
- Siedem nowych znajdziek z kapsuł i wrogów (ikonki SpriteCook 24×24):
  - **Petardy z Bazaru** — 12 s: każdy pocisk po trafieniu robi mały wybuch (50% obrażeń dla wrogów obok),
  - **Kapsle od Oranżady** — 12 s: pociski raz odbijają się od podłogi i krawędzi ekranu,
  - **Chomik Tuptuś** — 15 s: chomik biega przy nodze i pluje ziarnami w najbliższego wroga (też w bossa),
  - **Kawa z Ekspresu** — 10 s: strzał 2× szybciej,
  - **Nalewka Dziadka** — 5 s: wrogowie, ich pociski i boss zwalniają o połowę (lekki sepiowy filtr),
  - **Łódzkie Pierogi** — 3 pierogi krążą wokół bohatera i łapią po jednym wrogim pocisku (do 15 s),
  - **Smalec Babci** — +1 życie (bardzo rzadki; przy 5 życiach → nadwyżka +10% ulta).
- Aktywne efekty czasowe widoczne w HUD jako ikonki z paskiem pozostałego czasu (miga, gdy się kończy).
### Zmienione
- Nowa tabela losowania znajdziek (dopałka nadal najczęstsza, ~25%).

## [0.17.10] — 2026-11-14
### Zmienione
- Nowy dialog Marewika z B.R.S przed walką („Kto przyszedł? Cukierek albo psikus!” … „Nie mogę, prowadzę.”).

## [0.17.9] — 2026-11-14
### Zmienione
- Kebab Mieszany → **Kebab Miesiany** (tak ma być).

## [0.17.8] — 2026-11-14
### Zmienione
- Nowy dialog Badziejka z B.R.S przed walką („Hihihi-hihi! Ale wyglądasz, kumplu niemyty! xD” … „Ta, ale najpierw dawaj na środek.”).

## [0.17.7] — 2026-11-14
### Poprawione
- Łysa: szara łata między przednią ręką a górą minigunu (resztka szarego tła z generatora animacji uwięziona w zamkniętym obszarze)
  usunięta z animacji idle, biegu, skoku, strzału, trafienia oraz spod brody w celowaniu w górę. Widoczne m.in. na ekranie wyboru i tytułowym.
  Poza zwycięstwa Łysej przebudowana z poprawionej klatki.
### Dodane
- `tools/fixmatte.py` — czyszczenie uwięzionych łat tła w arkuszach animacji.

## [0.17.6] — 2026-11-14
### Zmienione
- Okno dialogu z powrotem na dole ekranu, ale niższe i zaczyna się pod linią podłogi — bohater i B.R.S zostają w pełni widoczni.

## [0.17.5] — 2026-11-14
### Zmienione
- Scenka przed bossem zawsze „twarzą w twarz”: najpierw kamera dojeżdża do areny, B.R.S stoi w pełni w kadrze i patrzy na bohatera,
  a okno dialogu jest u góry ekranu (nad HUD-em), więc obie postacie na ziemi są widoczne.
- Wraca poprzednia poza zwycięstwa Badziejka (selfie z telefonem i V, 8 klatek, flesz) — czytelniej wyglądała jak selfie.

## [0.17.4] — 2026-11-14
### Poprawione
- „Teleport” B.R.S: po skoku lądował bliżej niż pozwalał limit podchodzenia i był natychmiast przestawiany — teraz po prostu przestaje iść dalej, a cel skoku respektuje limit.
- Zawisanie B.R.S w powietrzu: gdy skok przerwała zmiana fazy (zachwianie) albo boss zginął w locie, zostawał nad ziemią — teraz zawsze spada i ląduje.

## [0.17.3] — 2026-11-14
### Zmienione
- Napisy znajdziek i komunikaty bez ciemnego prostokąta — zamiast tego czarny obrys liter i lekki cień, czytelne na każdym tle.

## [0.17.2] — 2026-11-14
### Zmienione
- Czcionka Press Start 2P wbudowana w grę (`assets/fonts/`, licencja OFL) zamiast ładowania z Google Fonts:
  gra wygląda tak samo zawsze, także offline i przy blokadzie Google — nigdy nie spada do zwykłej czcionki systemowej.

## [0.17.1] — 2026-11-14
### Zmienione
- Napisy po podniesieniu znajdźki w dwóch linijkach na półprzezroczystym tle: większa nazwa u góry, pod nią krótko co robi
  (np. „KAMIZELKA” / „-50% OBRAŻEŃ · 4 TRAFIENIA”, „DOPAŁKA” / „BROŃ POZIOM 2”, „FOLIA ALUMINIOWA” / „TARCZA NA 10 S”).
- Latające kapsuły bez złotej poświaty (został mały „?”).

## [0.17.0] — 2026-11-14
### Dodane
- Scenka dialogowa przed walką z B.R.S w stylu starych j-rpg: ramka z portretem, imię, tekst pisany literka po literce z „pikaniem”.
  Osobny dialog dla każdego bohatera. Dalej: Z / X / C / Enter (pierwsze wciśnięcie dokańcza linijkę). Przy ponownym podejściu z checkpointu scenka się nie powtarza.
- B.R.S potrafi się odwrócić — można przebiec pod nim, kiedy wyskakuje w górę (skok z falą uderzeniową), a on obraca się w stronę gracza
  (ramiona, pociski i trafienia działają w obie strony; napis DI.WA zostaje czytelny).
### Zmienione
- B.R.S skraca dystans stopniowo: zaczyna przy prawej stronie areny i z czasem walki podchodzi coraz bliżej (w fazach 2–3 szybciej).
- Walka zaczyna się dopiero po wejściu na arenę (boss i bohater od razu są na ekranie).

## [0.16.0] — 2026-11-14
### Dodane
- Nowa znajdźka **Kebab Mieszany** (+40 HP, jak kanapka).
- Nadwyżka znajdziek nie przepada, tylko zamienia się w mały bonus (+3 zł):
  dopałka przy broni poz. 3 → +20% ulta; magnes / klapeczki, gdy już działają → +10% ulta; jedzenie przy pełnym HP → +10% ulta.
  W trakcie ulta nadwyżka nie ładuje paska (jak wszystko inne).
### Zmienione
- Klapki Kubota → **Klapeczki Wipmeny**, Drugie śniadanie → **Kanapka z Jajcuszkiem** (nowa ikonka z jajkiem).

## [0.15.7] — 2026-11-14
### Poprawione
- Ciszej buczenie plazmowego promienia Łysej (~3× ciszej).
- Usunięta zdublowana platforma przy x≈6000 (dwie nakładały się na siebie).
- Arena bossa: po wejściu na arenę ekran się blokuje (jak w Contrze) — nie da się wycofać pod flagę i grać „na snajpera”.
- B.R.S podchodzi do gracza zamiast stać przy prawej krawędzi i strzelać z daleka.
- Szczury wzywane gwizdkiem gonią gracza; wszystkie szczury odwracają się w stronę gracza, gdy jest blisko (i nadal nie wskakują do dziur).
### Zmienione
- Latające kapsuły z bonusami wyróżnione złotą poświatą i „?” — to znajdźki do zestrzelenia (jak w Contrze), nie bomby.

## [0.15.6] — 2026-11-14
### Zmienione
- Ujednolicone pozy zwycięstwa: wszystkie trzy robione na klatce idle z gry (sylwetka piksel w piksel ta sama, zmienia się tylko przednia ręka i mimika, 4 klatki, bez przeskoku):
  - Badziejek — wyciąga telefon przed twarz do selfie (szeroki uśmiech bez zmian), błysk flesza,
  - Marewik — filiżanka przy ustach, oczy przymknięte z błogości,
  - Łysa — środkowy palec i wredny uśmieszek (bez zmian).
- Mniejszy błysk flesza na ekranie wygranej.
- Skrypty póz przeniesione do `tools/victory/`.

## [0.15.5] — 2026-11-14
### Zmienione
- Poza Łysej zrobiona „chirurgicznie” na klatce idle z gry: głowa, ciało, nogi i minigun są piksel w piksel te same,
  zmienia się tylko przednia ręka (środkowy palec) i mimika — wredny uśmieszek z kącikiem ust do góry i przymrużone oko jak na portrecie.
  4 klatki (lekkie dźgnięcie palcem), idealnie w miejscu postaci, bez przeskoku sylwetki.
- Poza na przycisk (V/T/LB/☺) skrócona do ~0,7 s dla wszystkich.
### Dodane
- `tools/lysa_victory_pose.py` — skrypt generujący tę pozę z klatki idle.

## [0.15.4] — 2026-11-14
### Zmienione
- Nowa poza zwycięstwa Łysej: bokiem jak w grze, złośliwy uśmiech i środkowy palec.
  Animacja złożona w kodzie z jednej klatki (dźgnięcie palcem + trzęsienie ze śmiechu), więc twarz jest w 100% stała.
### Usunięte
- Buziak z serduszkiem.

## [0.15.3] — 2026-11-14
### Poprawione
- Poza zwycięstwa Łysej: blokada twarzy — oczy, mrugnięcie i fryzura są identyczne we wszystkich klatkach (wcześniej „pływały”); dłoń z buziakiem zostaje z animacji.
### Dodane
- `tools/facelock.py` — narzędzie do blokady twarzy w arkuszach animacji.

## [0.15.2] — 2026-11-14
### Zmienione
- Poza zwycięstwa Łysej: odwraca się przodem do ekranu i puszcza buziaka z mrugnięciem (poprawione oczy);
  serduszko rysowane w kodzie wylatuje z dłoni i odlatuje w górę.

## [0.15.1] — 2026-11-14
### Zmienione
- Pozy zwycięstwa przerobione na bazie sprite'ów z gry (zamiast osobno generowanych postaci):
  te same proporcje, wielkość pikseli i obrys co reszta animacji. Marewik nie jest już rozciągnięty wszerz, Łysa wygląda jak Łysa.

## [0.15.0] — 2026-11-14
### Dodane
- Osobny przycisk pozy zwycięstwa w trakcie gry („szpan”): **V / T** na klawiaturze, **LB / Select** na padzie, **☺** na ekranie dotykowym.
  Działa na ziemi; jedna pętla animacji (~1 s), przerywana ruchem, skokiem, strzałem, ultem lub trafieniem. Opisane w menu STEROWANIE.

## [0.14.0] — 2026-11-14
### Dodane
- Pozy zwycięstwa (animowane, 8 klatek) na nowym ekranie wygranej z reflektorem:
  - Badziejek — selfie z „V” i wywalonym językiem, z błyskiem flesza (nawiązanie do ulta „Flesz na mordę!”),
  - Marewik — elegancko sączy kawkę z porcelanowej filiżanki z odgiętym małym palcem,
  - Łysa — puszcza buziaka do kamery z mrugnięciem, serduszko odlatuje.

## [0.13.1] — 2026-11-14
### Poprawione
- Szczury (rzut na gracza) i beczki (podskok) nie skaczą już, jeśli lot skończyłby się w przepaści — wcześniej wpadały do dziur, gdy gracz stał po drugiej stronie.

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

[Unreleased]: ../../compare/v0.18.0...HEAD
[0.18.0]: ../../releases/tag/v0.18.0
[0.17.10]: ../../releases/tag/v0.17.10
[0.17.9]: ../../releases/tag/v0.17.9
[0.17.8]: ../../releases/tag/v0.17.8
[0.17.7]: ../../releases/tag/v0.17.7
[0.17.6]: ../../releases/tag/v0.17.6
[0.17.5]: ../../releases/tag/v0.17.5
[0.17.4]: ../../releases/tag/v0.17.4
[0.17.3]: ../../releases/tag/v0.17.3
[0.17.2]: ../../releases/tag/v0.17.2
[0.17.1]: ../../releases/tag/v0.17.1
[0.17.0]: ../../releases/tag/v0.17.0
[0.16.0]: ../../releases/tag/v0.16.0
[0.15.7]: ../../releases/tag/v0.15.7
[0.15.6]: ../../releases/tag/v0.15.6
[0.15.5]: ../../releases/tag/v0.15.5
[0.15.4]: ../../releases/tag/v0.15.4
[0.15.3]: ../../releases/tag/v0.15.3
[0.15.2]: ../../releases/tag/v0.15.2
[0.15.1]: ../../releases/tag/v0.15.1
[0.15.0]: ../../releases/tag/v0.15.0
[0.14.0]: ../../releases/tag/v0.14.0
[0.13.1]: ../../releases/tag/v0.13.1
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
