import * as React from "react";
import * as ReactDOM from "react-dom";
import "./ui.css";

declare function require(path: string): any;

function App() {
  React.useEffect(() => {
    function handleMessage(event) {
      const { value } = event.data.pluginMessage;

      const dataStr = JSON.stringify(value, null, 2);
      const dataUri =
        "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

      const exportFileDefaultName = "palette.json";

      const linkElement = document.createElement("a");
      linkElement.setAttribute("href", dataUri);
      linkElement.setAttribute("download", exportFileDefaultName);
      linkElement.click();
    }
    window.addEventListener("message", handleMessage);

    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <main>
      <header>
        <img src={require("./logo.svg")} />
        <h2>Material UI</h2>
      </header>
      <button
        className="brand"
        onClick={() => {
          parent.postMessage({ pluginMessage: { type: "export" } }, "*");
        }}
      >
        Export theme
      </button>
    </main>
  );
}

ReactDOM.render(<App />, document.getElementById("react-page"));
