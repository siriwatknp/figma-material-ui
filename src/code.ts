import { QUERY_PALETTE } from "./constant";
import { extractPalettes, getPalette } from "./utils";

figma.showUI(__html__, { themeColors: true, height: 300, width: 240 });

figma.ui.onmessage = (msg) => {
  if (msg.type === QUERY_PALETTE) {
    const paints = figma.getLocalPaintStyles();

    // dark, light, or unknown (palette nodes are in the root Color Styles)
    const palettes = extractPalettes(paints);

    const value = [];
    Object.keys(palettes).forEach((name) => {
      if (palettes[name].length) {
        value.push({ name, value: getPalette(palettes[name]) });
      }
    });

    figma.ui.postMessage({ type: QUERY_PALETTE, value });
  }

  // TODO: wait for file saved
  // figma.closePlugin();
};
