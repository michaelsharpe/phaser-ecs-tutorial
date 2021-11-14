import Phaser from "phaser";

export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  preload() {
    this.load.image("tank-blue", "assets/tank_blue.png");
    this.load.image("tank-green", "assets/tank_green.png");
    this.load.image("tank-red", "assets/tank_red.png");
  }

  create() {
    // CREATE ENTITIES
    // ATTACH COMPONENTS
    // CREATE SYSTEMS
  }

  update(t: number, dt: number) {
    // run systems
  }
}
