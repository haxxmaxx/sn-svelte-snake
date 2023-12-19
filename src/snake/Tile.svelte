<script lang="ts">
  import { MARGIN, SQUARE_SIZE, areCoordsEqual, getSnakeColor, isCoordTail } from "./utils";
  import type { Coord, Snake } from "./types";

  export let coord: Coord;
  export let food: Coord;
  export let snake: Snake;

  const tileCommonStyle = `align-self: flex-start; width: ${SQUARE_SIZE - MARGIN * 2}px; height: ${SQUARE_SIZE - MARGIN * 2}px; border-radius: 4px; margin: ${MARGIN}px; margin-color: transparent`;

</script>
<div>
  {#if areCoordsEqual(coord, snake[0])}
    <div class="square head" style="{tileCommonStyle}; background: {getSnakeColor(coord, snake)}"/>
  {:else if isCoordTail(coord, snake)}
    <div class="square tail" style="{tileCommonStyle}; background: {getSnakeColor(coord, snake)}"/>
  {:else if areCoordsEqual(coord, food)}
    <div class="square food" style="{tileCommonStyle}; background: rgb(0, 152, 69)"/>
  {:else}
    <div class="square background" style="align-self: flex-start; width: {SQUARE_SIZE}px; height: {SQUARE_SIZE}px; background: rgb(250, 250, 250);" />
  {/if}
</div>
