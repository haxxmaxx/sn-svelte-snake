import { useEffect, useElement, useRect } from "@nebula.js/stardust";
import properties from "./object-properties";
import ext from "./ext";
import snake from "../svelte-build/bundle";

/**
 * Entrypoint for your sense visualization
 * @param {object} galaxy Contains global settings from the environment.
 * Useful for cases when stardust hooks are unavailable (ie: outside the component function)
 * @param {object} galaxy.anything Extra environment dependent options
 * @param {object=} galaxy.anything.sense Optional object only present within Sense,
 * see: https://qlik.dev/extend/build-extension/in-qlik-sense
 */
export default function supernova() {
  return {
    qae: {
      properties,
      data: { targets: [] },
    },
    ext: ext(),
    component() {
      const element = useElement();
      const rect = useRect();

      useEffect(() => {
        snake(element, rect);
      }, [element, rect.width, rect.height]);
    },
  };
}
