import type { stardust } from "@nebula.js/stardust";
import Snake from "./Snake.svelte";

const snake = (element: HTMLElement, rect: stardust.Rect) =>
  new Snake({
    target: element,
    props: {
      rect,
    },
  });

export default snake;
