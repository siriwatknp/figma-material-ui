export const getColor = (paint: PaintStyle) => {
  const { paints } = paint;
  if (paints[0].type === "SOLID") {
    return `rgba(${paints[0].color.r} ${paints[0].color.g} ${paints[0].color.b} / ${paints[0].opacity})`;
  }
};

function camalize(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

export const getPalette = (paints: PaintStyle[]) => {
  const palette: Record<string, string | Record<string, string>> = {};
  // palette = { primary: { main: '' } }
  paints.forEach((paint) => {
    const { name } = paint;
    const color = getColor(paint);
    const paths = name.split("/"); // ['Light', 'Text', 'Primary'];

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
