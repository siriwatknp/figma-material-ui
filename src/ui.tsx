import * as React from "react";
import * as ReactDOM from "react-dom";
import "./ui.css";
import { QUERY_PALETTE } from "./constant";

declare function require(path: string): any;

function App() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    parent.postMessage({ pluginMessage: { type: QUERY_PALETTE } }, "*");
  }, []);

  React.useEffect(() => {
    function handleMessage(event) {
      const { type, value } = event.data.pluginMessage;

      if (type === QUERY_PALETTE) {
        setData(value);
      }
    }
    window.addEventListener("message", handleMessage);

    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <main style={{ paddingInline: "1rem" }}>
      <header>
        <img src={require("./logo.svg")} />
        <h2>Material UI</h2>
      </header>
      {data.map((item) => (
        <button
          style={{ width: "100%", marginBlockEnd: "0.5rem" }}
          key={item.name}
          className="brand"
          onClick={() => {
            const dataStr = JSON.stringify(item.value, null, 2);
            const dataUri =
              "data:application/json;charset=utf-8," +
              encodeURIComponent(dataStr);

            const exportFileDefaultName = `${item.name}.json`;

            const linkElement = document.createElement("a");
            linkElement.setAttribute("href", dataUri);
            linkElement.setAttribute("download", exportFileDefaultName);
            linkElement.click();
          }}
        >
          Export {item.name}.json
        </button>
      ))}
    </main>
  );
}

ReactDOM.render(<App />, document.getElementById("react-page"));
