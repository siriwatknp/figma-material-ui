import rgbHex from "rgb-hex";

function toRGB256(rgb: number) {
  return Math.round(rgb * 255);
}

/**
 * Converts the given `rgbColor` (eg. `{ r: 0, g: 0, b: 0 }`) to hexadecimal
 * format (eg. `000000`). Each value in the given
 * [RGB](https://figma.com/plugin-docs/api/RGB/) plain object must be
 * between `0` and `1`.
 *
 * @returns Returns a hexadecimal color as an uppercase string, else `null`
 * if `rgbColor` was invalid.
 * @category Color
 */
function convertRgbColorToHexColor(rgbColor: RGB): null | string {
  const { r, g, b } = rgbColor;
  if (r < 0 || r > 1 || g < 0 || g > 1 || b < 0 || b > 1) {
    return null;
  }
  try {
    return rgbHex(toRGB256(r), toRGB256(g), toRGB256(b)).toUpperCase();
  } catch {
    return null;
  }
}

export const getColor = (paint: PaintStyle) => {
  const { paints } = paint;
  if (paints[0].type === "SOLID") {
    const { color, opacity } = paints[0];
    if (opacity < 1) {
      return `rgba(${toRGB256(color.r)} ${toRGB256(color.g)} ${toRGB256(
        color.b
      )} / ${opacity.toFixed(2)})`;
    }
    return `#${convertRgbColorToHexColor(color)}`;
  }
};

function camalize(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

const isValidColor = (color) => {
  color = color.toLowerCase();
  return (
    [
      "background/paper",
      "background/default",
      "grey/50",
      "grey/100",
      "grey/200",
      "grey/300",
      "grey/400",
      "grey/500",
      "grey/600",
      "grey/700",
      "grey/800",
      "grey/900",
      "grey/a100",
      "grey/a200",
      "grey/a400",
      "grey/a700",
      "primary/main",
      "primary/light",
      "primary/dark",
      "primary/contrastText",
      "secondary/main",
      "secondary/light",
      "secondary/dark",
      "secondary/contrastText",
      "error/main",
      "error/light",
      "error/dark",
      "error/contrastText",
      "warning/main",
      "warning/light",
      "warning/dark",
      "warning/contrastText",
      "info/main",
      "info/light",
      "info/dark",
      "info/contrastText",
      "success/main",
      "success/light",
      "success/dark",
      "success/contrastText",
      "text/primary",
      "text/secondary",
      "text/disabled",
      "other/divider",
    ].indexOf(color) !== -1
  );
};

export const extractPalettes = (paints: PaintStyle[]) => {
  const dark = [];
  const light = [];
  const unknown = [];
  paints.forEach((item) => {
    const name = item.name.toLowerCase();
    if (name.startsWith("light") && isValidColor(name.replace("light/", ""))) {
      light.push(item);
    }
    if (name.startsWith("dark") && isValidColor(name.replace("dark/", ""))) {
      dark.push(item);
    }
    if (isValidColor(name)) {
      unknown.push(item);
    }
  });
  return { dark, light, unknown };
};

export const getPalette = (paints: PaintStyle[]) => {
  const palette: Record<string, string | Record<string, string>> = {};
  paints.forEach((paint) => {
    const { name } = paint;
    const color = getColor(paint);
    let paths = name.split("/"); // ['Light', 'Text', 'Primary'];

    if (paths[0] === "Light" || paths[0] === "Dark") {
      paths = paths.slice(1);
    }
    if (paths[0] === "Other") {
      paths = paths.slice(1);
    }
    paths = ["palette", ...paths];

    function assignKeyValues(obj: Record<string, any>, array: string[]) {
      const [key, ...nextArray] = array;
      const camelCaseKey = camalize(key);
      if (nextArray.length) {
        if (!(camelCaseKey in obj)) {
          obj[camelCaseKey] = {};
        }
        assignKeyValues(obj[camelCaseKey], nextArray);
      } else {
        obj[camelCaseKey] = color;
      }
    }
    assignKeyValues(palette, paths);
  });

  return palette;
};
