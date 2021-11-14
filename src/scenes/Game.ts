import Phaser from "phaser";

import {
  addComponent,
  addEntity,
  createWorld,
  defineComponent,
  Types,
} from "bitecs";

const Position = defineComponent({
  x: Types.f32,
  y: Types.f32,
});

const Velocity = defineComponent({
  x: Types.f32,
  y: Types.f32,
});

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
    const world = createWorld();

    // tank is basically just an id
    const tank = addEntity(world);

    // Added position component to tank entity
    addComponent(world, Position, tank);

    // component properties are an array that stores the properties of an entity
    Position.x[tank] = 100;
    Position.y[tank] = 100;

    addComponent(world, Velocity, tank);

    Velocity.x[tank] = 5;
    Velocity.y[tank] = 5;

    // CREATE ENTITIES
    // ATTACH COMPONENTS
    // CREATE SYSTEMS
  }

  update(t: number, dt: number) {
    // run systems
  }
}
