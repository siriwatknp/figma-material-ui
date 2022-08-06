import { getColor, getPalette } from "./utils";

it("it works", () => {
  expect(
    getColor({
      paints: [{ color: { r: 0, g: 0, b: 0 }, opacity: 0.87, type: "SOLID" }],
    })
  ).toEqual("rgba(0 0 0 / 0.87)");
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
      light: {
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
      light: {
        text: {
          primary: "rgba(0 0 0 / 0.87)",
          secondary: "rgba(0 0 0 / 0.7)",
        },
      },
    });
  });
});
