import { defineQuery, defineSystem } from "bitecs";
import { Velocity } from "../components/Velocity";
import { Player } from "../components/Player";
import { Rotation } from "../components/Rotation";
import { Direction, Input } from "../components/Input";

export const createPlayerSystem = (
  cursors: Phaser.Types.Input.Keyboard.CursorKeys
) => {
  const query = defineQuery([Player, Velocity, Rotation, Input]);

  return defineSystem((world) => {
    const entities = query(world);

    for (let i = 0; i < entities.length; ++i) {
      const id = entities[i];

      if (cursors.left.isDown) {
        Input.direction[id] = Direction.Left;
      } else if (cursors.right.isDown) {
        Input.direction[id] = Direction.Right;
      } else if (cursors.up.isDown) {
        Input.direction[id] = Direction.Up;
      } else if (cursors.down.isDown) {
        Input.direction[id] = Direction.Down;
      } else {
        Input.direction[id] = Direction.None;
      }
    }

    return world;
  });
};
