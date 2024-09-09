import {
  BATTLE_ASSET_KEYS,
  BATTLE_BACKGROUND_ASSET_KEYS,
  HEALTH_BAR_ASSET_KEYS,
  MONSTER_ASSET_KEYS,
} from "../../assets/asset-keys.js";
import Phaser from "../lib/phaser.js";
import { SCENE_KEYS } from "./scene-keys.js";

const BATTLE_MENU_OPTIONS = Object.freeze({
  FIGHT: "FIGHT",
  SWITCH:  "SWITCH",
  ITEM: "ITEM",
  FLEE: "FLEE"
})
const battleUiTextStyle = {
  color: "black",
  fontSize:"30px",
  fontStyle: "bold"
}

export class BattleScene extends Phaser.Scene {
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
      //render out the main info and sub info panes:
      this.#createMainInfoPane(),
      this.add.container(520,448, [
        this.#createMainInfoSubPane(),
        this.add.text(55,22, BATTLE_MENU_OPTIONS.FIGHT, battleUiTextStyle),
        this.add.text(240,22, BATTLE_MENU_OPTIONS.SWITCH, battleUiTextStyle),
        this.add.text(55,70, BATTLE_MENU_OPTIONS.ITEM, battleUiTextStyle),
        this.add.text(240,70, BATTLE_MENU_OPTIONS.FLEE, battleUiTextStyle)
      ]),
      this.add.container(0,448, [
        this.add.text(55,22, "slash", battleUiTextStyle),
        this.add.text(240,22, "growl", battleUiTextStyle),
        this.add.text(55,70, "-", battleUiTextStyle),
        this.add.text(240,70, "-", battleUiTextStyle)
      ])
      
    ]);
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

  #createMainInfoPane() {
    const rectHeight = 124;
    const padding = 4;

    return this.add
      .rectangle(
        0,
        this.scale.height - rectHeight - padding,
        this.scale.width - padding * 2,
        rectHeight,
        0xede4f3,
        1
      )
      .setOrigin(0)
      .setStrokeStyle(8, 0xe4434a, 1);
  }

  #createMainInfoSubPane() {
    const rectWidth = 500;
    const rectHeight = 124;
    const padding = 4;

    return this.add
      .rectangle(0, 0, rectWidth, rectHeight, 0xede4f3, 1)
      .setOrigin(0)
      .setStrokeStyle(8, 0x905ac2, 1);
  }
}
