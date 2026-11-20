# Megarozwałka w Wujasowie

8-bitowa strzelanka w stylu Contry, działająca w przeglądarce. Trójka bohaterów —
**Badziejek**, **Marewik** i **Łysa** — przebija się przez zaślimaczoną Piwnicę
aż do **Agenta B.R.S** i jego mechanicznych ramion.

![wersja](https://img.shields.io/badge/wersja-v0.26.3-ffd040) ![HTML5](https://img.shields.io/badge/HTML5-canvas-e8203a)

## Zagraj

- **Online:** po włączeniu GitHub Pages — `https://<twoj-login>.github.io/<nazwa-repo>/`
- **Lokalnie:** otwórz `index.html` w przeglądarce (najlepiej przez serwer — patrz niżej).

### Sterowanie

| Akcja | Klawiatura | Pad |
|---|---|---|
| Ruch / celowanie | strzałki / WASD | lewa gałka, krzyżak |
| Skok | Z / K / Spacja | A |
| Strzał | X / J | X / RT |
| Ult | C / L | Y / B |
| Poza zwycięstwa (szpan) | V / T | LB / Select |
| Pauza | Enter / Esc / P | Start |
| Głośność | menu GŁOŚNOŚĆ albo ← / → w pauzie | — |

Na telefonie pojawia się wirtualna gałka i przyciski SKOK / OGIEŃ / ULT / II / ☺.
(Dokładne mapowanie: menu → STEROWANIE w grze.)

## Struktura

```
index.html          wersja deweloperska (ładuje src/ i assets/)
src/
  style.css         wygląd ekranów, CRT, sterowanie dotykowe
  data.js           manifest grafik + metadane klatek (const A)
  config.js         ładowanie obrazów, typy wrogów, rozstawienie, statystyki bohaterów
  audio.js          syntezator SFX (WebAudio)
  input.js          klawiatura, pad, dotyk
  screens.js        tytuł, menu, wybór bohatera
  game.js           poziom, fizyka, gracz, wrogowie, update()
  boss.js           Agent B.R.S, ramiona, ulty, pociski, znajdźki, efekty
  powerups.js       znajdźki czasowe (petardy, kapsle, Tuptuś, kawa, nalewka, pierogi)
  draw.js           rysowanie świata, HUD, dymków
  main.js           pętla gry, sterowanie dotykowe, start
assets/             grafiki (heroes/, enemies/, boss/, level/, props/, pickups/, ...)
tools/
  build.py          skleja wszystko w jeden plik dist/index.html (grafiki jako base64)
  bump.py           podbija numer wersji na ekranie tytułowym
  facelock.py       blokada twarzy w arkuszach animacji (stałe oczy/fryzura między klatkami)
  fixmatte.py       czyszczenie szarych łat tła uwięzionych między ręką a bronią
  victory/          skrypty pikselowych póz zwycięstwa (na bazie klatki idle)
.github/workflows/  automatyczny deploy na GitHub Pages
```

Skrypty to zwykłe `<script>` (bez bundlera) i dzielą wspólny zasięg globalny —
**kolejność w `index.html` ma znaczenie**.

## Praca nad grą

```bash
# podgląd (dowolny prosty serwer)
python3 -m http.server 8000      # → http://localhost:8000

# zbudowanie jednego pliku do wysłania / wrzucenia gdziekolwiek
python3 tools/build.py           # → dist/index.html

# nowa wersja
python3 tools/bump.py minor      # v0.12.0 → v0.13.0, potem wpis w CHANGELOG.md
git tag v0.13.0 && git push --tags
```

Podmiana grafiki: nadpisz plik w `assets/` (ten sam rozmiar klatek), a jeśli zmienia się
liczba klatek lub ich szerokość — popraw `n` / `fw` w `src/data.js`.

### Zasady

- Każda aktualizacja = nowy numer wersji na ekranie tytułowym + wpis w `CHANGELOG.md`.
- Commit `main` buduje się i publikuje sam (GitHub Actions → Pages).
- Większe zmiany na osobnej gałęzi, scalane przez Pull Request.

## Podziękowania

Specjalne podziękowania dla społeczności discordowego serwera **WUJASOWO** za inspirację: BrS, Natalia, Błażejek, Maverick, Gucio, Blizzu, Loki, Sosna, Ghost Ripper, Miciia, Frostii, Swifty, Miodkova, Decooo, Barto, Makaronik. Oddzielne podziękowania dla Ev za bezustanne wsparcie.

## Licencje

- Kod: [MIT](LICENSE).
- Grafiki: wszelkie prawa zastrzeżone — [assets/LICENSE.md](assets/LICENSE.md).
- Czcionka Press Start 2P: SIL Open Font License 1.1 (dołączona w `assets/fonts/`, gra działa offline).
