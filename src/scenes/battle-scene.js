import {
  BATTLE_ASSET_KEYS,
  BATTLE_BACKGROUND_ASSET_KEYS,
  HEALTH_BAR_ASSET_KEYS,
  MONSTER_ASSET_KEYS,
} from "../../assets/asset-keys.js";
import { BattleMenu } from "../battle/ui/menu/battle-menu.js";
import Phaser from "../lib/phaser.js";
import { SCENE_KEYS } from "./scene-keys.js";

export class BattleScene extends Phaser.Scene {
  #battleMenu;
  constructor() {
    super({
      key: SCENE_KEYS.BATTLE_SCENE,
    });
    console.log(SCENE_KEYS.BATTLE_SCENE);
  }
  create() {
    console.log(`[${BattleScene.name}:create invoked] `);

    //create main background:
    this.add.image(0, 0, BATTLE_BACKGROUND_ASSET_KEYS.FOREST).setOrigin(0);

    //render out the player and enemy monsters:
    this.add.image(768, 144, MONSTER_ASSET_KEYS.CARNODUSK, 0);
    this.add.image(256, 316, MONSTER_ASSET_KEYS.IGUANIGNITE, 0).setFlipX(true);

    //!render out  the player health bar:
    const playerMonsterName = this.add.text(
      20,
      15,
      MONSTER_ASSET_KEYS.IGUANIGNITE,
      {
        fontSize: "32px",
        color: "#7E3D3F",
        fontStyle: "bold",
      }
    );

    this.add.container(556, 318, [
      this.add
        .image(0, 0, BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND)
        .setOrigin(0)
        .setScale(1, 0.85),
      playerMonsterName,
      this.#createHealth(34, 30),
      this.add.text(playerMonsterName.width + 35, 17, "L5", {
        fontSize: "28px",
        color: "#ED474B",
        fontStyle: "bold",
      }),
      this.add.text(32, 50, "HP", {
        color: "#ED474B",
        fontSize: "24px",
        fontStyle: "italic bold",
      }),
      this.add
        .text(443, 75, "25/25", {
          color: "#000",
          fontSize: "16px",
          fontStyle: "italic bold",
        })
        .setOrigin(1, 0),
    ]);

    //!render out the ENEMY healt bar:
    const enemyMonsterName = this.add.text(
      20,
      15,
      MONSTER_ASSET_KEYS.CARNODUSK,
      {
        fontSize: "32px",
        color: "#7E3D3F",
        fontStyle: "bold",
      }
    );

    this.add.container(0, 0, [
      this.add
        .image(0, 0, BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND)
        .setOrigin(0)
        .setScale(1, 0.85),
      enemyMonsterName,
      this.#createHealth(34, 30),
      this.add.text(enemyMonsterName.width + 35, 17, "L5", {
        fontSize: "28px",
        color: "#ED474B",
        fontStyle: "bold",
      }),
      this.add.text(32, 50, "HP", {
        color: "#ED474B",
        fontSize: "24px",
        fontStyle: "italic bold",
      }),
      this.add
        .text(443, 75, "25/25", {
          color: "#000",
          fontSize: "16px",
          fontStyle: "italic bold",
        })
        .setOrigin(1, 0),
    ]);
    //render out the main info and sub info panes:
    this.#battleMenu = new BattleMenu(this);
    this.#battleMenu.showMainBattleMenu();
  }

  //healt bar
  #createHealth(x, y) {
    //scale:
    const scaleY = 0.7;

    //left
    const leftCap = this.add
      .image(x, y, HEALTH_BAR_ASSET_KEYS.LEFT_CAP)
      .setOrigin(0, 0.5)
      .setScale(1, scaleY);

    //middle
    const middle = this.add
      .image(leftCap.x + leftCap.width, y, HEALTH_BAR_ASSET_KEYS.MIDDLE)
      .setOrigin(0, 0.5)
      .setScale(1, scaleY);
    middle.displayWidth = 360;

    //right
    const rightCap = this.add
      .image(middle.x + middle.displayWidth, y, HEALTH_BAR_ASSET_KEYS.RIGHT_CAP)
      .setOrigin(0, 0.5)
      .setScale(1, scaleY);
    return this.add.container(x, y, [leftCap, middle, rightCap]);
  }
}
