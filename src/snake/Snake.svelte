<script lang="ts">
  import { onMount } from 'svelte';
  import { KeyCode, Direction, type Coord, KeyCodeToDirectionMap } from "./types";
  import {getNeighborCoord, getOppositeDirection, areCoordsEqual, spawnFood, getInitSnake, isCoordTail, getBoardSize, SQUARE_SIZE, MARGIN} from './utils';
  import type { stardust } from '@nebula.js/stardust';
  import Tile from './Tile.svelte';

  export let rect: stardust.Rect;

  let boardSize = getBoardSize(rect);
  let food: Coord;
  let snake: Coord[] = [];
  let direction = Direction.Down;
  let directionHasChanged = false;
  let gameStarted = false;
  let score = 0;
  let highScore = 0;
  let timer = 0;
  let interval: NodeJS.Timeout;

  const loader = () => {
    snake = [getNeighborCoord(snake[0], direction, boardSize), ...snake];
    snake.pop();
    // direction = (direction + 1) % 4;
    direction = timer % 2 ? (direction + 1) % 4 : direction;
    timer += 1;
  }
  console.log(snake[0]);

  const moveSnake = () => {
    directionHasChanged = false;
    snake = [getNeighborCoord(snake[0], direction, boardSize), ...snake];

    if (areCoordsEqual(snake[0], food)) {
      food = spawnFood(snake, boardSize);
      score += 10;
    } else {
      snake.pop()
    }

    if (isCoordTail(snake[0], snake)) {
      resetGame();
    }
  }

  const gameLoop = () => {
    if (gameStarted) {
      moveSnake();
    } else {
      loader();
    }
  }

  const resetInterval = () => {
    clearInterval(interval);
    interval = setInterval(gameLoop, 120);
  }

  const resetGame = () => {
    highScore = Math.max(highScore, score);
    score = 0;
    gameStarted = false;
    food = {x: -1, y: -1};
    direction = Direction.Down
    snake = getInitSnake(boardSize);
    console.log({snake})
    resetInterval();
  }

  const onKeyDown = (evt: KeyboardEvent) => {
    const keyDirection = KeyCodeToDirectionMap.get(evt.key);
    if (directionHasChanged || keyDirection === undefined || direction === getOppositeDirection(keyDirection)) {
      return;
    }

    switch (evt.key) {
      case KeyCode.Up:
      case KeyCode.Down:
      case KeyCode.Left:
      case KeyCode.Right:
        evt.preventDefault()

        if (!gameStarted) {
          gameStarted = true;
          food = spawnFood(snake, boardSize);
        }

        direction = keyDirection;
        directionHasChanged = true
        break;
      default:
        break;
    }
  }

  // TODO: debounce
  const onResize = () => {
    resetGame();
    boardSize = getBoardSize(rect);
  }

  onMount(() => {
    resetGame();
    window.addEventListener('resize', onResize);
    console.log('mounting')

        return () => {
        clearInterval(interval);
      window.removeEventListener('resize', onResize);
    }
  });
</script>

<div style="display: flex; justify-content: center; align-items: center; flex-direction: column; width: 100%; height: 100% ">
  <div style="font-size: 24px; margin-bottom: 8px; font-family: Courier; font-weight: bold">Score: {score}  -  High Score: {highScore} </div>

  <div class="grid" style="display: inline-flex; flex-direction: column; border: 1px solid #9a9a9a; border-radius: 8px; overflow: hidden; background: rgb(250, 250, 250)">
    {#each Array(boardSize.height) as _, y (`row-${y}`)}
      <div class="row" style="display: inline-flex">
        {#each Array(boardSize.width) as _, x (`square-${y}-${x}`)}
          <Tile coord={{ x, y }} food={food} snake={snake} />
        {/each}
      </div>
    {/each}
  </div>
</div>

<svelte:window on:keydown={onKeyDown} />

<!-- For some reason rollup can't handle the css file this creates? so just doing inline styling
  <style>
  .grid {
    display: inline-flex;
    flex-direction: column;
    border: 1px solid black;
  }
  .row {
    display: inline-flex;
  }
  .square {
    align-self: flex-start;
    width: 20px;
    height: 20px;
  }
  .head {
    background: #ff0000
  }
  .tail {
    background: #0000ff
  }
  .food {
    background: #00ff00
  }
  .background {
    background: #ababab
  }
</style> -->
