import Phaser from "phaser";
import { defineQuery, defineSystem } from "bitecs";
import { Rotation } from "../components/Rotation";
import { CPU } from "../components/CPU";
import { Velocity } from "../components/Velocity";
import { Direction, Input } from "../components/Input";

export const createCPUSystem = (scene: Phaser.Scene) => {
  const cpuQuery = defineQuery([CPU, Velocity, Rotation, Input]);

  return defineSystem((world) => {
    const dt = scene.game.loop.delta;
    const entities = cpuQuery(world);

    for (let i = 0; i < entities.length; ++i) {
      const id = entities[i];

      CPU.accumulatedTime[id] += dt;

      if (CPU.accumulatedTime[id] < CPU.timeBetweenActions[id]) continue;

      CPU.accumulatedTime[id] = 0;

      const rand = Phaser.Math.Between(0, 20);

      switch (rand) {
        // left
        case 0:
          Input.direction[id] = Direction.Left;
          break;

        // right
        case 1:
          Input.direction[id] = Direction.Right;
          break;

        // up
        case 2:
          Input.direction[id] = Direction.Up;
          break;

        // down
        case 3:
          Input.direction[id] = Direction.Down;
          break;
        default:
          Input.direction[id] = Direction.None;
      }
    }

    return world;
  });
};
