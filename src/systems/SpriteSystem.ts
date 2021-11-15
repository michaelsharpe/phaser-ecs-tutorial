import { defineQuery, defineSystem, enterQuery, exitQuery } from "bitecs";
import { Rotation } from "../components/Rotation";
import { Position } from "../components/Position";
import { Sprite } from "../components/Sprite";

export const createSpriteSystem = (scene: Phaser.Scene, textures: string[]) => {
  const spritesById = new Map<number, Phaser.GameObjects.Sprite>();

  const spriteQuery = defineQuery([Sprite, Rotation]);
  const spriteQueryEnter = enterQuery(spriteQuery);
  const spriteQueryExit = exitQuery(spriteQuery);

  return defineSystem((world) => {
    // gets any entities whichhave just entered the world
    const enterEntities = spriteQueryEnter(world);
    // gets entities which have just exited the world
    const exitEntities = spriteQueryExit(world);

    // Here we set any sprite entities that has entered the world to phaser and add it to the map for later referencing
    for (let i = 0; i < enterEntities.length; ++i) {
      const id = enterEntities[i];
      const texId = Sprite.texture[id];
      const texture = textures[texId];
      //this maps the entity id to the phaser object we create when we make a sprite.
      spritesById.set(id, scene.add.sprite(0, 0, texture));
    }
    const entities = spriteQuery(world);

    // We set the position of the sprite in phase based on the position set to the entity
    for (let i = 0; i < entities.length; i++) {
      const id = entities[i];
      const sprite = spritesById.get(id);

      if (!sprite) continue;

      sprite.x = Position.x[id];
      sprite.y = Position.y[id];
      sprite.angle = Rotation.angle[id];
    }

    // delete any sprites whose entities have been removed or "exited" the world
    for (let i = 0; i < exitEntities.length; i++) {
      const id = exitEntities[i];
      const sprite = spritesById.get(id);

      if (!sprite) continue;

      sprite.destroy();
      spritesById.delete(id);
    }

    return world;
  });
};
