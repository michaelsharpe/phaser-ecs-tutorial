import Phaser from "phaser";

import { addComponent, addEntity, createWorld, System } from "bitecs";
import { World } from "matter";

import blueTank from "../assets/tank_blue.png";
import redTank from "../assets/tank_red.png";
import greenTank from "../assets/tank_green.png";

import { Player } from "../components/Player";
import { Position } from "../components/Position";
import { Velocity } from "../components/Velocity";
import { Sprite } from "../components/Sprite";
import { createSpriteSystem } from "../systems/SpriteSystem";
import { createMovementSystem } from "../systems/MovementSystem";
import { createPlayerSystem } from "../systems/PlayerSystem";
import { Rotation } from "../components/Rotation";
import { createCPUSystem } from "../systems/CPUSystem";
import { CPU } from "../components/CPU";
import { Input } from "../components/Input";

// map of sprites with their id mapped to a phaser object
export default class Game extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private spriteSystem?: System;
  private movementSystem?: System;
  private playerSystem?: System;
  private cpuSystem?: System;
  private world?: World;

  constructor() {
    super("game");
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  preload() {
    this.load.image("tank-blue", blueTank);
    this.load.image("tank-green", greenTank);
    this.load.image("tank-red", redTank);
  }

  create() {
    this.world = createWorld();

    // tank is basically just an id
    const tank = addEntity(this.world);

    // Added position component to tank entity
    addComponent(this.world, Position, tank);

    // component properties are an array that stores the properties of an entity
    Position.x[tank] = 100;
    Position.y[tank] = 100;

    addComponent(this.world, Rotation, tank);
    addComponent(this.world, Input, tank);

    addComponent(this.world, Velocity, tank);
    addComponent(this.world, Sprite, tank);

    Sprite.texture[tank] = 0;

    addComponent(this.world, Player, tank);

    const { width, height } = this.scale;
    for (let i = 0; i < 20; ++i) {
      const cpuTank = addEntity(this.world);

      addComponent(this.world, Position, cpuTank);
      Position.x[cpuTank] = Phaser.Math.Between(width * 0.25, height * 0.75);
      Position.y[cpuTank] = Phaser.Math.Between(width * 0.25, height * 0.75);

      addComponent(this.world, Rotation, cpuTank);
      addComponent(this.world, Velocity, cpuTank);
      addComponent(this.world, Sprite, cpuTank);
      addComponent(this.world, Input, cpuTank);

      Sprite.texture[cpuTank] = Phaser.Math.Between(1, 2);
      addComponent(this.world, CPU, cpuTank);
      CPU.timeBetweenActions[cpuTank] = Phaser.Math.Between(0, 500);
    }

    this.spriteSystem = createSpriteSystem(this, [
      "tank-blue",
      "tank-red",
      "tank-green",
    ]);

    this.movementSystem = createMovementSystem();
    this.playerSystem = createPlayerSystem(this.cursors);
    this.cpuSystem = createCPUSystem(this);

    // CREATE ENTITIES
    // ATTACH COMPONENTS
    // CREATE SYSTEMS
  }

  update(t: number, dt: number) {
    if (!this.world) return;

    // Order of systems is very important
    this.playerSystem?.(this.world);
    this.cpuSystem?.(this.world);

    this.movementSystem?.(this.world);
    // sprite system is our rendering system in this case
    this.spriteSystem?.(this.world);
  }
}
