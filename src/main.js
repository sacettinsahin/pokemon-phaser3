import Phaser from "./lib/phaser.js";
import { PreloadScene } from "./scenes/preload-scene.js";
import { SCENE_KEYS } from "./scenes/scene-keys.js";

const game = new Phaser.Game({
  parent: "game-container",
  scene: [PreloadScene],
});
