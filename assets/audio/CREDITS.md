# Audio credits / Licencje dźwięków

All sounds in this folder are **original, procedurally generated audio** — no samples, no third-party recordings.
They were synthesised from scratch with `tools/gen-audio.py` (Python + numpy, encoded with ffmpeg: libvorbis `.ogg` + libmp3lame `.mp3` fallback).
Re-run `python3 tools/gen-audio.py` to regenerate them bit-for-bit (fixed random seed).

Wszystkie dźwięki w tym folderze są **oryginalne, wygenerowane proceduralnie** (bez sampli i cudzych nagrań) skryptem `tools/gen-audio.py`.

**License / Licencja: CC0 1.0 Universal (public domain dedication)** — https://creativecommons.org/publicdomain/zero/1.0/
Free to use, modify and redistribute for any purpose, no attribution required.

| File (.ogg + .mp3) | What it is | Source | License |
|---|---|---|---|
| `music_day` | Day loop, ~25 s seamless, D-minor lo-fi / dark-romantic (e-piano arpeggio, pads, soft lo-fi beat, vinyl crackle), 76 BPM | generated, tools/gen-audio.py | CC0 1.0 |
| `music_night` | Night / asleep / away loop, ~24 s, quieter: pads + music-box bells, no drums, 60 BPM | generated | CC0 1.0 |
| `amb_romance` | Romance-scene ambience loop, ~16 s: warm drone, shimmer, soft heartbeat | generated | CC0 1.0 |
| `sfx_tap` | UI tap / button click | generated | CC0 1.0 |
| `sfx_feed` | Feed (soft "nom" pop) | generated | CC0 1.0 |
| `sfx_sleep` | Tuck in (descending lullaby chime) | generated | CC0 1.0 |
| `sfx_talk` | Talk (little chatter blips) | generated | CC0 1.0 |
| `sfx_sparkle` | Compliment (sparkle) | generated | CC0 1.0 |
| `sfx_gift` | Gift / makeup (ribbon + bell) | generated | CC0 1.0 |
| `sfx_music` | Music (vinyl needle drop + chord) | generated | CC0 1.0 |
| `sfx_kind` | Sweet words (warm two-note chime) | generated | CC0 1.0 |
| `sfx_romance` | Romance actions (soft swell) | generated | CC0 1.0 |
| `sfx_mood_up` | Mood got better (rising cue) | generated | CC0 1.0 |
| `sfx_mood_down` | Mood got worse (falling minor cue) | generated | CC0 1.0 |
| `sfx_tier_up` | New bond level (chime arpeggio) | generated | CC0 1.0 |
| `sfx_refuse` | Refused / on cooldown (muted thud) | generated | CC0 1.0 |
| `sfx_door` | Eve leaves (door creak, thud, sad minor piano) | generated | CC0 1.0 |

Total size of this folder: ~0.97 MB (budget: < 1.5 MB).

## Eve's voice (optional) / Głos Eve (opcjonalnie)
Not included. Drop your own clips into `public/assets/voice/` and list them in `public/assets/voice/manifest.json`
(see the main README). Make sure you own the rights to any voice recordings you add.
