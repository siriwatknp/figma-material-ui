import { getColor, getPalette, extractPalettes } from "./utils";

it("it works", () => {
  expect(
    getColor({
      paints: [{ color: { r: 0, g: 0, b: 0 }, opacity: 0.87, type: "SOLID" }],
    })
  ).toEqual("rgba(0 0 0 / 0.87)");
});

describe("extractPalettes", () => {
  it("add to light", () => {
    const paint = { name: "Light/Primary/Main" };
    const { light } = extractPalettes([paint]);
    expect(light).toEqual([paint]);
  });

  it("add to dark", () => {
    const paint = { name: "Dark/Primary/Main" };
    const { dark } = extractPalettes([paint]);
    expect(dark).toEqual([paint]);
  });

  it("add to unknown", () => {
    const paint = { name: "Primary/Main" };
    const { unknown } = extractPalettes([paint]);
    expect(unknown).toEqual([paint]);
  });
});

describe("getPalette", () => {
  it("single paint: able to create nested object", () => {
    expect(
      getPalette([
        {
          name: "Light/Text/Primary",
          paints: [
            { color: { r: 0, g: 0, b: 0 }, opacity: 0.87, type: "SOLID" },
          ],
        },
      ])
    ).toEqual({
      palette: {
        text: {
          primary: "rgba(0 0 0 / 0.87)",
        },
      },
    });
  });

  it("multiple paints: able to create nested object", () => {
    expect(
      getPalette([
        {
          name: "Light/Text/Primary",
          paints: [
            { color: { r: 0, g: 0, b: 0 }, opacity: 0.87, type: "SOLID" },
          ],
        },
        {
          name: "Light/Text/Secondary",
          paints: [
            { color: { r: 0, g: 0, b: 0 }, opacity: 0.7, type: "SOLID" },
          ],
        },
      ])
    ).toEqual({
      palette: {
        text: {
          primary: "rgba(0 0 0 / 0.87)",
          secondary: "rgba(0 0 0 / 0.7)",
        },
      },
    });
  });

  it("remove Other for the divider", () => {
    expect(
      getPalette([
        {
          name: "Light/Other/Divider",
          paints: [
            { color: { r: 0, g: 0, b: 0 }, opacity: 0.87, type: "SOLID" },
          ],
        },
      ])
    ).toEqual({
      palette: {
        divider: "rgba(0 0 0 / 0.87)",
      },
    });
  });

  it("works for unknown theme", () => {
    expect(
      getPalette([
        {
          name: "Text/Primary",
          paints: [
            { color: { r: 0, g: 0, b: 0 }, opacity: 0.87, type: "SOLID" },
          ],
        },
      ])
    ).toEqual({
      palette: {
        text: {
          primary: "rgba(0 0 0 / 0.87)",
        },
      },
    });
  });
});
