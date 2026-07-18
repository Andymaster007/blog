# 原始素材：SDLSpaceShooter

> 来源：Andy 的公开 GitHub 仓库 https://github.com/Andymaster007/SDLSpaceShooter
> 由 AI 于 2026-07-18 自动抓取（README + 源码结构 + 关键实现）。原始 README 全文见 `assets/original-README.md`。

## 仓库元信息

- 名称：SDLSpaceShooter
- 描述：SDL2 Space Shooter Game
- 创建：2026-06-09
- 最后提交：2026-07-05
- 语言构成：C++ 43534 / C 1736 / CMake 792（字节）
- 体积：约 17.5 MB（含美术、音乐、音效、v1.0 打包 zip）
- 默认分支：main

## 源码结构（src/，共约 1412 行）

- main.cpp (9)：入口，取单例并 run。
- Game.cpp/.h (318/66)：单例 Game，负责窗口/渲染器/主循环/场景切换/分数/排行榜/自适应缩放/视差背景。
- Scene.cpp/.h (9/25)：场景抽象基类。
- SceneTitle.cpp/.h (49/27)：标题场景。
- SceneMain.cpp/.h (584/74)：核心玩法场景（玩家、敌人、双方子弹、爆炸、掉落物、UI、难度）。
- SceneEnd.cpp/.h (133/30)：结算场景，输入名字，写排行榜。
- Object.h (88)：所有游戏对象的 POD struct（Player/Enemy/Projectile*/Explosion/Item/Background）。

## 关键技术点（源码佐证）

- **单例 + 场景状态机**：`Game::getInstance()` 静态局部单例；`changeScene(Scene*)` 切换 currentScene，事件/更新/渲染统一转发给当前场景。
- **帧率无关运动**：Game.h 里 FPS=60、expectedFrameTime、deltaTime；所有位移 `speed * deltaTime * scale`。
- **多分辨率自适应**：scale 因子，窗口按屏幕高度 90%、保持 3:4 比例；所有精灵/速度/UI 乘以 scale。
- **持久化排行榜**：`std::multimap<int, std::string, std::greater<int>>` 天然降序；用 `SDL_GetPrefPath` 存到系统用户目录（Windows 的 AppData/Roaming），保证重装/打包后存档不丢。
- **难度递增**：SceneMain 里 spawnRate 随时间提升，游戏开始 60s 后 `3 + (elapsed-60000)/5000`，上限 8；早期 1.0→1.5→2.0→2.5 分段。
- **敌弹追踪玩家**：`getDirection(enemy)` 计算指向玩家的单位向量，敌方子弹按该方向飞。
- **三连发**：玩家每次射击生成三发子弹，横向散布。
- **视差滚动**：nearStars/farStars 两层星空不同 speed。
- **精灵表爆炸动画**：Explosion 结构含 currentFrame/totalFrames/FPS，按时间推进帧。
- **掉落物反弹**：Item 有 bounce=3，撞墙反向，三次后消失。

## 依赖与构建

- 依赖：SDL2 / SDL2_image / SDL2_ttf / SDL2_mixer。
- 构建：CMake >= 3.20，C++17；Windows(MinGW)/Linux/macOS 三平台说明齐全。
- 发布：dist/SDLSpaceShooter_v1.0.zip，Windows 解压即玩。

## 出处与原创性（README 自述）

项目基于 B 站 UP 主 ZiyuGameDev 的《SDL2 游戏开发教程》起步，在教程基础上自己做的改进：游戏平衡性调参、UI 优化、持久化排行榜、难度递增、三连发、多分辨率缩放。
