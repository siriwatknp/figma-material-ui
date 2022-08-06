import { getPalette } from "./utils";

figma.showUI(__html__, { themeColors: true, height: 200, width: 200 });

figma.ui.onmessage = (msg) => {
  if (msg.type === "export") {
    const paints = figma.getLocalPaintStyles();

    const palette = getPalette(paints);

    console.log(palette);

    figma.ui.postMessage({ value: { palette } });
  }

  // TODO: wait for file saved
  // figma.closePlugin();
};
