import Phaser from "./lib/phaser.js";
import { BattleScene } from "./scenes/battle-scene.js";
import { PreloadScene } from "./scenes/preload-scene.js";

const game = new Phaser.Game({
  type: Phaser.CANVAS,
  pixelArt:false,
  backgroundColor:"#fff", 
  scale:{
    width:1024,
    height: 576,
    mode: Phaser.Scale.FIT
  },
  parent: "game-container",
  scene: [PreloadScene, BattleScene],
});
