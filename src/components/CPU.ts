import { defineComponent, Types } from "bitecs";

// this is now just a 'tag'
// multiple players could have a number, id, etc,
export const CPU = defineComponent({
  timeBetweenActions: Types.ui32,
  accumulatedTime: Types.ui32,
});
