import { defineComponent, Types } from "bitecs";

export const Sprite = defineComponent({
  // using smallest integer here.  Texture number never negative
  texture: Types.ui8,
});
