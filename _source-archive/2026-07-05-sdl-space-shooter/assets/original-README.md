# SDL Space Shooter

A 2D space shooter game where you control a spaceship, destroy waves of enemies, and compete for the highest score.

## Credits

This project is based on the **SDL2 Game Development Tutorial** series by **ZiyuGameDev** on Bilibili.  
Original tutorial: [Bilibili Video](https://www.bilibili.com/video/BV1wSCFYQEyc)

On top of the tutorial foundation, I made the following modifications and improvements:

- **Game balance** — Adjusted player/enemy speed, player/enemy health, damage values, spawn rates, and cooldowns
- **UI polish** — Adjusted in-game HUD size, repositioned score display, and refined visual feedback (explosion alignment)
- **Persistent leaderboard** — Scores are saved to the platform-specific user data directory (`SDL_GetPrefPath`, e.g. AppData/Roaming on Windows) instead of the project root, ensuring data persists across re-downloads and works correctly with packaged releases
- **Difficulty scaling** — Added progressive difficulty that increases over time
- **Triple-shot mechanic** — The player fires three projectiles per shot instead of one, creating a wider attack spread and a more satisfying combat feel
- **Screen scaling** — Implemented adaptive window size based on monitor resolution with a uniform scale factor applied to all sprites, speeds, and UI elements

## Features

- Keyboard-controlled player movement (WASD) and shooting (J)
- Single enemy type with increasing spawn rates over time
- Enemy projectiles that track the player's position
- Player health system with health pickups dropped by enemies
- Items bounce off walls three times before despawning
- Explosion animations with sprite sheet rendering
- Score tracking and local leaderboard (top 8 scores saved to disk)
- Background parallax scrolling with two star layers
- Background music and sound effects via SDL_mixer
- Title screen and game-over scoreboard with name entry
- Adaptive window size — scales to 90% of screen height while maintaining 3:4 aspect ratio

## Non-Standard Libraries

- **SDL2** — Window creation, rendering, and event handling
- **SDL2_image** — Loading PNG textures
- **SDL2_ttf** — TrueType font rendering for UI text and leaderboard
- **SDL2_mixer** — Audio playback for background music and sound effects

## Compilation / Execution

### Pre-built Binary (Windows)

Extract the zip archive and double-click `SDLSpaceShooter.exe`. No installation required.

### Build from Source

#### Requirements

- CMake >= 3.20
- C++17 compiler (GCC / Clang / MSVC)
- SDL2, SDL2_image, SDL2_ttf, SDL2_mixer

#### Windows (MinGW)

```bash
mkdir build && cd build
cmake ..
cmake --build .
```

#### Linux (Ubuntu / Debian)

```bash
sudo apt install libsdl2-dev libsdl2-image-dev libsdl2-ttf-dev libsdl2-mixer-dev
mkdir build && cd build
cmake ..
cmake --build .
```

#### macOS

```bash
brew install sdl2 sdl2_image sdl2_ttf sdl2_mixer
mkdir build && cd build
cmake ..
cmake --build .
```