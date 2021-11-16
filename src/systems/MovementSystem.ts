import { defineQuery, defineSystem } from "bitecs";
import { Velocity } from "../components/Velocity";
import { Position } from "../components/Position";
import { Input, Direction } from "../components/Input";
import { Rotation } from "../components/Rotation";

export const createMovementSystem = () => {
  const query = defineQuery([Position, Velocity, Input, Rotation]);
  const speed = 5;

  return defineSystem((world) => {
    const entities = query(world);

    for (let i = 0; i < entities.length; i++) {
      const id = entities[i];

      const direction = Input.direction[id];

      switch (direction) {
        case Direction.None:
          Velocity.x[id] = 0;
          Velocity.y[id] = 0;
          break;
        case Direction.Down:
          Velocity.x[id] = 0;
          Velocity.y[id] = speed;
          Rotation.angle[id] = 90;
        case Direction.Up:
          Velocity.x[id] = 0;
          Velocity.y[id] = -speed;
          Rotation.angle[id] = 270;
          break;
        case Direction.Right:
          Velocity.x[id] = speed;
          Velocity.y[id] = 0;
          Rotation.angle[id] = 0;
          break;
        case Direction.Left:
          Velocity.x[id] = -speed;
          Velocity.y[id] = 0;
          Rotation.angle[id] = 180;
          break;
      }

      Position.x[id] += Velocity.x[id];
      Position.y[id] += Velocity.y[id];
    }

    return world;
  });
};
